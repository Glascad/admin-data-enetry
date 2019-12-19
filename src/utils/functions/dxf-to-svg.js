import _ from 'lodash';
import match from './match';
import replace from './replace';
import {
    sin,
    asin,
    cos,
    acos,
    atan,
    radians,
    degrees,
    rotatePoint,
    transformPoint,
} from './trig';
import getColorFromColorCode from './get-color-from-color-code';

export default dxf => {

    // find index of ENTITY section
    const entityIndex = dxf.indexOf('ENTITIES');
    // find ending index of ENTITY section
    const endIndex = dxf.indexOf('ENDSEC', entityIndex);

    // slice out ENTITY section
    const entities = dxf.slice(entityIndex, endIndex).replace(/\r/g, '');

    const split = entities.split(/\n\s*0\n([A-Z]+)/g).slice(1);

    const entityEntries = _.chunk(split, 2);

    return entityEntries
        // extract DXF data
        .map(([ENTITY, contents]) => {

            const [value, ...subs] = contents.split(/\s([a-zA-Z]+)\s/g);

            const attributes = value.split(/\n+/g).filter(Boolean);

            const subClasses = _.chunk(subs, 2)
                .reduce((subClasses, [subClass, value]) => ({
                    ...subClasses,
                    [subClass]: _.chunk(value.split(/\n+/g), 2)
                        .reduce((obj, [code, value]) => {
                            const trimmedCode = code.trim();
                            const convertedValue = match((value || '').trim())
                                .regex(/^-?\d+(\.\d*)?$/, +value)
                                .otherwise(value);
                            if (["LWPOLYLINE", "SPLINE"].includes(ENTITY)) {
                                if (Array.isArray(obj)) {
                                    const lastIndex = obj.length - 1;
                                    const lastItem = obj[lastIndex];
                                    return lastItem.hasOwnProperty(trimmedCode) ?
                                        obj.concat({ [trimmedCode]: convertedValue })
                                        :
                                        replace(obj, lastIndex, { ...lastItem, [trimmedCode]: convertedValue });
                                } else {
                                    return obj.hasOwnProperty(trimmedCode) ?
                                        [obj, { [trimmedCode]: convertedValue }]
                                        :
                                        {
                                            ...obj,
                                            [trimmedCode]: convertedValue,
                                        };
                                }
                            } else {
                                const existingValue = obj[trimmedCode];
                                return {
                                    ...obj,
                                    [trimmedCode]: obj.hasOwnProperty(trimmedCode) ?
                                        Array.isArray(existingValue) ?
                                            existingValue.concat(convertedValue)
                                            :
                                            [existingValue, convertedValue]
                                        :
                                        convertedValue,
                                };
                            }
                        }, {
                            subClass,
                            value,
                        }),
                }), {});

            return {
                ENTITY,
                attributes,
                subClasses,
                value,
                subs,
                contents,
            };
        })
        .map(entity => console.log({ entity }) || entity)
        // convert to SVG data
        .reduce((path, {
            ENTITY,
            subClasses,
            subClasses: {
                AcDbEntity: {
                    62: colorCode,
                } = {},
            },
            ...rest
        }) => path.concat({
            color: getColorFromColorCode(colorCode),
            commands: match(subClasses)
                // STRAIGHT LINES
                .case(ENTITY === 'LINE', ({
                    AcDbLine: {
                        10: xStart,
                        11: xEnd,
                        20: yStart,
                        21: yEnd,
                    },
                }) => [{
                    command: "M",
                    arguments: [
                        xStart,
                        yStart,
                    ],
                }, {
                    command: "L",
                    subClasses,
                    arguments: [
                        xEnd,
                        yEnd,
                    ],
                }])
                // CIRCULAR ARCS
                .case(ENTITY === 'ARC', ({
                    AcDbCircle: {
                        10: xCenter,
                        20: yCenter,
                        40: radius,
                    },
                    AcDbArc: {
                        50: startAngle,
                        51: endAngle,
                    },
                }) => [{
                    // starting point
                    command: "M",
                    arguments: [
                        radius * cos(startAngle) + xCenter,
                        radius * sin(startAngle) + yCenter,
                    ],
                }, {
                    command: "A",
                    subClasses,
                    arguments: [
                        radius,
                        radius,
                        // rotational angle
                        0,
                        // large-arc-flag (large-arc | small-arc)
                        +((
                            (
                                endAngle <= startAngle ?
                                    360
                                    :
                                    0
                            )
                            +
                            endAngle
                            -
                            startAngle
                        ) >= 180),
                        // sweep-flag (clockwise | counterclockwise)
                        1,
                        radius * cos(endAngle) + xCenter,
                        radius * sin(endAngle) + yCenter,
                    ],
                }])
                // ELLIPTICAL ARCS
                .case(ENTITY === 'ELLIPSE', ({
                    AcDbEllipse,
                    AcDbEllipse: {
                        // center point and endpoint of major axis -- contains radius and angle of major axis
                        10: xCenter,
                        11: axisXEnd,
                        20: yCenter,
                        21: axisYEnd,
                        // ratio of major axis to minor axis
                        40: axisRatio,
                        41: start,
                        42: end,
                        210: xExtrusionDirection,
                        220: yExtrusionDirection,
                        230: zExtrusionDirection,
                    },
                    ...otherClasses,
                }) => {
                    // console.log({ AcDbEllipse });

                    const yRadius = Math.sqrt(
                        axisXEnd * axisXEnd
                        +
                        axisYEnd * axisYEnd
                    );
                    const xRadius = axisRatio * yRadius;
                    const rotationAngle = 90 - acos(axisXEnd / yRadius);
                    const angle = degrees(end - start);

                    const calculatePoint = pointOnEllipse => transformPoint(
                        rotatePoint(pointOnEllipse, rotationAngle),
                        { x: xCenter, y: yCenter },
                    );

                    const startingPoint = calculatePoint({
                        x: xRadius * Math.cos(start),
                        y: yRadius * Math.sin(start),
                    });

                    const halfwayPoint = calculatePoint({
                        x: xRadius * Math.cos((end - start) / 2),
                        y: yRadius * Math.sin((end - start) / 2),
                    });

                    const endPoint = calculatePoint({
                        x: xRadius * Math.cos(end),
                        y: yRadius * Math.sin(end),
                    });

                    // console.log({
                    //     startingPoint,
                    //     halfwayPoint,
                    //     endPoint,
                    //     radii: {
                    //         xRadius,
                    //         yRadius,
                    //     },
                    //     axis: {
                    //         axisXEnd,
                    //         axisYEnd,
                    //         xCenter,
                    //         yCenter,
                    //         axisRatio,
                    //     },
                    //     angles: {
                    //         rotationAngle,
                    //         start,
                    //         end,
                    //     },
                    // });

                    return [{
                        // POSITIVE SECTION OF MAJOR AXIS
                        command: "M",
                        arguments: [
                            xCenter,
                            yCenter,
                        ],
                        style: {
                            stroke: "yellow",
                        },
                    }, {
                        command: "L",
                        arguments: [
                            axisXEnd + xCenter,
                            axisYEnd + yCenter,
                        ],
                    }, {
                        // NEGATIVE OF MAJOR AXIS
                        command: "M",
                        arguments: [
                            xCenter,
                            yCenter,
                        ],
                        style: {
                            stroke: "orange",
                        },
                    }, {
                        command: "L",
                        arguments: [
                            -axisXEnd + xCenter,
                            -axisYEnd + yCenter,
                        ],
                    }, {
                        //     // MINOR AXIS
                        //     command: "M",
                        //     arguments: [
                        //         startingPoint.x,
                        //         startingPoint.y,
                        //     ],
                        //     style: {
                        //         stroke: "red",
                        //     },
                        // }, {
                        //     command: "L",
                        //     arguments: [
                        //         halfwayPoint.x,
                        //         halfwayPoint.y,
                        //     ],
                        // }, {
                        //     // FULL ARC
                        //     command: "M",
                        //     arguments: [
                        //         startingPoint.x,
                        //         startingPoint.y,
                        //     ],
                        // }, {
                        //     command: "A",
                        //     arguments: [
                        //         xRadius,
                        //         yRadius,
                        //         -rotationAngle,
                        //         +(Math.abs(angle) >= 180),
                        //         +(angle > 0),
                        //         endPoint.x,
                        //         endPoint.y,
                        //     ],
                        // FIRST HALF OF ARC
                        command: "M",
                        arguments: [
                            startingPoint.x,
                            startingPoint.y,
                        ],
                        style: {
                            stroke: "blue",
                        },
                        AcDbEllipse,
                        otherClasses,
                    }, {
                        command: "A",
                        arguments: [
                            xRadius,
                            yRadius,
                            // rotational angle
                            -rotationAngle,
                            // large-arc-flag (large-arc | small-arc)
                            +(Math.abs(angle / 2) >= 180),
                            // sweep-flag (clockwise | counterclockwise)
                            +(angle / 2 > 0),
                            halfwayPoint.x,
                            halfwayPoint.y,
                        ],
                    }, {
                        // SECOND HALF OF ARC
                        command: "M",
                        arguments: [
                            halfwayPoint.x,
                            halfwayPoint.y,
                        ],
                        style: {
                            stroke: "cyan",
                        },
                    }, {
                        command: "A",
                        arguments: [
                            xRadius,
                            yRadius,
                            -rotationAngle,
                            +(Math.abs(angle / 2) >= 180),
                            +(angle / 2 > 0),
                            endPoint.x,
                            endPoint.y,
                        ],
                    }];
                })
                // POLYLINES with CIRCULAR ARCS
                .case(ENTITY === 'LWPOLYLINE', ({ AcDbPolyline }) => AcDbPolyline
                    .map(({
                        10: x,
                        20: y,
                        // 38: elevation,
                        // 39: thickness,
                        // 40: startWidth,
                        // 41: endWidth,
                        // 42: bulge,
                        // 43: constantWidth,
                        // 70: polylineFlag,
                        // 90: vertexCount,
                        // 91: vertexIdentifier,
                        // ...unknownCodes
                    }, i) => (
                            // check previous item
                            match(AcDbPolyline[i - 1])
                                // starting point
                                .equals(undefined, () => ({
                                    command: "M",
                                    arguments: [
                                        x,
                                        y,
                                    ],
                                    AcDbPolyline,
                                }))
                                // arc
                                .on(prev => prev.hasOwnProperty(42), ({
                                    10: prevX,
                                    20: prevY,
                                    42: bulge,
                                }) => {

                                    const distance = Math.sqrt(
                                        Math.pow(prevX - x, 2)
                                        +
                                        Math.pow(prevY - y, 2)
                                    );
                                    const angle = 4 * atan(bulge);
                                    const radius = distance / (2 * sin(angle / 2));

                                    return {
                                        command: "A",
                                        arguments: [
                                            radius,
                                            radius,
                                            // rotational angle
                                            0,
                                            // large-arc-flag (large-arc | small-arc)
                                            +(Math.abs(angle) >= 180),
                                            // sweep-flag (clockwise | counterclockwise)
                                            +(angle > 0),
                                            x,
                                            y,
                                        ],
                                    };
                                })
                                // line
                                .otherwise(() => ({
                                    command: "L",
                                    arguments: [
                                        x,
                                        y,
                                    ],
                                }))
                        )
                    )
                    // close
                    .concat({
                        command: "Z",
                    }))
                // SPLINES
                .case(ENTITY === 'SPLINE', ({ AcDbSpline }) => AcDbSpline
                    .reduce((items, {
                        10: x,
                        20: y,
                    }) => items.concat(x && y ?
                        {
                            command: items.length === 0 ?
                                "M"
                                :
                                "L",
                            arguments: [x, y],
                        }
                        :
                        []), []))
                // ALL OTHERS
                .otherwise(() => {
                    console.error(`Unknown Entity: ${ENTITY}`);
                    console.error({ ENTITY, subClasses });
                    return [];
                })
        }), []);
}

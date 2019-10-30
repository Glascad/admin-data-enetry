import _ from 'lodash';
import match from './match';
import { trig } from '..';
import replace from './replace';

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
                            if (ENTITY === "LWPOLYLINE") {
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
        // convert to SVG data
        .reduce((path, {
            ENTITY,
            subClasses,
            contents,
        }) => path.concat(
            match(subClasses)
                // STRAIGHT LINES
                .case(ENTITY === 'LINE', ({
                    AcDbLine: {
                        10: xStart,
                        11: xEnd,
                        20: yStart,
                        21: yEnd,
                    },
                }) => ([{
                    command: "M",
                    arguments: [
                        xStart,
                        yStart,
                    ],
                }, {
                    command: "L",
                    subClasses,
                    contents,
                    arguments: [
                        xEnd,
                        yEnd,
                    ],
                }]))
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
                        radius * trig.cos(startAngle) + xCenter,
                        radius * trig.sin(startAngle) + yCenter,
                    ],
                }, {
                    command: "A",
                    subClasses,
                    contents,
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
                        radius * trig.cos(endAngle) + xCenter,
                        radius * trig.sin(endAngle) + yCenter,
                    ],
                }])
                // ELLIPTICAL ARCS
                .case(ENTITY === 'ELLIPSE', ({
                    AcDbEllipse: {
                        40: axisRatio,
                        41: start,
                        42: end,
                        210: xExtrusionDirection,
                        220: yExtrusionDirection,
                        230: zExtrusionDirection,
                    },
                }) => [])
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
                                    const angle = 4 * trig.atan(bulge);
                                    const radius = distance / (2 * trig.sin(angle / 2));

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
                    })
                )
                // SPLINES
                .case(ENTITY === 'SPLINE', ({
                    AcDbSpline: {
                        50: startAngle,
                        51: endAngle,
                        ...unknownCodes
                    },
                }) => [{
                    command: "",
                    arguments: [],
                    subClasses,
                    contents,
                    AcDbSpline: {
                        startAngle,
                        endAngle,
                        unknownCodes,
                    },
                }])
                // ALL OTHERS
                .otherwise(() => {
                    console.error(`Unknown Entity: ${ENTITY}`);
                    console.error({ ENTITY, subClasses, contents });
                    return [];
                })
        ), []);
}

import _ from 'lodash';
import match from './match';
import { trig } from '..';

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
                            const existingValue = obj[trimmedCode];
                            return {
                                ...obj,
                                [trimmedCode]: existingValue ?
                                    Array.isArray(existingValue) ?
                                        existingValue.concat(convertedValue)
                                        :
                                        [existingValue, convertedValue]
                                    :
                                    convertedValue,
                            };
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
                        (
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
                        ) >= 180 ?
                            1
                            :
                            0,
                        // sweep-flag (clockwise | counterclockwise)
                        1,
                        radius * trig.cos(endAngle) + xCenter,
                        radius * trig.sin(endAngle) + yCenter,
                    ],
                }])
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
                .case(ENTITY === 'LWPOLYLINE', ({
                    AcDbPolyline: {
                        10: xVertices = [],
                        20: yVertices = [],
                        38: elevation,
                        39: thickness,
                        42: bulges = [],
                        43: constantWidth,
                        70: polylineFlag,
                        90: vertexCount,
                        91: vertexIdentifier,
                        ...unknownCodes
                    },
                }) => xVertices
                    .map((x, i) => ({
                        x,
                        y: yVertices[i],
                        bulge: bulges[i],
                    }))
                        .map(({ x, y, bulge }, i) => ({
                            command: i === 0 ?
                                "M"
                                :
                                "L",
                            arguments: [
                                x,
                                y,
                            ],
                        }))
                )
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
                .otherwise(() => {
                    console.error(`Unknown Entity: ${ENTITY}`);
                    console.error({ ENTITY, subClasses, contents });
                    return [];
                })
        ), []);
}

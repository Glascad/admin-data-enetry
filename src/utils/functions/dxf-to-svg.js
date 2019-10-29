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

            const subEntities = _.chunk(subs, 2)
                .reduce((subEntities, [subEntity, value]) => ({
                    ...subEntities,
                    [subEntity]: _.chunk(value.split(/\n+/g), 2)
                        .reduce((obj, [code, value]) => ({
                            ...obj,
                            [
                                match(code.trim())
                                    .regex(/^8$/, 'layerName')
                                    .regex(/^10$/, 'xStart')
                                    .regex(/^20$/, 'yStart')
                                    .regex(/^30$/, 'zStart')
                                    .regex(/^40$/, 'radius')
                                    .regex(/^50$/, 'startAngle')
                                    .regex(/^51$/, 'endAngle')
                                    .regex(/^11$/, 'xEnd')
                                    .regex(/^21$/, 'yEnd')
                                    .regex(/^31$/, 'zEnd')
                                    .regex(/^100$/, 'subClass')
                                    .otherwise(`unknown_code<${code}>`)
                            ]: match((value || '').trim())
                                .regex(/^\d+(\.\d*)?$/, +value)
                                .otherwise(value)
                        }), {}),
                }), {});

            return {
                ENTITY,
                attributes,
                subEntities,
            };
        })
        // convert to SVG data
        .reduce((path, {
            ENTITY,
            subEntities,
            subEntities: {
                AcDbLine,
                AcDbCircle,
                AcDbArc,
                AcDbLine: {
                    xStart,
                    yStart,
                    xEnd,
                    yEnd,
                } = {},
                AcDbCircle: {
                    xStart: xCenter,
                    yStart: yCenter,
                    radius,
                } = {},
                AcDbArc: {
                    startAngle,
                    endAngle,
                } = {},
            },
        }) => path.concat(
            match(ENTITY)
                .against({
                    LINE: () => ([{
                        command: "M",
                        arguments: [
                            xStart,
                            yStart,
                        ],
                    }, {
                        command: "L",
                        dwg: {
                            AcDbLine,
                        },
                        arguments: [
                            xEnd,
                            yEnd,
                        ],
                    }]),
                    ARC: () => [{
                        // starting point
                        command: "M",
                        arguments: [
                            radius * trig.cos(startAngle) + xCenter,
                            radius * trig.sin(startAngle) + yCenter,
                        ],
                    }, {
                        command: "A",
                        dwg: {
                            AcDbArc,
                            AcDbCircle,
                        },
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
                            // +(startAngle < endAngle),
                            radius * trig.cos(endAngle) + xCenter,
                            radius * trig.sin(endAngle) + yCenter,
                        ],
                    }],
                })
                .otherwise(() => {
                    console.error({ ENTITY, subEntities });
                    throw new Error(`Unknown Entity: ${ENTITY}`);
                })
        ), []);
}

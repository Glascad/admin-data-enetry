const pfs = require('../server/utils/promise-fs');
const _ = require('lodash');

const invokeIfCallback = (cb, ...args) => typeof cb === 'function' ?
    cb(...args)
    :
    cb;

const matched = result => ({
    on: () => matched(result),
    case: () => matched(result),
    against: () => matched(result),
    equals: () => matched(result),
    regex: () => matched(result),
    otherwise: () => result,
    finally: () => {
        throw new Error(`Must use \`otherwise()\` before using finally()`);
    },
});

const match = (...inputs) => ({
    on: (pred, cb) => pred(...inputs) ?
        matched(invokeIfCallback(cb, ...inputs))
        :
        match(...inputs),
    case: (condition, cb) => condition ?
        matched(invokeIfCallback(cb, ...inputs))
        :
        match(...inputs),
    equals: (...args) => inputs.length === 1 ?
        inputs[0] === args[0] ?
            matched(invokeIfCallback(args[1], ...inputs))
            :
            match(...inputs)
        :
        inputs.every((input, i) => input === args[i]) ?
            matched(invokeIfCallback(args[args.length - 1], ...inputs))
            :
            match(...inputs),
    regex: (...args) => inputs.length === 1 ?
        inputs[0].match(args[0]) ?
            matched(invokeIfCallback(args[1], ...inputs))
            :
            match(...inputs)
        :
        inputs.every((input, i) => input.match(args[i])) ?
            matched(invokeIfCallback(args[args.length - 1], ...inputs))
            :
            match(...inputs),
    against: inputs.length === 1 ?
        obj => Object.entries(obj)
            .reduce(
                (acc, [key, cb]) => acc.equals(key, cb),
                match(`${inputs[0]}`)
            )
        :
        () => {
            throw new Error(`Cannot use match().against() on more than one input. Received ${inputs.length} inputs: ${inputs.join(', ')}`)
        },
    otherwise: cb => invokeIfCallback(cb, ...inputs),
    finally: () => {
        throw new Error(`Must use \`otherwise()\` before using finally()`);
    },
});


const replace = (arr, i, val) => {
    if (parseInt(i) !== i) throw new TypeError("First argument to replace() must be an integer");
    const newArr = arr.slice();
    newArr[i] = val;
    return newArr;
}

const getPart = async filename => (await pfs.readFile(`${__dirname}/../parts/${filename}.dxf`)).toString().replace(/\r/g, '');

const getSVG = async filename => {
    const part = await getPart(filename);

    // // separate into lines
    // const lines = part.split(/\n+/g);

    // find index of ENTITY section
    const entityIndex = part.indexOf('ENTITIES');
    // find ending index of ENTITY section
    const endIndex = part.indexOf('ENDSEC', entityIndex);

    // slice out ENTITY section
    const entities = part.slice(
        entityIndex,
        endIndex,
    );

    const split = entities.split(/\n\s*0\n([A-Z]+)/g).slice(1);

    const entityEntries = _.chunk(split, 2);

    const ENTITIES = entityEntries.map(([ENTITY, contents]) => {

        const [value, ...subs] = contents.split(100);

        const attributes = value.split(/\n+/g).filter(Boolean);

        const subEntities = subs.map(sub => {
            const [subEntity, ...value] = sub.split(/\n+/g).filter(Boolean);
            // maybe errors here -- maybe not always in pairs of two -- check later
            const values = _.chunk(value, 2).reduce((obj, [code, value]) => ({
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
                        .otherwise(`unknown code: '${code}'`)
                ]: value,
            }), {});
            return {
                subEntity,
                values,
            };
        });

        return {
            ENTITY,
            attributes,
            subEntities,
        };
    });

    console.log(JSON.stringify(ENTITIES, null, 4));

    return ENTITIES;
    // console.log(entities.match(/^(\s*[A-Z]+\s+[\s\S]*?)+$/g));
    // console.log(entities.split(/\s+([A-Z]+)\s+/g));

    // console.log(entities.split(100));

    // convert ENTITIES into objects
    // const entitiyObjects = entities.reduce((all, line) => {
    //     const lastIndex = all.length - 1;
    //     const lastItem = all[lastIndex];
    //     const subEntities = lastItem.subEntities || [];
    //     return (
    //         line.match(/^\s*[A-Z]+\s*$/) ?
    //             all.concat({
    //                 entity: line,
    //                 arguments: [],
    //                 subEntities: [],
    //             })
    //             :
    //             replace(all, lastIndex, (
    //                 !subEntities.length &&  ?
    //                     {
    //                         ...lastItem,

    //                     } : {
    //                         ...lastItem,
    //                         contents: subEntities.concat(line),
    //                     }
    //             ))
    //     );
    // }, []);

    // console.log(entitiyObjects);

}

const DWGToSVG = async (filename, outputPath) => {
    const entities = await getSVG(filename);
    if (outputPath) {
        pfs.writeFile(`${__dirname}/${outputPath}`, JSON.stringify(entities, null, 4));
    }
}

DWGToSVG('head-part', '../HEAD_ENTITIES.json');

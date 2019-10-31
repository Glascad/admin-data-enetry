
const invokeIfCallback = (cb, ...args) => typeof cb === 'function' ?
    cb(...args)
    :
    cb;

export const final = result => ({
    finally: cb => cb(result),
});

const matched = result => ({
    on: () => matched(result),
    case: () => matched(result),
    equals: () => matched(result),
    in: () => matched(result),
    regex: () => matched(result),
    against: () => matched(result),
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
    in: (array, cb) => inputs.every(input => array.includes(input)) ?
        matched(invokeIfCallback(cb, ...inputs))
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
    against: obj => Object.entries(obj)
        .reduce(
            (acc, [key, cb]) => acc.equals(key, cb),
            match(`${inputs[0]}`, ...inputs.slice(1))
        ),
    otherwise: cb => invokeIfCallback(cb, ...inputs),
    finally: () => {
        throw new Error(`Must use \`otherwise()\` before using finally()`);
    },
});

export default match;

// const invokeIfCallback = (cb, ...args) => typeof cb === 'function' ?
//     cb(...args)
//     :
//     cb;

// export const final = result => ({
//     finally: cb => cb(result),
// });

// const matched = result => ({
//     on: () => matched(result),
//     case: () => matched(result),
//     against: () => matched(result),
//     equals: () => matched(result),
//     regex: () => matched(result),
//     otherwise: () => result,
//     finally: () => { throw new Error(`Must use \`otherwise()\` before using finally()`) },
// });

// const match = input => ({
//     on: (pred, cb) => pred(input) ? matched(invokeIfCallback(cb, input)) : match(input),
//     case: (condition, cb) => condition ? matched(invokeIfCallback(cb, input)) : match(input),
//     against: obj => Object.entries(obj)
//         .reduce((acc, [key, cb]) => (
//             acc.equals(key, cb)
//         ), match(`${input}`)),
//     equals: (val, cb) => (input === val ? matched(invokeIfCallback(cb, input)) : match(input)),
//     regex: typeof input === 'string' ?
//         (regex, cb) => input.match(regex) ? matched(invokeIfCallback(cb, input)) : match(input)
//         :
//         () => { throw new Error(`Cannot use \`regex()\` on non-string match. Received value: ${input}`) },
//     otherwise: cb => invokeIfCallback(cb, input),
//     finally: () => { throw new Error(`Must use \`otherwise()\` before using finally()`) },
// });

// // const matchedWhen = result => ({
// //     when: () => matchedWhen(result),
// //     otherwise: () => result,
// // });

// // export const when = (cond, result) => cond ? matchedWhen(result) : ({
// //     when: (cond, result) => cond ? matchedWhen(result) : when(),
// //     otherwise: result => result,
// // });

// export default match;

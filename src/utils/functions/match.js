
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
    against: () => matched(result),
    equals: () => matched(result),
    regex: () => matched(result),
    otherwise: () => result,
    finally: () => { throw new Error(`Must use \`otherwise()\` before using finally()`) },
});

const match = input => ({
    on: (pred, cb) => pred(input) ? matched(invokeIfCallback(cb, input)) : match(input),
    case: (condition, cb) => condition ? matched(invokeIfCallback(cb, input)) : match(input),
    against: obj => Object.entries(obj)
        .reduce((acc, [key, cb]) => (
            acc.equals(key, cb)
        ), match(`${input}`)),
    equals: (val, cb) => (input === val ? matched(invokeIfCallback(cb, input)) : match(input)),
    regex: typeof input === 'string' ?
        (regex, cb) => input.match(regex) ? matched(invokeIfCallback(cb, input)) : match(input)
        :
        () => { throw new Error(`Cannot use \`regex()\` on non-string match. Received value: ${input}`) },
    otherwise: cb => invokeIfCallback(cb, input),
    finally: () => { throw new Error(`Must use \`otherwise()\` before using finally()`) },
});

// const matchedWhen = result => ({
//     when: () => matchedWhen(result),
//     otherwise: () => result,
// });

// export const when = (cond, result) => cond ? matchedWhen(result) : ({
//     when: (cond, result) => cond ? matchedWhen(result) : when(),
//     otherwise: result => result,
// });

export default match;

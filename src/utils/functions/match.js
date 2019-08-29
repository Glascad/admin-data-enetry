
const final = result => ({
    finally: cb => cb(result),
});

const matched = result => ({
    on: () => matched(result),
    condition: () => matched(result),
    against: () => matched(result),
    equals: () => matched(result),
    regex: () => matched(result),
    otherwise: () => final(result),
    finally: () => { throw new Error(`Must use \`otherwise()\` before using finally`) },
});

const match = input => ({
    on: (pred, fn) => pred(input) ? matched(fn(input)) : match(input),
    condition: (condition, fn) => condition ? matched(fn(input)) : match(input),
    against: obj => Object.entries(obj)
        .reduce((acc, [key, cb]) => (
            acc.equals(key, cb)
        ), match(`${input}`)),
    equals: (val, fn) => (input === val ? matched(fn(input)) : match(input)),
    regex: typeof input === 'string' ?
        (regex, fn) => input.match(regex) ? matched(fn(input)) : match(input)
        :
        () => { throw new Error(`Cannot use \`regex()\` on non-string match. Received value: ${input}`) },
    otherwise: fn => final(fn(input)),
    finally: () => { throw new Error(`Must use \`otherwise()\` before using finally`) },
});

export default match;

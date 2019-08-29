
const final = x => ({
    finally: cb => cb(x),
});

const matched = x => ({
    on: () => matched(x),
    condition: () => matched(x),
    against: () => matched(x),
    equals: () => matched(x),
    regex: typeof x === 'string' ?
        () => matched(x)
        :
        () => { throw new Error(`Cannot use \`regex()\` on non-string match`) },
    otherwise: () => final(x),
    finally: () => { throw new Error(`Must use \`otherwise()\` before using finally `) },
});

const match = x => ({
    on: (pred, fn) => pred(x) ? matched(fn(x)) : match(x),
    condition: (condition, fn) => condition ? matched(fn(x)) : match(x),
    against: obj => Object.entries(obj)
        .reduce((acc, [key, cb]) => (
            acc.equals(key, cb)
        ), match(x)),
    equals: (val, fn) => (x === val ? matched(fn(x)) : match(x)),
    regex: typeof x === 'string' ?
        (regex, fn) => x.match(regex) ? matched(fn(x)) : match(x)
        :
        () => { throw new Error(`Cannot use \`regex()\` on non-string match`) },
    otherwise: fn => final(fn(x)),
    finally: () => { throw new Error(`Must use \`otherwise()\` before using finally `) },
});

export default match;

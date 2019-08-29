
const final = x => ({
    finally: cb => cb(x),
});

const matched = x => ({
    on: () => matched(x),
    condition: () => matched(x),
    equals: () => matched(x),
    otherwise: () => final(x),
});

const match = x => ({
    on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
    condition: (condition, fn) => (condition ? matched(fn(x)) : match(x)),
    equals: (val, fn) => (x === val ? matched(fn(x)) : match(x)) ,
    otherwise: fn => final(fn(x)),
});

export default match;

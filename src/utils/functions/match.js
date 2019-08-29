
const matched = x => ({
    on: () => matched(x),
    condition: () => matched(x),
    otherwise: () => x,
});

const match = x => ({
    on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
    condition: (condition, fn) => (condition ? matched(fn(x)) : match(x)),
    otherwise: fn => fn(x),
});

export default match;


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
    finally: () => { throw new Error(`Must use \`otherwise()\` before using finally`) },
});

const match = input => ({
    on: (pred, fn) => pred(input) ? matched(fn(input)) : match(input),
    case: (condition, fn) => condition ? matched(fn(input)) : match(input),
    against: obj => Object.entries(obj)
        .reduce((acc, [key, cb]) => (
            acc.equals(key, cb)
        ), match(`${input}`)),
    equals: (val, fn) => (input === val ? matched(fn(input)) : match(input)),
    regex: typeof input === 'string' ?
        (regex, fn) => input.match(regex) ? matched(fn(input)) : match(input)
        :
        () => { throw new Error(`Cannot use \`regex()\` on non-string match. Received value: ${input}`) },
    otherwise: fn => fn(input),
    finally: () => { throw new Error(`Must use \`otherwise()\` before using finally`) },
});

const matchedCondition = result => ({
    when: () => matchedCondition(result),
    otherwise: () => result,
});

export const when = () => ({
    when: (con, result) => con ? matchedCondition(result) : when(),
    otherwise: result => result,
});

export default match;

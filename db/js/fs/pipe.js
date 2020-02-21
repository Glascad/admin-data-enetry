
const pipe = (arg, cb, ...callbacks) => {
    const val = cb(arg);
    return callbacks.length ?
        pipe(val, ...callbacks)
        :
        val;
}

const asyncPipe = async (promise, cb, ...callbacks) => {
    const result = await promise;
    const val = cb(result);
    return callbacks.length ?
        asyncPipe(val, ...callbacks)
        :
        val;
}

const asyncMap = async ([item, ...rest], cb, results = []) => {
    const result = await cb(item);
    const newResults = results.concat(result);
    return rest.length ?
        asyncMap(rest, cb, newResults)
        :
        newResults;
}

const compose = (...callbacks) => arg => pipe(arg, ...callbacks);

const asyncCompose = (...callbacks) => arg => asyncPipe(arg, ...callbacks);

const spread = cb => argArr => cb(...argArr);

const apply = (...vals) => (...args) => vals[vals.length - 1](
    ...vals.slice(0, vals.length - 1),
    ...args,
);

const tap = cb => arg => {
    cb(arg);
    return arg;
}

const asyncTap = cb => async arg => {
    await cb(arg);
    return arg;
}

module.exports = {
    pipe,
    asyncPipe,
    asyncMap,
    compose,
    asyncCompose,
    spread,
    apply,
    tap,
    asyncTap,
};

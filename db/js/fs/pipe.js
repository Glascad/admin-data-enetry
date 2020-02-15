
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

const spread = cb => argArr => cb(...argArr);

const apply = (val, cb) => (...args) => cb(val, ...args);

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
    spread,
    apply,
    tap,
    asyncTap,
};

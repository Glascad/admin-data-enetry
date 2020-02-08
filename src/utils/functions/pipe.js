
export default (arg, ...callbacks) => callbacks.reduce((val, cb) => cb(val), arg);

export const asyncPipe = async (promise, cb, ...callbacks) => {
    const result = await promise;
    const val = cb(result);
    return callbacks.length ?
        asyncPipe(val, ...callbacks)
        :
        val;
}

export const tap = cb => arg => {
    cb(arg);
    return arg;
}

export const asyncTap = cb => async arg => {
    await cb(arg);
    return arg;
}

export const filter = (cb, onFail) => arg => cb(arg) ? arg : onFail(arg);

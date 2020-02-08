
export default (arg, ...callbacks) => callbacks.reduce((val, cb) => cb(val), arg);

export const asyncPipe = (promise, ...callbacks) => callbacks.reduce(async (val, cb) => await cb(await val), promise);


export default (arg, ...callbacks) => callbacks.reduce((val, cb) => cb(val), arg);

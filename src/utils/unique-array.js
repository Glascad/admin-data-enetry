
export default (...arrays) => [...new Set(arrays.reduce((res, arr) => res.concat(arr), []))];

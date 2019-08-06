
export default str => typeof str === 'string' ?
    str
        .split(/[_|\W]/g)
        .map(([f = '', ...w]) => `${
            f.toUpperCase()
            }${
            w.join('').toLowerCase()
            }`)
        .join(' ')
    :
    str;

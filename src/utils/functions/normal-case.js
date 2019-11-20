
export default window.normalCase = str => typeof str === 'string' ?
    str
        .split(/[_|\s]+/g)
        .map(w => `${
            w.replace(/^(\W*\w)?(.*)$/, '$1').toUpperCase()
            }${
            w.replace(/^(\W*\w)?(.*)$/, '$2').toLowerCase()
            }`)
        .join(' ')
        .trim()
    :
    str;

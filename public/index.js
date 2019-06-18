
Number.prototype[Symbol.iterator] = function* () {
    for (let i = 0; i < this; i++) {
        yield i;
    }
};
Array.prototype.replace = function (i, val) {
    if (parseInt(i) !== i) throw new TypeError("First argument to Array.replace() must be an integer");
    const newArr = this.slice();
    newArr[i] = val;
    return newArr;
};

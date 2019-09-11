
Number.prototype[Symbol.iterator] = function* () {
    for (let i = 0; i < this; i++) {
        yield i;
    }
};

Array.prototype.replace = function replace(i, val) {
    if (parseInt(i) !== i) throw new TypeError("First argument to replace() must be an integer");
    const newArr = this.slice();
    newArr[i] = val;
    return newArr;
};

window.addEventListener("keydown", ({ key, keyCode }) => {
    if (!window.keys) window.keys = {};
    if (!window.keyCodes) window.keyCodes = {};

    window.keys[key] = true;
    window.keyCodes[keyCode] = true;
});

window.addEventListener("keyup", ({ key, keyCode }) => {
    if (!window.keys) window.keys = {};
    if (!window.keyCodes) window.keyCodes = {};

    window.keys[key] = false;
    window.keyCodes[keyCode] = false;
});

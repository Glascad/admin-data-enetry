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

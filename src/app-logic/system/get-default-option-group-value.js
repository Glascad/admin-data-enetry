import getLastItemFromPath from "./get-last-item-from-path";

export default window.getDefaultOptionGroupValue = (optionName, { _configurationOptions, _detailOptions, _systemOptions }) => Object.entries([
    ..._configurationOptions,
    ..._detailOptions,
    ..._systemOptions,
].find(({ path }) => getLastItemFromPath(path) === optionName) || {})
    .reduce((defaultValue, [key, value]) => defaultValue || (
        key.match(/^default/i) ?
            value
            :
            defaultValue
    ), '');

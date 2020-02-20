
export default window.replaceOptionValue = (path, optionName, newValueName) => path.replace(new RegExp(`(${optionName}\\.).*$`), `$1${newValueName}`);

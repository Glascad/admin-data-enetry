
const removeEmptyLines = (path, contents) => contents.replace(/(\n\s*\n)/g, '\n');

module.exports = removeEmptyLines;

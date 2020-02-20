
const removeComments = (path, contents) => contents.replace(/--.*\n/g, '\n');

module.exports = removeComments;

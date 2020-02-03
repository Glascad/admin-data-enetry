
export default window.getLastItemFromPath = (path = '', { name } = {}) => name && path.match(/^\d+$/) ?
    name
    :
    path.replace(/.*\.([0-9a-zA-Z-_]+)$/, '$1');

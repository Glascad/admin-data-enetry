
export default window.getParentPath = item => item.path ?
    item.path.replace(/(\.__(D|C|P)T-?\d*__)?\.[0-9a-zA-Z-_]+$/, '')
    :
    Object.entries(item).reduce((parentPath, [key, value]) => key.match(/^parent/) ? value : parentPath, '');

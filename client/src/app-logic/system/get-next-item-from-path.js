
export default window.getNextItemFromPath = (path, previousItem) => {
    if (previousItem.match(/[^a-z0-9_]/ig)) throw new Error(`Cannot search for ${previousItem}, contains invalid characters`);
    return path.includes(previousItem) ?
        path.replace(new RegExp(`^.*\\.?${previousItem}\\.([^.]+)(\..+)*\\.?.*$`, 'ig'), '$1')
        :
        undefined;
}

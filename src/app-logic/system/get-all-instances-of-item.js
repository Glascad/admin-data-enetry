import getLastItemFromPath from "./get-last-item-from-path";

export default window.getAllInstancesOfItem = ({ path, __typename }, systemMap) => {
    const itemType = __typename.replace(/^.*(detail|configuration)$/i, 'Type').replace(/^.*((option)|(value))$/i, '$1');
    const itemName = getLastItemFromPath(path);
    const nameRegex = new RegExp(`^.*${itemName}$`);
    return Object.entries(systemMap).filter(([key, value]) => (
        key.match(nameRegex)
        &&
        value.__typename.replace(/^.*(detail|configuration)$/i, 'Type').replace(/^.*((option)|(value))$/i, '$1') === itemType
    )).map(([key]) => key);
};

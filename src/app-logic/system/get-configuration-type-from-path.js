import getNextItemFromPath from "./get-next-item-from-path";

export default window.getConfigurationTypeFromPath = path => getNextItemFromPath(path, '__CT__');

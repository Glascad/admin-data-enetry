import getNextItemFromPath from "./get-next-item-from-path";

export default window.getDetailTypeFromPath = path => getNextItemFromPath(path, '__DT__');

import getParentPath from "./get-parent-path";

export default window.getSiblings = ({ path, newPath } = {}, systemMap) => systemMap.parents[getParentPath({ newPath, path })] || [];

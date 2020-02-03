import getParentPath from "./get-parent-path";

export default window.getParent = ({ path } = {}, systemMap) => systemMap[getParentPath({ path })];

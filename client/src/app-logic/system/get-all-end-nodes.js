import getChildren from "./get-children"

export default window.getAllEndNodes = (item, systemMap) => {
    const children = getChildren(item, systemMap);
    return children.length === 0 ?
        [item]
        :
        children.reduce((endNodes, child) => endNodes.concat(window.getAllEndNodes(child, systemMap)), []);
};
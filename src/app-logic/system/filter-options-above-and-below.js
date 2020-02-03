import filterOptionsAbove from "./filter-options-above";
import getAllEndNodes from "./get-all-end-nodes";

export default window.filterOptionsAboveAndBelow = ({ path }, optionList = [], systemMap) => {
    const endNodes = getAllEndNodes({ path }, systemMap);
    return endNodes.reduce((filteredArray, node) => filterOptionsAbove(node, filteredArray), optionList);
};
import SystemMap from "./system-map";

const getChildren = window.getChildren = ({ path } = {}, systemMap) => systemMap instanceof SystemMap ?
    systemMap.parents ?
        systemMap.parents[path] || []
        :
        []
    :
    getChildren({ path }, new SystemMap(systemMap));

export default getChildren;

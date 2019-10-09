export class SystemMap {
    constructor({
        _systemOptions = [],
        _detailOptions = [],
        _configurationOptions = [],
        _systemOptionValues = [],
        _detailOptionValues = [],
        _configurationOptionValues = [],
        _systemDetails = [],
        _systemConfigurations = [],
    } = {}) {
        Object.assign(this, [
            ..._systemOptions,
            ..._detailOptions,
            ..._configurationOptions,
            ..._systemOptionValues,
            ..._detailOptionValues,
            ..._configurationOptionValues,
            ..._systemDetails,
            ..._systemConfigurations,
        ].reduce((map, item, i, allItems) => {
            const { path } = item;
            const parentPath = getParentPath({ path });
            const {
                [path]: previousItem,
                parents,
                parents: {
                    [parentPath]: siblings = [],
                } = {},
            } = map;
            if (previousItem) throw new Error(`Duplicate item in SystemMap: ${path}`);
            return {
                ...map,
                [path]: item,
                parents: {
                    ...parents,
                    [parentPath]: siblings.concat(item),
                },
                allItems,
            };
        }, {}))
    }
}

export const getParentPath = ({ path, newPath }) => (newPath || path || '').replace(/((\.__DT__)|(\.__CT__))?\.\w+$/, '');

export const getParent = ({ path, newPath } = {}, systemMap) => systemMap[getParentPath({ newPath, path })];

export const getChildren = ({ path, newPath } = {}, systemMap) => systemMap instanceof SystemMap ?
    systemMap.parents ?
        systemMap.parents[(newPath || path)] || []
        :
        []
    :
    getChildren({ path, newPath }, new SystemMap(systemMap));

export const getSiblings = ({ path, newPath } = {}, systemMap) => systemMap.parents[getParentPath({ newPath, path })];

export const makeRenderable = system => {

    console.log({ system });
    const { _systemOptions } = system;
    const systemMap = new SystemMap(system);
    console.log(systemMap);
    const makeNodeRenderable = node => ({
        item: node,
        branches: getChildren(node, systemMap).map(makeNodeRenderable),
    });
    return makeNodeRenderable(_systemOptions.find(({ path = '', newPath }) => (newPath ? newPath : path).match(/^\d\.\w+$/)));
}

export const filterOptionsAbove = ({ path, newPath }, optionList) => optionList.filter(({ name }) => !(newPath ? newPath : path).includes(name));

export const getNameFromPath = path => path.replace(/.*\.(\w+)$/, '$1');

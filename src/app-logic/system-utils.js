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
    }) {
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

export const getParentPath = ({ path }) => path.replace(/\.\w+$/, '');

export const getParent = ({ path } = {}, systemMap) => systemMap[getParentPath({ path })];

export const getChildren = ({ path } = {}, systemMap) => systemMap instanceof SystemMap ?
    systemMap.parents ?
        systemMap.parents[path] || []
        :
        []
    :
    getChildren({ path }, new SystemMap(systemMap));

export const getSiblings = ({ path } = {}, systemMap) => systemMap.parents[getParentPath({ path })];

export const makeRenderable = system => {

    console.log({ system });
    const { _systemOptions } = system;
    const systemMap = new SystemMap(system);
    console.log(systemMap);
    const makeNodeRenderable = node => ({
        item: node,
        branches: getChildren(node, systemMap).map(makeNodeRenderable),
    });
    return makeNodeRenderable(_systemOptions.find(({ path = '' }) => path.match(/^\d\.\w+$/)));
}

export const filterOptionsAbove = ({ path }, optionList) => optionList.filter(({ name }) => !path.includes(name));
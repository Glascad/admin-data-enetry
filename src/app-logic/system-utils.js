
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
        Object.assign(this, {
            _systemOptions,
            _detailOptions,
            _configurationOptions,
            _systemOptionValues,
            _detailOptionValues,
            _configurationOptionValues,
            _systemDetails,
            _systemConfigurations,
        }, [
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

export const getFirstItem = ({ _systemOptions } = []) => _systemOptions.find(({ path = '', newPath }) => (newPath ? newPath : path).match(/^\d\.\w+$/));

export const getParentPath = ({ path, newPath } = {}) => (newPath || path || '').replace(/((\.__DT__)|(\.__CT__))?\.\w+$/, '');

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
    const systemMap = new SystemMap(system);
    const makeNodeRenderable = node => ({
        item: node,
        branches: getChildren(node, systemMap).map(makeNodeRenderable),
    });
    const { _systemOptions } = system;
    return makeNodeRenderable(getFirstItem(systemMap));
}

export const getOptionListFromPath = path => path
    .replace(/^\d+\.(.*__(D|C)T__\.\w+\.?)?/, '')
    .replace(/(\w+)\.(\w+)(\.)?/ig, ' $1:$2 ')
    .trim()
    .split(/\s+/g)
    .map(s => s.trim())
    .filter(Boolean)
    .map(str => str.split(/:/g))
    .map(([name, value]) => ({ name, value }));

export const getLastItemFromPath = path => path.replace(/.*\.(\w+)$/, '$1');

export const filterOptionsAbove = ({ path, newPath }, optionList) => optionList.filter(({ name }) => !(newPath ? newPath : path).includes(name));

export const getNextItemFromPath = (path, previousItem) => {
    if (previousItem.match(/[^a-z0-9_]/ig)) throw new Error(`Cannot search for ${previousItem}, contains invalid characters`);
    return path.includes(previousItem) ?
        path.replace(new RegExp(`^.*\\.?${previousItem}\\.([^.]+)(\..+)*\\.?.*$`, 'ig'), '$1')
        :
        undefined;
}

export const getDetailTypeFromPath = path => getNextItemFromPath(path, '__DT__');

export const getConfigurationTypeFromPath = path => getNextItemFromPath(path, '__CT__');

export const getDefaultPath = (item, systemMap) => {
    if (item === undefined) return '';
    if (systemMap === undefined) return getDefaultPath(getFirstItem(item), item);
    const { path, __typename } = item;
    const children = getChildren(item, systemMap);
    const defaultKey = Object.keys(item).find(key => key.match(/^default.*OptionValue/i));
    const defaultValue = item[defaultKey];
    const {
        0: firstChild,
        length: childCount,
    } = children;
    const defaultChild = __typename.match(/Option$/) ?
        children.find(({ path }) => path.endsWith(defaultValue))
        :
        __typename.match(/OptionValue$/) && childCount === 1 ?
            firstChild
            :
            undefined;
    if (defaultChild) return getDefaultPath(defaultChild, systemMap);
    else return path;
};

export const replaceOptionValue = (path, optionName, newValueName) => path.replace(new RegExp(`(${optionName}\\.).*$`), `$1${newValueName}`);

export const getOptionGroupValuesByOptionName = (name, systemMap) => [];

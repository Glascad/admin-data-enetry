import { match } from '../utils';

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
            const { path, newPath } = item;
            const parentPath = getParentPath(item);
            const {
                [newPath || path]: previousItem,
                parents,
                parents: {
                    [parentPath]: siblings = [],
                } = {},
            } = map;
            if (previousItem) throw new Error(`Duplicate item in SystemMap: ${path}`);
            return {
                ...map,
                [newPath || path]: item,
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

export const getTypenameFromPath = path => {
    const Type = match(path)
        .regex(/__CT__/, 'Configuration')
        .regex(/__DT__/, 'Detail')
        .otherwise('System');
    const count = (path.replace(/.*__(C|D)T__\./, '').match(/\./g) || []).length;
    return count === 0 ?
        `System${Type}`
        :
        count % 2 ?
            `${Type}Option`
            :
            `${Type}OptionValue`;
}

export const getParentTypename = ({ path } = {}) => path.includes('__CT__') ?
    (path.replace(/^.*__CT__./, '').match(/\./g) || []).length % 2 === 0 ?
        path.match(/^.*__CT__\.\w+$/) ?
            'SystemConfiguration'
            :
            'ConfigurationOptionValue'
        :
        'ConfigurationOption'
    :
    path.includes('__DT__') ?
        (path.replace(/^.*__DT__./, '').match(/\./g) || []).length % 2 === 0 ?
            path.match(/^.*__DT__\.\w+$/) ?
                'SystemDetail'
                :
                'DetailOptionValue'
            :
            'DetailOption'
        :
        (path.match(/\./g) || []).length % 2 === 0 ?
            "SystemOptionValue"
            :
            "SystemOption"


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
    return makeNodeRenderable(getFirstItem(systemMap));
}

export const getOptionListFromPath = (path = '') => path
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

export const getDefaultPath = (one, two, three) => {
    // argument/parameter mappings
    if (one === undefined) return '';
    // when passed systemmap as first item instead of item (item = systemMap, systemMap = optionGroupValues)
    if (two === undefined || Array.isArray(two)) return getDefaultPath(getFirstItem(one), one, two);
    const systemMap = two;
    const providedPath = typeof one === 'string' ? one : one.path;
    const item = systemMap[providedPath];
    if (!item) return providedPath;
    const optionGroupValues = three || [];
    // end mappings
    const { path } = item;
    const { __typename = getTypenameFromPath(path) } = item;
    // console.log({ path, __typename });
    const children = getChildren(item, systemMap);
    const defaultKey = Object.keys(item).find(key => key.match(/^default.*OptionValue/i));
    const defaultOptionValue = item[defaultKey];
    const {
        0: firstChild,
        0: {
            __typename: childTypename = '',
        } = {},
        length: childCount,
    } = children;
    const isOption = __typename.match(/Option$/);
    const optionName = getLastItemFromPath(path);
    const optionGroup = optionGroupValues.find(ovg => ovg.optionName === optionName);
    const defaultValue = (optionGroup || {}).name || defaultOptionValue;
    const defaultChild = isOption ?
        children.find(({ path }) => path.endsWith(defaultValue))
        :
        childTypename.match(/option/i) ?
            firstChild
            :
            undefined;
    return defaultChild ?
        getDefaultPath(defaultChild, systemMap, optionGroupValues)
        :
        path;
};

export const replaceOptionValue = (path, optionName, newValueName) => path.replace(new RegExp(`(${optionName}\\.).*$`), `$1${newValueName}`);

export const getOptionGroupValuesByOptionName = (optionName, systemMap) => Object.keys(systemMap)
    .reduce((values, key) => values.concat((
        key.match(new RegExp(`^.*\\.${optionName}\\.(\\w+)\\..*$`)) || []
    )[1] || []), []);

export const removeDescendantPaths = paths => paths.filter(descendant => !paths.some(path => descendant !== path && descendant.startsWith(path)));

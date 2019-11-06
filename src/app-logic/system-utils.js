import { match } from '../utils';

export class SystemMap {
    constructor(system) {
        const {
            _optionGroups = [],
            _systemOptions = [],
            _detailOptions = [],
            _configurationOptions = [],
            _systemOptionValues = [],
            _detailOptionValues = [],
            _configurationOptionValues = [],
            _systemDetails = [],
            _detailConfigurations = [],
        } = system || {};
        Object.assign(this, system, [
            ..._systemOptions,
            ..._detailOptions,
            ..._configurationOptions,
            ..._systemOptionValues,
            ..._detailOptionValues,
            ..._configurationOptionValues,
            ..._systemDetails,
            ..._detailConfigurations,
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
                    [parentPath]: siblings.concat(item).sort(({ __typename, path: sib1Path }, { path: sib2Path }) => __typename.match(/value$/i) ?
                        sib1Path < sib2Path ? -1 : 1
                        :
                        0),
                },
                allItems,
            };
        }, {}))
    }
}

export const getFirstItem = window.getFirstItem = ({ _systemOptions = [] }) => _systemOptions.find(({ path = '', newPath }) => (newPath ? newPath : path).match(/^\d\.\w+$/));

export const getParentPath = window.getParentPath = ({ path, newPath } = {}) => (newPath || path || '').replace(/((\.__DT__)|(\.__CT__))?\.\w+$/, '');

export const getTypenameFromPath = window.getTypenameFromPath = path => {
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

export const getPathsTypename = window.getPathsTypename = ({ path } = {}) => path.includes('__CT__') ?
    (path.replace(/^.*__CT__./, '').match(/\./g) || []).length % 2 === 0 ?
        path.match(/^.*__CT__\.\w+$/) ?
            'DetailConfiguration'
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

export const getItemPathAddition = ({ __typename = '' }) => __typename.match(/(detail|configuration)$/i) ?
    __typename.match(/detail$/i) ?
        `__DT__.`
        :
        `__CT__.`
    :
    '';

export const getParent = window.getParent = ({ path, newPath } = {}, systemMap) => systemMap[getParentPath({ newPath, path })];

export const getChildren = window.getChildren = ({ path, newPath } = {}, systemMap) => systemMap instanceof SystemMap ?
    systemMap.parents ?
        systemMap.parents[(newPath || path)] || []
        :
        []
    :
    getChildren({ path, newPath }, new SystemMap(systemMap));

export const getSiblings = window.getSiblings = ({ path, newPath } = {}, systemMap) => systemMap.parents[getParentPath({ newPath, path })];

export const makeRenderable = window.makeRenderable = system => {
    const systemMap = new SystemMap(system);
    const makeNodeRenderable = node => ({
        item: node,
        branches: getChildren(node, systemMap).map(makeNodeRenderable),
    });
    return makeNodeRenderable(getFirstItem(systemMap));
}

export const getOptionListFromPath = window.getOptionListFromPath = (path = '') => path
    .replace(/^\d+\.(.*__(D|C)T__\.\w+\.?)?/, '')
    .replace(/(\w+)\.(\w+)(\.)?/ig, ' $1:$2 ')
    .trim()
    .split(/\s+/g)
    .map(s => s.trim())
    .filter(Boolean)
    .map(str => str.split(/:/g))
    .map(([name, value]) => ({ name, value }));

export const getLastItemFromPath = window.getLastItemFromPath = path => path.replace(/.*\.(\w+)$/, '$1');

export const filterOptionsAbove = window.filterOptionsAbove = ({ path, newPath }, optionList) => optionList.filter(({ name }) => !(newPath ? newPath : path).includes(name));

export const getNextItemFromPath = window.getNextItemFromPath = (path, previousItem) => {
    if (previousItem.match(/[^a-z0-9_]/ig)) throw new Error(`Cannot search for ${previousItem}, contains invalid characters`);
    return path.includes(previousItem) ?
        path.replace(new RegExp(`^.*\\.?${previousItem}\\.([^.]+)(\..+)*\\.?.*$`, 'ig'), '$1')
        :
        undefined;
}

export const getDetailTypeFromPath = window.getDetailTypeFromPath = path => getNextItemFromPath(path, '__DT__');

export const getConfigurationTypeFromPath = window.getConfigurationTypeFromPath = path => getNextItemFromPath(path, '__CT__');

export const getDefaultPath = window.getDefaultPath = (one, two, three) => {
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

export const replaceOptionValue = window.replaceOptionValue = (path, optionName, newValueName) => path.replace(new RegExp(`(${optionName}\\.).*$`), `$1${newValueName}`);

export const getOptionGroupValuesByOptionName = window.getOptionGroupValuesByOptionName = (optionName, systemMap) => Object.keys(systemMap)
    .reduce((values, key) => values.concat((
        key.match(new RegExp(`^.*\\.${optionName}\\.(\\w+)\\..*$`)) || []
    )[1] || []), []);

export const getDefaultOptionGroupValue = window.getDefaultOptionGroupValue = (optionName, { _configurationOptions, _detailOptions, _systemOptions }) => Object.entries([
    ..._configurationOptions,
    ..._detailOptions,
    ..._systemOptions,
].find(({ name }) => name === optionName) || {})
    .reduce((defaultValue, [key, value]) => defaultValue || (
        key.match(/^default/i) ?
            value
            :
            defaultValue
    ), '');

export const removeDescendantPaths = window.removeDescendantPaths = paths => paths
    .filter(descendant => !paths.some(path => descendant !== path && descendant.startsWith(path) && !descendant.startsWith(`${path}_`)));

export const getAllInstancesOfItem = ({ path, __typename }, systemMap) => {
    const itemType = __typename.replace(/^.*(detail|configuration)$/i, 'Type').replace(/^.*((option)|(value))$/i, '$1');
    const itemName = getLastItemFromPath(path);
    const nameRegex = new RegExp(`^.*${itemName}$`);
    return Object.entries(systemMap).filter(([key, value]) => key.match(nameRegex)
        &&
        value.__typename.replace(/^.*(detail|configuration)$/i, 'Type').replace(/^.*((option)|(value))$/i, '$1') === itemType
    ).map(([key]) => key);
};

export const canItemBeGrouped = ({ path, __typename }, systemMap, ) => {
    const itemName = getLastItemFromPath(path);
    const allInstances = getAllInstancesOfItem({ path, __typename }, systemMap);
    const values = getChildren({ path }, systemMap).map(value => getLastItemFromPath(value.path));
    const [defaultValueKey, defaultValue] = Object.entries(systemMap[path]).find(([key]) => key.match(/default/i)) || [];

    return allInstances.every(optionPath => {
        const childrenValues = getChildren({ path: optionPath }, systemMap);
        const [optionDefaultKey, optionDefaultValue] = Object.entries(systemMap[optionPath]).find(([key]) => key.match(/default/i)) || [];
        return defaultValue === optionDefaultValue
            &&
            childrenValues.length === values.length
            &&
            childrenValues.every(value => values.includes(getLastItemFromPath(value.path)));
    });

}

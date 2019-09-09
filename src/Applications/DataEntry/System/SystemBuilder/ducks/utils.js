import _ from 'lodash';

export const getFirstItem = ({ "undefined:undefined": [firstItem] = [], _systemOptions = [] }) => (
    firstItem
    ||
    _systemOptions.find(({ parentSystemOptionValueId }) => !parentSystemOptionValueId)
);

export const generateSystemMap = ({
    _systemOptions = [],
    _detailOptions = [],
    _configurationOptions = [],
    _systemOptionValues = [],
    _detailOptionValues = [],
    _configurationOptionValues = [],
    _systemDetailTypes = [],
    _systemConfigurationTypes = [],
}) => _.groupBy([
    ..._systemOptions,
    ..._detailOptions,
    ..._configurationOptions,
    ..._systemOptionValues,
    ..._detailOptionValues,
    ..._configurationOptionValues,
    ..._systemDetailTypes,
    ..._systemConfigurationTypes,
], item => {
    const parentKey = Object.keys(item).find(key => key.match(/^parent/));
    const { [parentKey]: id } = item;
    return `${parentKey}:${id}`;
});

export const getChildren = ({ __typename, fakeId, id } = {}, systemMap) => (
    systemMap[`parent${__typename}${fakeId ? 'Fake' : ''}Id:${fakeId || id}`]
    ||
    []
);

export const makeRenderable = system => {
    const systemMap = generateSystemMap(system);
    const makeNodeRenderable = node => ({
        item: node,
        branches: getChildren(node, systemMap).map(makeNodeRenderable),
    });
    console.log({ systemMap });
    return makeNodeRenderable(getFirstItem(systemMap));
}

export const findItemByIdAndTypename = (system, { id, fakeId, __typename } = {}) => Object.values(system)
    .filter(item => item && typeof item === 'object')
    .reduce((result, item) => result || (
        ((id && id === item.id) || (fakeId && fakeId === item.fakeId)) && __typename && __typename === item.__typename ?
            item
            :
            findItemByIdAndTypename(item, { id, fakeId, __typename })
    ), null) || undefined;

export const getFakeId = (() => {
    var fakeId = -1;
    return () => fakeId--;
})();

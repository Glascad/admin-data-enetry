import _ from 'lodash';

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
    const [parentKey] = Object.entries(item).find(([key, value]) => key.match(/^parent/) && value) || [];
    const { [parentKey]: id } = item;
    return `${parentKey}:${id}`;
});

export const getFirstItem = ({ _systemOptions = [] }) => (
    _systemOptions.find(({ parentSystemOptionValueId }) => !parentSystemOptionValueId)
);

export const getParent = (item, system) => Object.entries(item).reduce((parent, [key, value]) => parent || (
    key.match(/parent/)
    &&
    value
    &&
    (system[`_${key[6].toLowerCase()}${key.slice(7).replace(/(Fake)?Id/, '')}s`] || [])
        .find(({ [key.match(/Fake/i) ? 'fakeId' : 'id']: id }) => id === value)
), null);

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
    return makeNodeRenderable(getFirstItem(system));
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

import _ from 'lodash';


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
        Object.assign(this,
            _.groupBy([
                ..._systemOptions,
                ..._detailOptions,
                ..._configurationOptions,
                ..._systemOptionValues,
                ..._detailOptionValues,
                ..._configurationOptionValues,
                ..._systemDetails,
                ..._systemConfigurations,
            ], item => {
                const [parentKey] = Object.entries(item).find(([key, value]) => key.match(/^parent/) && value) || [];
                const { [parentKey]: id } = item;
                return `${parentKey}:${id}`;
            })
        );
    }
}


export const getFirstItem = ({ _systemOptions = [] }) => (
    _systemOptions.find(({ parentSystemOptionValueId }) => !parentSystemOptionValueId)
);


export const getParent = (item, system) => (item && system) ?
    Object.entries(item).reduce((parent, [key, value]) => parent || (
        key.match(/parent/)
        &&
        value
        &&
        (system[`_${key[6].toLowerCase()}${key.slice(7).replace(/(Fake)?Id/, '')}s`] || [])
            .find(({ [key.match(/Fake/i) ? 'fakeId' : 'id']: id }) => id === value)
    ), null)
    :
    undefined;


export const getParentTrail = (item, system, trail) => {
    if (!item || !system) return trail || [item].filter(Boolean);

    console.log({ item });

    if (item.__typename !== "SystemOptionValue") throw new Error(`Can only get parent trail of items with __typename of \`SystemOptionValue\`, received __typename: \`${item.__typename}\``);

    const parentSystemOption = getParent(item, system);
    const parentSystemOptionValue = getParent(parentSystemOption, system);

    return ((item && parentSystemOptionValue) ?
        getParentTrail(parentSystemOptionValue, system, trail)
        :
        []
    ).concat(trail || [item]);
}


export const getChildTrail = (item, system, trail) => {
    if (!item || !system) return trail || [item].filter(Boolean);

    console.log({ item });


}


export const getChildren = ({ __typename, fakeId, id } = {}, systemMap) => systemMap instanceof SystemMap ? (
    systemMap[`parent${__typename}${fakeId ? 'Fake' : ''}Id:${fakeId || id}`]
    ||
    []
) : getChildren({ __typename, fakeId, id }, new SystemMap(systemMap));


export const makeRenderable = system => {
    const systemMap = new SystemMap(system);
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


export const filterOptionsAbove = (item, system, optionList) => {
    const parentItem = getParent(item, system);
    const filteredOptions = optionList.filter(({ name }) => !(name === item.name));

    return parentItem ?
        filterOptionsAbove(parentItem, system, filteredOptions)
        :
        filteredOptions;
}

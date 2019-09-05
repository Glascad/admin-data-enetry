import { match } from '../../../../../utils';

export const getFirstItem = ({ _systemOptions = [] }) => _systemOptions.find(({ parentSystemOptionValueId }) => !parentSystemOptionValueId);

export const getChildren = ({
    __typename,
    id,
    _systemOptionValues = [],
    _systemDetailTypes = [],
    _detailOptionValues = [],
    _systemConfigurationTypes = [],
    _configurationOptionValues = [],
} = {}, {
    _systemOptions = [],
    _detailOptions = [],
    _configurationOptions = [],
}) => match(__typename)
    .against({
        SystemOption: () => _systemOptionValues,
        DetailOption: () => _detailOptionValues,
        ConfigurationOption: () => _configurationOptionValues,
        SystemOptionValue: () => _systemDetailTypes.concat(
            _systemOptions.filter(({ parentSystemOptionValueId }) => parentSystemOptionValueId === id)
        ),
        DetailOptionValue: () => _systemConfigurationTypes.concat(
            _detailOptions.filter(({ parentDetailOptionValueId }) => parentDetailOptionValueId === id)
        ),
        ConfigurationOptionValue: () => _configurationOptions.filter(({ parentConfigurationOptionValueId }) => parentConfigurationOptionValueId === id),
        SystemDetailType: () => _detailOptions.filter(({ systemDetailTypeId }) => systemDetailTypeId === id),
        SystemConfigurationType: () => _configurationOptions.filter(({ systemConfigurationTypeId }) => systemConfigurationTypeId === id),
        undefined: () => [],
    })
    .otherwise(() => { throw new Error(`Node type not found: ${__typename}`) });

export const makeRenderable = system => {
    const makeNodeRenderable = node => ({
        item: node,
        branches: getChildren(node, system).map(makeNodeRenderable),
    });
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

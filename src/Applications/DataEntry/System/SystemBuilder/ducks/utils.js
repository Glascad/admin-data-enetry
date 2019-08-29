import { match } from '../../../../../utils';

export const getFirstItem = ({ _systemOptions }) => _systemOptions.find(({ parentSystemOptionValueId }) => !parentSystemOptionValueId);

export const getChildren = ({
    __typename,
    id,
    _systemOptionValues,
    _systemDetailTypes, 
    _detailOptionValues,
    _systemConfigurationTypes,
    _configurationOptionValues,
}, {
    _systemOptions,
    _detailOptions,
    _configurationOptions,
}) => match(__typename)
    .equals('SystemOption', () => _systemOptionValues)
    .equals('SystemOptionValue', () => _systemOptions.filter(({ parentSystemOptionValueId }) => parentSystemOptionValueId === id)
        .concat(_systemDetailTypes))    
    .equals('SystemDetailType', () => _detailOptions.filter(({ systemDetailTypeId }) => systemDetailTypeId === id))
    .equals('DetailOption', () => _detailOptionValues)
    .equals('DetailOptionValue', () => { })
    .equals('SystemConfigurationType', () => _configurationOptions.filter(({ systemConfigurationTypeId }) => systemConfigurationTypeId === id))
    .equals('ConfigurationOption', () => _configurationOptionValues)
    .equals('ConfigurationOptionValue', () => { })
    .finally(() => { });
export const makeRenderable = ({

}) => { }

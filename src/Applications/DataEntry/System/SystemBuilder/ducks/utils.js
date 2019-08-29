import { match } from '../../../../../utils';

export const getFirstItem = ({ _systemOptions }) => _systemOptions.find(({ parentSystemOptionValueId }) => !parentSystemOptionValueId);

export const getChildren = ({
    __typename,
    id,
    _systemOptionValues,
    _detailOptionValues,
    _configurationOptionValues,
}, system) => match(__typename)
    .equals('SystemOption', () => _systemOptionValues)
    .equals('SystemOptionValue', () => { })
    .equals('SystemDetailType', () => { })
    .equals('DetailOption', () => _detailOptionValues)
    .equals('DetailOptionValue', () => { })
    .equals('SystemConfigurationType', () => { })
    .equals('ConfigurationOption', () => _configurationOptionValues)
    .equals('ConfigurationOptionValue', () => { })
    .finally(() => { });
export const makeRenderable = ({

}) => { }

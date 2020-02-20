import { getDetailTypeFromPath, getConfigurationTypeFromPath } from "../../../../../../../app-logic/system";
import { replace } from "../../../../../../../utils";

export default function UNSELECT_CONFIGURATION({
    _systemSet: {
        _systemSetConfigurations = [],
    },
}, {
    configurations: oldConfigurations = [],
    optionalConfigurationsToUnselect: oldOptionalConfigurationsToUnselect = [],
},
    configurationPath
) {
    // console.log(arguments);
    const detailType = getDetailTypeFromPath(configurationPath);
    const configurationType = getConfigurationTypeFromPath(configurationPath);

    // find in state
    const COVInState = oldConfigurations.find(({ detailConfigurationPath, configurationOptionValuePath }) => (
        getDetailTypeFromPath(detailConfigurationPath || configurationOptionValuePath) === detailType
        &&
        getConfigurationTypeFromPath(detailConfigurationPath || configurationOptionValuePath) === configurationType
    ));

    const index = oldConfigurations.indexOf(COVInState);

    // or find in query
    const { configurationOptionValuePath: queryCOVP, detailConfigurationPath: queryDCP } =  _systemSetConfigurations.find(({ configurationOptionValuePath, detailConfigurationPath }) => (
        getDetailTypeFromPath(configurationOptionValuePath || detailConfigurationPath) === detailType
        &&
        getConfigurationTypeFromPath(configurationOptionValuePath || detailConfigurationPath) === configurationType
    )) || {};

    const configurations = COVInState ?
        oldConfigurations.filter((_, i) => i !== index)
        :
        oldConfigurations;

    const optionalConfigurationsToUnselect = (queryCOVP || queryDCP) ?
        oldOptionalConfigurationsToUnselect.concat({
            detailType: getDetailTypeFromPath(queryCOVP || queryDCP),
            configurationType: getConfigurationTypeFromPath(queryCOVP || queryDCP)
        })
        :
        oldOptionalConfigurationsToUnselect;

    return {
        ...arguments[1],
        configurations,
        optionalConfigurationsToUnselect,
    };
}

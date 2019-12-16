import { getDetailTypeFromPath, getConfigurationTypeFromPath } from "../../../../../../../app-logic/system-utils";
import { replace } from "../../../../../../../utils";

export default function UNSELECT_CONFIGURATION({
    _systemSet: {
        _systemSetConfigurations = [],
    },
}, {
    configurations = [],
    optionalConfigurationsToUnselect = [],
},
    configurationPath
) {
    console.log(arguments);
    const detailType = getDetailTypeFromPath(configurationPath);
    const configurationType = getConfigurationTypeFromPath(configurationPath);

    // find in state
    const COVInState = configurations.find(({ detailConfigurationPath, configurationOptionValuePath }) => (
        getDetailTypeFromPath(detailConfigurationPath || configurationOptionValuePath) === detailType
        &&
        getConfigurationTypeFromPath(detailConfigurationPath || configurationOptionValuePath) === configurationType
    ));

    const index = configurations.indexOf(COVInState);

    // or find in query
    const { configurationOptionValuePath: queryCOVP, detailConfigurationPath: queryDCP } = !COVInState && _systemSetConfigurations.find(({ configurationOptionValuePath, detailConfigurationPath }) => (
        getDetailTypeFromPath(configurationOptionValuePath || detailConfigurationPath) === detailType
        &&
        getConfigurationTypeFromPath(configurationOptionValuePath || detailConfigurationPath) === configurationType
    )) || {};


    const filteredConfigurations = COVInState ?
        {
            configurations: configurations.filter((_, i) => i !== index),
            optionalConfigurationsToUnselect,
        } : (queryCOVP || queryDCP) ?
            {
                configurations,
                optionalConfigurationsToUnselect: optionalConfigurationsToUnselect.concat({
                    detailType: getDetailTypeFromPath(queryCOVP || queryDCP),
                    configurationType: getConfigurationTypeFromPath(queryCOVP || queryDCP),
                })
            } :
            {
                configurations,
                optionalConfigurationsToUnselect,
            }

    return {
        ...arguments[1],
        ...filteredConfigurations,
    };
}

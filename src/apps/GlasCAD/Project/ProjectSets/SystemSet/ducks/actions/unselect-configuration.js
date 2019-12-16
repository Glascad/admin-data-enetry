import { getDetailTypeFromPath, getConfigurationTypeFromPath } from "../../../../../../../app-logic/system";
import { replace } from "../../../../../../../utils";

export default function UNSELECT_CONFIGURATION({
    _systemSet: {
        _systemSetConfigurations = [],
    },
}, {
    configurations = [],
},
    configurationPath
) {
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
    const { configurationOptionValuePath } = !COVInState && _systemSetConfigurations.find(({ configurationOptionValuePath }) => (
        getDetailTypeFromPath(configurationOptionValuePath) === detailType
        &&
        getConfigurationTypeFromPath(configurationOptionValuePath) === configurationType
    )) || {};

    return {
        ...arguments[1],
        configurations:
            // isCreated ?
            configurations.filter((_, i) => i !== index)
            // :
            // isUpdated ?
            //     replace(configurations, index, { oldPath })
            //     :
            //     configurationOptionValuePath ?
            //         configurations.concat({
            //             oldPath: configurationOptionValuePath
            //         })
            //         :
            //         configurations,
    };
}

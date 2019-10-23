import { getDetailTypeFromPath, getConfigurationTypeFromPath } from "../../../../../../../app-logic/system-utils";
import { replace } from "../../../../../../../utils";

export default function UNSELECT_CONFIGURATION({
    _systemSet: {
        _systemSetConfigurationOptionValues = [],
    },
}, {
    configurationOptionValues = [],
},
    configurationPath
) {
    const detailType = getDetailTypeFromPath(configurationPath);
    const configurationType = getConfigurationTypeFromPath(configurationPath);

    // find in state
    const COVInState = configurationOptionValues.find(({ oldPath, newPath }) => (
        getDetailTypeFromPath(oldPath || newPath) === detailType
        &&
        getConfigurationTypeFromPath(oldPath || newPath) === configurationType
    ));

    const { oldPath, newPath } = COVInState || {};

    const isCreated = newPath && !oldPath;
    const isUpdated = oldPath && newPath;

    const index = configurationOptionValues.indexOf(COVInState);

    // or find in query
    const { configurationOptionValuePath } = !COVInState && _systemSetConfigurationOptionValues.find(({ configurationOptionValuePath }) => (
        getDetailTypeFromPath(configurationOptionValuePath) === detailType
        &&
        getConfigurationTypeFromPath(configurationOptionValuePath) === configurationType
    )) || {};

    return {
        ...arguments[1],
        configurationOptionValues: isCreated ?
            configurationOptionValues.filter((_, i) => i !== index)
            :
            isUpdated ?
                replace(configurationOptionValues, index, { oldPath })
                :
                configurationOptionValuePath ?
                    configurationOptionValues.concat({
                        oldPath: configurationOptionValuePath
                    })
                    :
                    configurationOptionValues,
    };
}

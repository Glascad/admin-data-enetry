import { getConfigurationTypeFromPath, getDetailTypeFromPath, getDefaultPath, SystemMap } from "../../../../../../../app-logic/system-utils";
import { replace } from "../../../../../../../utils";
import { defaultSystemSetConfiguration } from "../schemas";
import { mergeOptionGroupValues } from "../merge";

export default function SELECT_CONFIGURATION_OPTION_VALUE({
    _systemSet: {
        _systemSetConfigurations = [],
        _systemSetOptionGroupValues = [],
    },
}, {
    configurations = [],
    optionGroupValues = [],
}, [
    payloadPath,
    systemMap,
]) {
    const groupedOptionValues = mergeOptionGroupValues(_systemSetOptionGroupValues, optionGroupValues);
    const configurationOptionValuePath = getDefaultPath(payloadPath, systemMap, groupedOptionValues);
    const detailType = getDetailTypeFromPath(configurationOptionValuePath);
    const configurationType = getConfigurationTypeFromPath(configurationOptionValuePath);

    // find COV original path in query result
    const { configurationOptionValuePath: oldPath } = _systemSetConfigurations.find(cov => (
        cov.configurationOptionValuePath.replace(/(__CT__\.\w+)\..*$/, '$1')
        ===
        configurationOptionValuePath.replace(/(__CT__\.\w+)\..*$/, '$1')
    )) || {};

    // find COV in state
    const updatedCOV = configurations.find(({ oldPath, newPath }) => (
        getDetailTypeFromPath(oldPath || newPath) === detailType
        &&
        getConfigurationTypeFromPath(oldPath || newPath) === configurationType
    ));

    const index = configurations.indexOf(updatedCOV);

    const newCOV = {
        ...defaultSystemSetConfiguration,
        ...updatedCOV,
        oldPath,
        newPath: configurationOptionValuePath,
    };

    return {
        ...arguments[1],
        configurations: updatedCOV ?
            updatedCOV.oldPath === configurationOptionValuePath ?
                // remove from state if updating back to original path
                configurations.filter((_, i) => i !== index)
                :
                // replace in state if updating previously updated item
                replace(configurations, index, newCOV)
            :
            oldPath === configurationOptionValuePath ?
                // leave state if option value is already selected
                configurations
                :
                // add to state if updating non-previously updated item
                configurations.concat(newCOV),
    };
}

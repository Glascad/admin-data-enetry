import { getConfigurationTypeFromPath, getDetailTypeFromPath, getDefaultPath, SystemMap } from "../../../../../../../app-logic/system-utils";
import { replace } from "../../../../../../../utils";
import { defaultSystemSetNode } from "../schemas";
import { mergeOptionGroupValues } from "../merge";

export default function SELECT_CONFIGURATION_OPTION_VALUE({
    _systemSet: {
        _systemSetConfigurationOptionValues = [],
        _systemSetOptionGroupValues = [],
    },
}, {
    configurationOptionValues = [],
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
    const { configurationOptionValuePath: oldPath } = _systemSetConfigurationOptionValues.find(cov => (
        cov.configurationOptionValuePath.replace(/(__CT__\.\w+)\..*$/, '$1')
        ===
        configurationOptionValuePath.replace(/(__CT__\.\w+)\..*$/, '$1')
    )) || {};

    // find COV in state
    const updatedCOV = configurationOptionValues.find(({ oldPath, newPath }) => (
        getDetailTypeFromPath(oldPath || newPath) === detailType
        &&
        getConfigurationTypeFromPath(oldPath || newPath) === configurationType
    ));

    const index = configurationOptionValues.indexOf(updatedCOV);

    const newCOV = {
        ...defaultSystemSetNode,
        ...updatedCOV,
        oldPath,
        newPath: configurationOptionValuePath,
    };

    return {
        ...arguments[1],
        configurationOptionValues: updatedCOV ?
            updatedCOV.oldPath === configurationOptionValuePath ?
                // remove from state if updating back to original path
                configurationOptionValues.filter((_, i) => i !== index)
                :
                // replace in state if updating previously updated item
                replace(configurationOptionValues, index, newCOV)
            :
            oldPath === configurationOptionValuePath ?
                // leave state if option value is already selected
                configurationOptionValues
                :
                // add to state if updating non-previously updated item
                configurationOptionValues.concat(newCOV),
    };
}

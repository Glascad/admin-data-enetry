import { getDefaultPath, getDetailTypeFromPath, getChildren, getConfigurationTypeFromPath } from "../../../../../../../app-logic/system-utils";
import { mergeOptionGroupValues } from "../merge";
import { defaultSystemSetNode } from "../schemas";
import _ from 'lodash';
import { SELECT_CONFIGURATION_OPTION_VALUE } from ".";
import { replace, unique } from "../../../../../../../utils";

export default function SELECT_DETAIL_OPTION_VALUE({
    _systemSet: {
        _systemSetDetailOptionValues = [],
        _systemSetConfigurationOptionValues = [],
        _systemSetOptionGroupValues = [],
    },
}, {
    detailOptionValues = [],
    configurationOptionValues = [],
    optionGroupValues = [],
}, [
    payloadPath,
    systemMap,
]) {
    const groupedOptionValues = mergeOptionGroupValues(_systemSetOptionGroupValues, optionGroupValues);
    const detailOptionValuePath = getDefaultPath(payloadPath, systemMap, groupedOptionValues);
    const detailType = getDetailTypeFromPath(detailOptionValuePath);

    // find DOV in query result
    const { detailOptionValuePath: oldPath } = _systemSetDetailOptionValues.find(dov => (
        dov.detailOptionValuePath.replace(/(__DT__\.\w+)\..*$/, '$1')
        ===
        detailOptionValuePath.replace(/(__DT__\.\w+)\..*$/, '$1')
    )) || {};

    // find DOV in state
    const updatedDOV = detailOptionValues.find(({ oldPath, newPath }) => (
        getDetailTypeFromPath(oldPath || newPath) === detailType
    ));

    const index = detailOptionValues.indexOf(updatedDOV);

    const newDOV = {
        ...defaultSystemSetNode,
        ...updatedDOV,
        oldPath,
        newPath: detailOptionValuePath,
    };

    // find all child configuration types in state
    // remove all previous children from state
    const [newConfigurationOptionValues, configurationOptionValuesToUpdate] = _.partition(
        configurationOptionValues,
        ({ oldPath, newPath }) => getDetailTypeFromPath(oldPath || newPath) === detailType,
    );

    const configurationTypePaths = unique(configurationOptionValuesToUpdate
        .map(({ oldPath, newPath }) => oldPath || newPath)
        .concat(_systemSetConfigurationOptionValues.map(({ configurationOptionValuePath }) => configurationOptionValuePath))
        .map(path => `${
            detailOptionValuePath
            }.__CT__.${
            getConfigurationTypeFromPath(path)
            }`)
    ).filter(path => systemMap[path]);

    // select new values for all required children (new children) and for all previously selected optional configurations (old children)
    return configurationTypePaths.reduce((systemSetUpdate, configurationTypePath) => (
        SELECT_CONFIGURATION_OPTION_VALUE(
            arguments[0],
            systemSetUpdate,
            [
                configurationTypePath,
                systemMap,
            ],
        )
    ), {
        ...arguments[1],
        detailOptionValues: updatedDOV ?
            updatedDOV.oldPath === detailOptionValuePath ?
                // remove if updating back to original path
                detailOptionValues.filter((_, i) => i !== index)
                :
                // replace if updating updated
                replace(detailOptionValues, index, newDOV)
            :
            oldPath === detailOptionValuePath ?
                // leave state if option value is already selected
                detailOptionValues
                :
                // add if updating non-updated
                detailOptionValues.concat(newDOV),
        configurationOptionValues: newConfigurationOptionValues,
    });
}

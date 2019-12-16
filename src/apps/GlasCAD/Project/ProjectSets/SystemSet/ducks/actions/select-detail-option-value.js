import { getDefaultPath, getDetailTypeFromPath, getChildren, getConfigurationTypeFromPath, getUnknownPathFromObject, getParentPath } from "../../../../../../../app-logic/system";
import { mergeOptionGroupValues } from "../merge";
import { defaultSystemSetDetail } from "../schemas";
import _ from 'lodash';
import { SELECT_CONFIGURATION_OPTION_VALUE } from ".";
import { replace, unique } from "../../../../../../../utils";

export default function SELECT_DETAIL_OPTION_VALUE({
    _systemSet: {
        _systemSetDetails = [],
        _systemSetConfigurations = [],
        _systemSetOptionGroupValues = [],
    },
}, {
    details = [],
    configurations = [],
    optionGroupValues = [],
}, [
    payloadPath,
    systemMap,
]) {
    const groupedOptionValues = mergeOptionGroupValues(_systemSetOptionGroupValues, optionGroupValues);
    const detailOptionValuePath = getDefaultPath(payloadPath, systemMap, groupedOptionValues);
    const { __typename } = systemMap[detailOptionValuePath] || {};
    const detailPathKey = `${__typename}Path`.replace(/^./, letter => letter.toLowerCase());
    const detailType = getDetailTypeFromPath(detailOptionValuePath);

    // find DOV in query result
    const { detailOptionValuePath: oldPath } = _systemSetDetails.find(dov => (
        dov.detailOptionValuePath.replace(/(__DT__\.\w+)\..*$/, '$1')
        ===
        detailOptionValuePath.replace(/(__DT__\.\w+)\..*$/, '$1')
    )) || {};

    // find DOV in state
    // const updatedDOV = details.find(detail => {
    //     const [pathKey, path] = getUnknownPathFromObject(detail);
    //     return getDetailTypeFromPath(path) === detailType
    // })

    // const index = details.indexOf(updatedDOV);

    const newDOV = {
        ...defaultSystemSetDetail,
        // ...updatedDOV,
        [detailPathKey]: detailOptionValuePath,
    };

    // find all child configuration types in state
    // remove all previous children from state
    const [newConfigurations, configurationsToUpdate] = _.partition(
        configurations,
        ({ detailConfigurationPath, configurationOptionValuePath }) => getDetailTypeFromPath(detailConfigurationPath || configurationOptionValuePath) === detailType,
    );

    const configurationTypePaths = unique(configurationsToUpdate
        .map(({ detailConfigurationPath, configurationOptionValuePath }) => detailConfigurationPath || configurationOptionValuePath)
        .concat(_systemSetConfigurations.map(({ configurationOptionValuePath, detailConfigurationPath }) => configurationOptionValuePath || detailConfigurationPath))
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
        details:
            //     updatedDOV ?
            // updatedDOV.oldPath === detailOptionValuePath ?
            //     // remove if updating back to original path
            //     details.filter((_, i) => i !== index)
            //     :
            //     // replace if updating updated
            //     replace(details, index, newDOV)
            // :
            oldPath === detailOptionValuePath ?
                // leave state if option value is already selected
                details
                :
                // add if updating non-updated
                details.concat(newDOV),
        configurations: newConfigurations,
    });
}

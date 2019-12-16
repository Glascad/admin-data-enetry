import { getDefaultPath, getDetailTypeFromPath, getChildren, getConfigurationTypeFromPath, getUnknownPathFromObject, getParentPath } from "../../../../../../../app-logic/system-utils";
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
    // console.log(arguments);

    const groupedOptionValues = mergeOptionGroupValues(_systemSetOptionGroupValues, optionGroupValues);
    const defaultPath = getDefaultPath(payloadPath, systemMap, groupedOptionValues);
    const { __typename } = systemMap[defaultPath] || {};
    const detailPathKey = `${__typename}Path`.replace(/^./, letter => letter.toLowerCase());
    const detailType = getDetailTypeFromPath(defaultPath);

    console.log({
        _systemSetOptionGroupValues,
        optionGroupValues,
        groupedOptionValues,
        defaultPath,
    })

    // find DOV in query result
    const { detailOptionValuePath: previousDetailOptionValuePath, systemDetailPath: previousSystemDetailPath } = _systemSetDetails
        .find(dov => (
            (dov.detailOptionValuePath || dov.systemDetailPath).replace(/(__DT__\.\w+)\..*$/, '$1')
            ===
            defaultPath.replace(/(__DT__\.\w+)\..*$/, '$1')
        )) || {};

    // find DOV in state
    const updatedDOV = details.find(({ systemDetailPath, detailOptionValuePath }) => getDetailTypeFromPath(
        systemDetailPath || detailOptionValuePath) === detailType)

    const index = details.indexOf(updatedDOV);

    const newDOV = {
        ...defaultSystemSetDetail,
        // ...updatedDOV,
        [detailPathKey]: defaultPath,
    };

    // find all child configuration types in state
    // remove all previous children from state
    const [newConfigurations, configurationsToUpdate] = _.partition(
        configurations,
        ({ detailConfigurationPath, configurationOptionValuePath }) => getDetailTypeFromPath(detailConfigurationPath || configurationOptionValuePath) === detailType,
    );

    const configurationTypePaths = unique(configurationsToUpdate
        // old items in state
        .map(({ detailConfigurationPath, configurationOptionValuePath }) => detailConfigurationPath || configurationOptionValuePath)
        // items from query result
        .concat(_systemSetConfigurations.map(({ configurationOptionValuePath, detailConfigurationPath }) => configurationOptionValuePath || detailConfigurationPath))
        // children configurations that are required
        .concat(getChildren(systemMap[defaultPath], systemMap)
            .filter(({ optional }) => !optional)
            .map(({ path }) => path)
        )
        .map(path => `${
            defaultPath
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
            updatedDOV ?
                (updatedDOV.systemDetailPath || updatedDOV.detailOptionValuePath) === (previousDetailOptionValuePath || previousSystemDetailPath) ?
                    // remove if updating back to original path
                    details.filter((_, i) => i !== index)
                    :
                    // replace if updating updated
                    replace(details, index, newDOV)
                :
                (previousSystemDetailPath || previousDetailOptionValuePath) === defaultPath ?
                    // leave state if option value is already selected
                    details
                    :
                    // add if updating non-updated
                    details.concat(newDOV),
        configurations: newConfigurations,
    });
}

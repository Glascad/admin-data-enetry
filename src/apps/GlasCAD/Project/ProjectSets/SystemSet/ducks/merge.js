import _ from 'lodash';
import { getLastItemFromPath, getUnknownPathFromObject, getDetailTypeFromPath, getConfigurationTypeFromPath } from "../../../../../../app-logic/system";
import { removeNullValues } from "../../../../../../utils";
import validateSystemSetUpdate from "./validate-system-set-update";

export const mergeOptionGroupValues = (_systemSetOptionGroupValues, optionGroupValues) => _systemSetOptionGroupValues
    .filter(({ optionName }) => !optionGroupValues.find(group => group.optionName === optionName))
    .concat(optionGroupValues);

export default function merge({
    _systemSet,
    _systemSet: {
        systemId: oldSystemId,
        systemOptionValuePath: oldSystemOptionValuePath = "",
        _systemSetOptionGroupValues: oldSystemSetOptionGroupValues = [],
        _systemSetDetails: oldSystemSetDetails = [],
        _systemSetConfigurations: oldSystemSetConfigurations = [],
    } = {},
}, {
    name,
    systemId: newSystemId,
    systemOptionValuePath: newSystemOptionValuePath = "",
    optionGroupValues = [],
    details = [],
    configurations = [],
    optionalConfigurationsToUnselect = [],
}, {
    id: actualSystemId,
    _optionGroups = [],
}) {

    // console.log(arguments);

    validateSystemSetUpdate(arguments[1]);

    const systemId = newSystemId || oldSystemId;

    const systemOptionValuePath = newSystemOptionValuePath || (
        oldSystemOptionValuePath.startsWith(systemId) ?
            oldSystemOptionValuePath
            :
            undefined
    );

    const [optionGroupValuesToUpdate, optionGroupValuesToAdd] = _.partition(optionGroupValues, ({ optionName }) => (
        oldSystemSetOptionGroupValues.some(ssogv => ssogv.optionName === optionName))
    );

    const _systemSetOptionGroupValues = actualSystemId === systemId ?
        mergeOptionGroupValues(oldSystemSetOptionGroupValues, optionGroupValuesToUpdate)
            .concat(optionGroupValuesToAdd)
            .filter(({ optionName }) => _optionGroups.some(({ name }) => name === optionName))
            .sort(({ optionName: oName1 }, { optionName: oName2 }) => oName1 < oName2 ? -1 : 1)
        :
        [];

    // details have the same optionValuePath as systemSet

    const _systemSetDetails = oldSystemSetDetails
        .filter(detail => {
            const [pathKey, path] = getUnknownPathFromObject(detail);
            const detailType = getDetailTypeFromPath(path);
            return path.startsWith(systemOptionValuePath)
                &&
                !details.some(d => {
                    const [dPathKey, dPath] = getUnknownPathFromObject(d);
                    const dDetailType = getDetailTypeFromPath(dPath);
                    return detailType === dDetailType;
                });
        })
        .concat(details);

    const _systemSetConfigurations = oldSystemSetConfigurations
        .filter(({ configurationOptionValuePath, detailConfigurationPath }) => !optionalConfigurationsToUnselect
            .some(({ detailType, configurationType }) => (
                detailType === getDetailTypeFromPath(configurationOptionValuePath || detailConfigurationPath)
                &&
                configurationType === getConfigurationTypeFromPath(configurationOptionValuePath || detailConfigurationPath)
            )))
        .filter(configuration => {
            const [pathKey, path] = getUnknownPathFromObject(configuration);
            const detailType = getDetailTypeFromPath(path);
            const configurationType = getConfigurationTypeFromPath(path);
            return path.startsWith(systemOptionValuePath)
                &&
                !configurations.some(c => {
                    const [cPathKey, cPath] = getUnknownPathFromObject(c);
                    const cDetailType = getDetailTypeFromPath(cPath);
                    const cConfigurationType = getConfigurationTypeFromPath(cPath)
                    return detailType === cDetailType
                        &&
                        configurationType === cConfigurationType;
                });
        })
        .concat(configurations);

    return {
        ..._systemSet,
        systemOptionValuePath,
        ...removeNullValues({
            name,
            systemId,
            _systemSetOptionGroupValues,
            _systemSetDetails,
            _systemSetConfigurations,
        }),
    };
}

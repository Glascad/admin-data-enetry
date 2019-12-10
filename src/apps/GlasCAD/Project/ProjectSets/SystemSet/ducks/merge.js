import {
    removeNullValues,
    match,
} from "../../../../../../utils";
import _ from 'lodash';
import validateSystemSetUpdate from "./validate-system-set-update";
import { getLastItemFromPath, getUnknownPathFromObject } from "../../../../../../app-logic/system-utils";

export const mergeOptionGroupValues = (_systemSetOptionGroupValues, optionGroupValues) => _systemSetOptionGroupValues.map(({ optionName, name }) => ({
    optionName,
    name: optionGroupValues
        .reduce((name, update) => (
            update.optionName === optionName ?
                update.name
                :
                name
        ), name),
}));

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
    optionalConfigurationTypesToUnselect = [],
}, {
    id: actualSystemId,
    _optionGroups = [],
}) {

    console.log(arguments);

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
        :
        [];

    // const updateOptionValues = (pathKey, oldArray, newArray, parentArray) => {
    //     const {
    //         update = [],
    //         _delete = [],
    //         create = [],
    //     } = _.groupBy(newArray, item => (
    //         match(!!Object.keys(item).some(key => key.match(/old/i)), !!Object.keys(key => key.match(/new/i)))
    //             .equals(true, true, 'update')
    //             .equals(true, false, '_delete')
    //             .equals(false, true, 'create')
    //             .otherwise(() => {
    //                 throw new Error(`Invalid item has no \`oldPath\` and no \`newPath\`, in ${pathKey}: ${newArray}`);
    //             })
    //     ));

    //     return oldArray
    //         .filter(({ [pathKey]: path }) => (
    //             (
    //                 parentArray.some(parentPath => path.startsWith(parentPath))
    //                 ||
    //                 update.some(item => Object.entries(item).some(([key, value]) => key.match(/old/i) && path === value))
    //             )
    //             &&
    //             !_delete.some(item => Object.entries(item).some(([key, value]) => key.match(/old/i) && path.startsWith(value)))
    //         ))
    //         .map(item => ({
    //             ...item,
    //             [pathKey]: update.reduce((path, updatedItem) => {
    //                 const [oldPathKey, oldPath] = Object.entries(updatedItem).find(([key, value]) => key.match(/old/i)) || [];
    //                 const [newPathKey, newPath] = Object.entries(updatedItem).find(([key, value]) => key.match(/new/i)) || [];
    //                 return (
    //                     oldPath === item[pathKey] ?
    //                         newPath
    //                         :
    //                         path
    //                 )
    //             }, item[pathKey]),
    //         }))
    //         .concat(create.map(item => {
    //             const [newPathKey, newPath] = Object.entries(item).find(([key, value]) => key.match(/new/i)) || [];
    //             return { [pathKey]: newPath }
    //         }));
    // }

    // const _systemSetDetails = updateOptionValues(
    //     "detailOptionValuePath",
    //     oldSystemSetDetails,
    //     details,
    //     [systemOptionValuePath],
    // );

    // const _systemSetConfigurations = updateOptionValues(
    //     "configurationOptionValuePath",
    //     oldSystemSetConfigurations,
    //     configurations,
    //     _systemSetDetails.map(({ detailOptionValuePath }) => detailOptionValuePath),
    // );

    return {
        ..._systemSet,
        systemOptionValuePath,
        ...removeNullValues({
            name,
            systemId,
            _systemSetOptionGroupValues,
            _systemSetDetails: oldSystemSetDetails.concat(details),
            _systemSetConfigurations: oldSystemSetConfigurations.filter(item => {
                const [pathKey, path] = getUnknownPathFromObject(item);
                return !optionalConfigurationTypesToUnselect.some(getLastItemFromPath(path))
            }).concat(configurations),
        }),
    };
}

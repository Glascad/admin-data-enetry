import {
    removeNullValues,
    match,
} from "../../../../../../utils";
import _ from 'lodash';
import validateSystemSetUpdate from "./validate-system-set-update";

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
        _systemSetDetailOptionValues: oldSystemSetDetailOptionValues = [],
        _systemSetConfigurationOptionValues: oldSystemSetConfigurationOptionValues = [],
    } = {},
}, {
    name,
    systemId: newSystemId,
    systemOptionValuePath: newSystemOptionValuePath = "",
    optionGroupValues = [],
    detailOptionValues = [],
    configurationOptionValues = [],
}, {
    id: actualSystemId,
    _optionGroups = [],
}) {

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

    const updateOptionValues = (pathKey, oldArray, newArray, parentArray) => {
        const {
            update = [],
            _delete = [],
            create = [],
        } = _.groupBy(newArray, ({ oldPath, newPath }) => (
            match(!!oldPath, !!newPath)
                .equals(true, true, 'update')
                .equals(true, false, '_delete')
                .equals(false, true, 'create')
                .otherwise(() => {
                    throw new Error(`Invalid item has no \`oldPath\` and no \`newPath\`, in ${pathKey}: ${newArray}`);
                })
        ));

        return oldArray
            .filter(({ [pathKey]: path }) => (
                (
                    parentArray.some(parentPath => path.startsWith(parentPath))
                    ||
                    update.some(item => path === item.oldPath)
                )
                &&
                !_delete.some(item => path.startsWith(item.oldPath))
            ))
            .map(item => ({
                ...item,
                [pathKey]: update.reduce(
                    (path, { oldPath, newPath }) => (
                        oldPath === item[pathKey] ?
                            newPath
                            :
                            path
                    ), item[pathKey]),
            }))
            .concat(create.map(({ newPath }) => ({ [pathKey]: newPath })));
    }

    const _systemSetDetailOptionValues = updateOptionValues(
        "detailOptionValuePath",
        oldSystemSetDetailOptionValues,
        detailOptionValues,
        [systemOptionValuePath],
    );

    const _systemSetConfigurationOptionValues = updateOptionValues(
        "configurationOptionValuePath",
        oldSystemSetConfigurationOptionValues,
        configurationOptionValues,
        _systemSetDetailOptionValues.map(({ detailOptionValuePath }) => detailOptionValuePath),
    );

    return {
        ..._systemSet,
        systemOptionValuePath,
        ...removeNullValues({
            name,
            systemId,
            _systemSetOptionGroupValues,
            _systemSetDetailOptionValues,
            _systemSetConfigurationOptionValues,
        }),
    };
}

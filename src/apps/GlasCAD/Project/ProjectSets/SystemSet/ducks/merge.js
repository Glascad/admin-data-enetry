import {
    removeNullValues,
    match,
} from "../../../../../../utils";
import _ from 'lodash';
import validateSystemSetUpdate from "./validate-system-set-update";

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

    const [optionGroupValuesToUpdate, optionGroupValuesToAdd] = _.partition(optionGroupValues, ({ optionName, name }) => oldSystemSetOptionGroupValues.some(ssogv => ssogv.optionName === optionName));

    const _systemSetOptionGroupValues = oldSystemSetOptionGroupValues
        .map(({ optionName, name }) => ({
            optionName,
            name: optionGroupValuesToUpdate
                .reduce((value, update) => (
                    update.optionName === optionName ?
                        update.name
                        :
                        value
                ), name),
        }))
        .concat(optionGroupValuesToAdd);

    const updateOptionValues = (pathKey, oldArray, newArray) => {
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
                    throw new Error(`Invalid item has no \`oldPath\` and no \`newPath\``)
                })
        ));

        return oldArray
            .filter(({ [pathKey]: path }) => (
                path.startsWith(systemOptionValuePath)
                &&
                !_delete.some(({ oldPath }) => path.startsWith(oldPath)))
            )
            .map(item => ({
                ...item,
                [pathKey]: update.reduce(
                    (path, { oldPath, newPath }) => (
                        oldPath === item.path ?
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
    );

    const _systemSetConfigurationOptionValues = updateOptionValues(
        "configurationOptionValuePath",
        oldSystemSetConfigurationOptionValues,
        configurationOptionValues,
    );

    const result = {
        ..._systemSet,
        ...removeNullValues({
            name,
            systemId,
            systemOptionValuePath,
            _systemSetOptionGroupValues,
            _systemSetDetailOptionValues,
            _systemSetConfigurationOptionValues,
        }),
    };
    console.log(result);
    return result;
}

import { getChildren, getDefaultPath, getDetailTypeFromPath, getUnknownPathFromObject } from "../../../../../../../app-logic/system";
import { mergeOptionGroupValues } from "../merge";
import { SELECT_DETAIL_OPTION_VALUE } from ".";

export default function SELECT_SYSTEM_SET_OPTION_VALUE({
    _systemSet: {
        _systemSetDetails = [],
        _systemSetOptions = [],
    },
}, {
    details = [],
    configurations = [],
    optionGroupValues = [],
}, [
    payloadPath,
    systemMap,
]) {

    const groupedOptionValues = mergeOptionGroupValues(_systemSetOptions, optionGroupValues);
    const systemOptionValuePath = getDefaultPath(payloadPath, systemMap, groupedOptionValues);
    const systemOptionValue = systemMap[systemOptionValuePath];
    const systemDetails = getChildren(systemOptionValue, systemMap);
    // remove all detail and configuration option values -- all must be reselected
    return systemDetails.reduce((systemSetUpdate, { path }) => (
        SELECT_DETAIL_OPTION_VALUE(
            arguments[0],
            systemSetUpdate,
            [
                path,
                systemMap,
            ],
        )
    ), {
        ...arguments[1],
        systemOptionValuePath,
        detailOptionValues: [],
        // detailOptionValues: detailOptionValues.filter(({ newPath, oldPath }) => systemDetails.some(({ path }) => (
        //     getDetailTypeFromPath(newPath || oldPath)
        //     ===
        //     getDetailTypeFromPath(path)
        // ))),
    });
}

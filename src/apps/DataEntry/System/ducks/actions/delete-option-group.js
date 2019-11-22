import { getLastItemFromPath } from "../../../../../app-logic/system-utils";

export default function DELETE_OPTION_GROUP(systemInput, payload) {
    const {
        optionGroupsToDelete,
        newOptionGroups,
    } = systemInput;
    const { path } = payload;

    const optionName = getLastItemFromPath(path);

    return newOptionGroups.includes(optionName) ?
        {
            ...systemInput,
            newOptionGroups: newOptionGroups.filter(item => item !== optionName),
        }
        :
        {
            ...systemInput,
            optionGroupsToDelete: optionGroupsToDelete.concat(optionName),
        }

}
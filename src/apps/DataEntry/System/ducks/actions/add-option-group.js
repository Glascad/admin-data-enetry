import { getLastItemFromPath } from "../../../../../app-logic/system-utils";

export default function ADD_OPTION_GROUP(systemInput, payload) {
    const {
        optionGroupsToDelete,
        newOptionGroups,
    } = systemInput;
    const { path } = payload;
    
    const optionName = getLastItemFromPath(path);

    return optionGroupsToDelete.includes(optionName) ?
        {
            ...systemInput,
            optionGroupsToDelete: optionGroupsToDelete.filter(item => item !== optionName),
        }
        :
        {
            ...systemInput,
            newOptionGroups: newOptionGroups.concat(optionName),
        }

}
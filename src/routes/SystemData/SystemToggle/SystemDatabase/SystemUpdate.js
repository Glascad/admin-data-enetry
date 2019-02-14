
import {
    allocateItems,
    removeNullValues,
} from '../../../../utils';

const defaultSystem = {
    // system fields
    manufacturerId: undefined,
    systemTypeId: undefined,
    name: undefined,
    depth: undefined,
    shimSize: undefined,
    defaultGlassSize: undefined,
    defaultGlassBite: undefined,
    defaultSightline: undefined,
    inset: undefined,
    frontInset: undefined,
    topGap: undefined,
    bottomGap: undefined,
    sideGap: undefined,
    glassGap: undefined,
    meetingStileGap: undefined,
    // lists
    systemTagIds: [],
    systemTagIdsToDelete: [],

    infillSizes: [],
    infillSizesToDelete: [],

    infillPocketSizes: [],
    infillPocketSizesToDelete: [],

    infillPocketTypeIds: [],
    infillPocketTypeIdsToDelete: [],

    systemOptions: [],
    systemOptionIdsToDelete: [],

    invalidSystemConfigurationTypeIds: [],
    invalidSystemConfigurationTypeIdsToDelete: [],

    systemConfigurationOverrides: [],
    systemConfigurationOverridesToDelete: [],
};

// export default class SystemUpdate {

var _fakeId = 1;

var instanceCount = 0;

// fake ids are always stringified numbers
const _getFakeId = () => `${_fakeId++}`;


const createNewSystemUpdate = system => ({
    ...defaultSystem,
    ...system,
    instanceCount: ++instanceCount,
});

export default createNewSystemUpdate;


const _getOption = (oldSystemUpdate, id) => oldSystemUpdate.systemOptions
    .find(option => option.id === id);

const _getOptionValue = (oldSystemUpdate, id, option) => option.optionValues.find(value => value.id === id);


// UPDATES

export const updateSystem = (oldSystemUpdate, key, value) => createNewSystemUpdate({
    ...oldSystemUpdate,
    [key]: value,
});

export const updateSystemList = (oldSystemUpdate, key, addedItems, deletedItems) => {
    if (!oldSystemUpdate.hasOwnProperty(key)) throw new Error(`key: ${key} does not exist in SystemUpdate`);
    const deleteKey = key + 'ToDelete';
    const currentAddedItems = oldSystemUpdate[key];
    const currentDeletedItems = oldSystemUpdate[deleteKey];
    const [newDeletedItems, newAddedItems] = allocateItems(
        deletedItems,
        ...allocateItems(
            addedItems,
            currentAddedItems,
            currentDeletedItems,
        ).reverse(),
    );
    console.log({
        addedItems,
        deletedItems,
        currentAddedItems,
        currentDeletedItems,
        newDeletedItems,
        newAddedItems,
    });
    const newSystemUpdate = createNewSystemUpdate({
        ...oldSystemUpdate,
        [key]: newAddedItems,
        [deleteKey]: newDeletedItems,
    });
    console.log({
        oldSystemUpdate: oldSystemUpdate,
        newSystemUpdate,
    });
    return newSystemUpdate;
}

export const updateSystemOption = (oldSystemUpdate, id, key, value) => {
    // find option in state
    const option = _getOption(oldSystemUpdate, id);
    if (option) {
        const optionIndex = oldSystemUpdate.systemOptions.indexOf(option);
        // update key on option in state
        return createNewSystemUpdate({
            ...oldSystemUpdate,
            systemOptions: oldSystemUpdate.systemOptions.replace(optionIndex, {
                ...option,
                [key]: value,
            }),
        });
    } else {
        // add option to state
        return createNewSystemUpdate({
            ...oldSystemUpdate,
            systemOptions: oldSystemUpdate.systemOptions.concat({
                id,
                [key]: value,
                optionValues: [],
                optionValueIdsToDelete: [],
            }),
        });
    }
};

export const updateOptionValue = (oldSystemUpdate, optionId, optionValueId, key, value) => {
    // find option in state
    const option = _getOption(oldSystemUpdate, optionId);
    if (option) {
        const optionIndex = oldSystemUpdate.systemOptions.indexOf(option);
        // find value in option
        const optionValue = _getOptionValue(oldSystemUpdate, optionValueId, option);
        if (optionValue) {
            const optionValueIndex = option.optionValues.indexOf(optionValue);
            // update value in option
            return createNewSystemUpdate({
                ...oldSystemUpdate,
                systemOptions: oldSystemUpdate.systemOptions.replace(optionIndex, {
                    ...option,
                    optionValues: option.optionValues.replace(optionValueIndex, {
                        ...optionValue,
                        [key]: value,
                    }),
                }),
            });
        } else {
            // add value to option
            return createNewSystemUpdate({
                ...oldSystemUpdate,
                systemOptions: oldSystemUpdate.systemOptions.replace(optionIndex, {
                    ...option,
                    optionValues: option.optionValues.concat({
                        id: optionValueId,
                        [key]: value,
                    }),
                }),
            });
        }
    } else {
        // add option with updated value to state
        return createNewSystemUpdate({
            ...oldSystemUpdate,
            systemOptions: oldSystemUpdate.systemOptions.concat({
                id: optionId,
                optionValues: [{
                    id: optionValueId,
                    [key]: value,
                }],
                optionValueIdsToDelete: [],
            }),
        });
    }
};


// CREATES

export const createSystemOption = (oldSystemUpdate, name) => createNewSystemUpdate({
    // add new option
    ...oldSystemUpdate,
    systemOptions: oldSystemUpdate.systemOptions.concat({
        id: _getFakeId(),
        name,
        optionValues: [],
        optionValueIdsToDelete: [],
    }),
});

export const createOptionValue = (oldSystemUpdate, optionId, name) => {
    // find option
    const option = _getOption(oldSystemUpdate, optionId);
    if (option) {
        const optionIndex = oldSystemUpdate.systemOptions.indexOf(option);
        // add value to option
        return createNewSystemUpdate({
            ...oldSystemUpdate,
            systemOptions: oldSystemUpdate.systemOptions.replace(optionIndex, {
                ...option,
                optionValues: option.optionValues.concat({
                    id: _getFakeId(),
                    name,
                }),
            }),
        });
    } else {
        // add option with value to state
        return createNewSystemUpdate({
            ...oldSystemUpdate,
            systemOptions: oldSystemUpdate.systemOptions.concat({
                id: optionId,
                optionValues: [{
                    id: _getFakeId(),
                    name,
                }],
                optionValueIdsToDelete: [],
            }),
        });
    }
};


// DELETES

export const deleteSystemOption = (oldSystemUpdate, id) => {
    // find option in state
    const createdOption = oldSystemUpdate.systemOptions.find(option => option.id === id);
    const optionIndex = oldSystemUpdate.systemOptions.indexOf(createdOption);
    // remove option from state
    if (createdOption) {
        // check if option previously existed
        if (typeof createdOption.id === 'string') {
            // only remove from options if option did not previously exist
            return createNewSystemUpdate({
                ...oldSystemUpdate,
                systemOptions: oldSystemUpdate.systemOptions.filter(option => option !== createdOption),
            });
        } else {
            // remove update from options and add to delete array if did previously exist
            return createNewSystemUpdate({
                ...oldSystemUpdate,
                systemOptions: oldSystemUpdate.systemOptions.filter(option => option !== createdOption),
                systemOptionIdsToDelete: oldSystemUpdate.systemOptionIdsToDelete.concat(id)
            });
        }
    } else {
        // add option to list of deletions
        return createNewSystemUpdate({
            ...oldSystemUpdate,
            systemOptionIdsToDelete: oldSystemUpdate.systemOptionIdsToDelete.concat(id)
        });
    }
};

export const deleteOptionValue = (oldSystemUpdate, optionId, valueId) => {
    // find option in state
    const updatedOption = _getOption(oldSystemUpdate, optionId);
    const optionIndex = oldSystemUpdate.systemOptions.indexOf(updatedOption);
    if (updatedOption) {
        // find value in option
        const createdValue = updatedOption.optionValues.find(value => value.id === valueId);
        const optionValueIndex = updatedOption.optionValues.indexOf(createdValue);
        if (createdValue) {
            // check if value previously existed
            if (typeof createdValue.id === 'string') {
                // only remove from list
                return createNewSystemUpdate({
                    ...oldSystemUpdate,
                    systemOptions: oldSystemUpdate.systemOptions.replace(optionIndex, {
                        ...updatedOption,
                        optionValues: updatedOption.optionValues.filter(value => value !== createdValue),
                    }),
                });
            } else {
                // remove update from list and add id to deletions
                return createNewSystemUpdate({
                    ...oldSystemUpdate,
                    systemOptions: oldSystemUpdate.systemOptions.replace(optionIndex, {
                        ...updatedOption,
                        optionValues: updatedOption.optionValues.filter(value => value !== createdValue),
                        optionValueIdsToDelete: updatedOption.optionValueIdsToDelete.concat(valueId),
                    }),
                });
            }
        } else {
            // add value to delete array
            return createNewSystemUpdate({
                ...oldSystemUpdate,
                systemOptions: oldSystemUpdate.systemOptions.replace(optionIndex, {
                    ...updatedOption,
                    // optionValues: updatedOption.optionValues.replace()
                    optionValueIdsToDelete: (updatedOption.optionValueIdsToDelete || []).concat(valueId),
                }),
            });
        }
    } else {
        // add option with deleted value to state
        return createNewSystemUpdate({
            ...oldSystemUpdate,
            systemOptions: oldSystemUpdate.systemOptions.concat({
                id: optionId,
                optionValues: [],
                optionValueIdsToDelete: [valueId],
            }),
        });
    }
};

export function mergeSystemUpdate({
    // lists
    systemTagIds,
    systemTagIdsToDelete,
    infillSizes,
    infillSizesToDelete,
    infillPocketSizes,
    infillPocketSizesToDelete,
    infillPocketTypeIds,
    infillPocketTypeIdsToDelete,
    systemOptions,
    systemOptionIdsToDelete,
    invalidSystemConfigurationTypeIds,
    invalidSystemConfigurationTypeIdsToDelete,
    systemConfigurationOverrides,
    systemConfigurationOverridesToDelete,
    // other keys
    systemTypeId: newSystemTypeId,
    ...systemUpdate
}, {
    system: {
        // lists
        _systemSystemTags = [],
        _systemInfillSizes = [],
        _systemInfillPocketSizes = [],
        _systemInfillPocketTypeIds = [],
        _systemOptions = [],
        _invalidSystemConfigurationTypeIds = [],
        _systemConfigurationOverrides = [],
        // other keys
        systemTypeId,
        _systemType,
        ...system
    } = {},
    allSystemTypes = [],
    allSystemTags = [],
    allInfillSizes = [],
    allInfillPocketTypes = [],
    allInfillPocketSizes = [],
    allConfigurationTypes = [],
}) {
    console.log(arguments);
    return ({
        allSystemTypes,
        allSystemTags,
        allInfillSizes,
        allInfillPocketTypes,
        allInfillPocketSizes,
        allConfigurationTypes,
        system: {
            // other keys
            ...system,
            ...removeNullValues(systemUpdate),
            _systemType: newSystemTypeId === undefined || newSystemTypeId === systemTypeId ?
                _systemType
                :
                allSystemTypes.find(({ id }) => id === newSystemTypeId),
            // lists
            _systemSystemTags: _systemSystemTags
                .filter(({ systemTagId }) => !systemTagIdsToDelete
                    .includes(systemTagId))
                .concat(systemTagIds
                    .map(id => ({
                        _systemTag: allSystemTags
                            .find(st => st.id === id)
                    }))),
            _systemInfillSizes: _systemInfillSizes
                .filter(({ size }) => !infillSizesToDelete
                    .includes(size))
                .concat(infillSizes
                    .map(size => allInfillSizes
                        .find(is => is.size === size))),
            _systemInfillPocketSizes: _systemInfillPocketSizes
                .filter(({ size }) => !infillPocketSizesToDelete
                    .includes(size))
                .concat(infillPocketSizes
                    .map(size => allInfillPocketSizes
                        .find(ips => ips.size === size))),
            _systemInfillPocketTypeIds: _systemInfillPocketTypeIds
                .filter(({ id }) => !infillPocketTypeIdsToDelete
                    .includes(id))
                .concat(infillPocketTypeIds
                    .map(id => allInfillPocketTypes
                        .find(ipt => ipt.id === id))),
            _systemOptions: _systemOptions
                .filter(({ id }) => !systemOptionIdsToDelete
                    .includes(id))
                .map(so => {
                    const updatedOption = systemOptions.find(({ id }) => id === so.id);
                    return updatedOption ? {
                        ...so,
                        ...removeNullValues(updatedOption),
                        _optionValues: so._optionValues
                            .filter(({ id }) => !updatedOption.optionValueIdsToDelete
                                .includes(id))
                            .map(ov => {
                                const updatedValue = updatedOption.optionValues.find(({ id }) => id === ov.id);
                                return updatedValue ? {
                                    ...ov,
                                    ...removeNullValues(updatedValue),
                                } : ov;
                            })
                            .concat(updatedOption.optionValues
                                .filter(({ id }) => typeof id === 'string')),
                    } : so;
                })
                .concat(systemOptions
                    .filter(({ id }) => typeof id === 'string')
                    .map(so => ({
                        ...so,
                        _optionValues: so.optionValues,
                    }))),
            // _invalidSystemConfigurationTypeIds: _invalidSystemConfigurationTypeIds
            //     .filter()
            //     .concat(),
            // _systemConfigurationOverrides: _systemConfigurationOverrides
            //     .filter()
            //     .concat(),
        }
    });
}

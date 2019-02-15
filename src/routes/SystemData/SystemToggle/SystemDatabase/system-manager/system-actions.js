
import {
    allocateItems,
} from '../../../../../utils';
import defaultSystem from './default-system';


var _fakeId = 1;

// fake ids are always stringified numbers
const _getFakeId = () => `${_fakeId++}`;

const _validateKey = key => {
    if (!Object.keys(defaultSystem).includes(key)) throw new Error(`Invalid key: ${key}`);
}


// SYSTEM DIRECT

export function UPDATE_SYSTEM({
    system,
}, update) {
    console.log(arguments);
    Object.keys(update).forEach(_validateKey);
    return {
        system: {
            ...system,
            ...update,
        },
    };
};


export function UPDATE_SYSTEM_LIST({
    system,
}, update) {
    console.log(arguments);
    const [[key, { addedItems, deletedItems }]] = Object.entries(update);
    _validateKey(key);
    const deleteKey = key + 'ToDelete';
    const currentAddedItems = system[key];
    const currentDeletedItems = system[deleteKey];
    const [newDeletedItems, newAddedItems] = allocateItems(
        deletedItems,
        ...allocateItems(
            addedItems,
            currentAddedItems,
            currentDeletedItems,
        ).reverse(),
    );
    return {
        system: {
            ...system,
            [key]: newAddedItems,
            [deleteKey]: newDeletedItems,
        },
    };
};


// SYSTEM OPTION

export function CREATE_SYSTEM_OPTION({
    system,
    system: {
        systemOptions,
    },
}, option) {
    console.log(arguments);
    return {
        system: {
            // add new option
            ...system,
            systemOptions: systemOptions.concat({
                id: _getFakeId(),
                optionValues: [],
                optionValueIdsToDelete: [],
                ...option,
            }),
        },
    };
};


export function UPDATE_SYSTEM_OPTION({
    system,
    system: {
        systemOptions,
    }
}, {
    optionId,
    ...update
}) {
    console.log(arguments);
    // find option in state
    const option = systemOptions.find(({ id }) => id === optionId);
    if (option) {
        const optionIndex = systemOptions.indexOf(option);
        // update key on option in state
        return {
            system: {
                ...system,
                systemOptions: systemOptions.replace(optionIndex, {
                    ...option,
                    ...update,
                }),
            },
        };
    } else {
        // add option to state
        return {
            system: {
                ...system,
                systemOptions: systemOptions.concat({
                    id: optionId,
                    optionValues: [],
                    optionValueIdsToDelete: [],
                    ...update,
                }),
            },
        };
    }
};


export function DELETE_SYSTEM_OPTION({
    system,
    system: {
        systemOptions,
        systemOptionIdsToDelete,
    }
}, {
    optionId,
}) {
    console.log(arguments);
    const createdOption = systemOptions.find(option => option.id === optionId);
    // remove option from state
    if (createdOption) {
        // check if option previously existed
        if (typeof createdOption.id === 'string') {
            // only remove from options if option did not previously exist
            return {
                system: {
                    ...system,
                    systemOptions: systemOptions.filter(option => option !== createdOption),
                },
            };
        } else {
            // remove update from options and add to delete array if did previously exist
            return {
                system: {
                    ...system,
                    systemOptions: systemOptions.filter(option => option !== createdOption),
                    systemOptionIdsToDelete: systemOptionIdsToDelete.concat(optionId)
                },
            };
        }
    } else {
        // add option to list of deletions
        return {
            system: {
                ...system,
                systemOptionIdsToDelete: systemOptionIdsToDelete.concat(optionId)
            },
        };
    }
};


// OPTION VALUE

export function CREATE_OPTION_VALUE({
    system,
    system: {
        systemOptions,
    },
}, {
    optionId,
    ...value
}) {
    console.log(arguments);
    // find option
    const option = systemOptions.find(({ id }) => id === optionId);
    if (option) {
        const optionIndex = systemOptions.indexOf(option);
        // add value to option
        return {
            system: {
                ...system,
                systemOptions: systemOptions.replace(optionIndex, {
                    ...option,
                    optionValues: option.optionValues.concat({
                        id: _getFakeId(),
                        ...value,
                    }),
                }),
            },
        };
    } else {
        // add option with value to state
        return {
            system: {
                ...system,
                systemOptions: systemOptions.concat({
                    id: optionId,
                    optionValues: [{
                        id: _getFakeId(),
                        ...value,
                    }],
                    optionValueIdsToDelete: [],
                }),
            },
        };
    }
};


export function UPDATE_OPTION_VALUE({
    system,
    system: {
        systemOptions,
    },
}, {
    optionId,
    valueId,
    ...value
}) {
    console.log(arguments);
    // find option in state
    const option = systemOptions.find(({ id }) => id === optionId);
    if (option) {
        const optionIndex = systemOptions.indexOf(option);
        const { optionValues } = option;
        // find value in option
        const optionValue = optionValues.find(({ id }) => id === valueId);
        if (optionValue) {
            const optionValueIndex = option.optionValues.indexOf(optionValue);
            // update value in option
            return {
                system: {
                    ...system,
                    systemOptions: systemOptions.replace(optionIndex, {
                        ...option,
                        optionValues: option.optionValues.replace(optionValueIndex, {
                            ...optionValue,
                            ...value,
                        }),
                    }),
                },
            };
        } else {
            // add value to option
            return {
                system: {
                    ...system,
                    systemOptions: systemOptions.replace(optionIndex, {
                        ...option,
                        optionValues: option.optionValues.concat({
                            id: valueId,
                            ...value,
                        }),
                    }),
                },
            };
        }
    } else {
        // add option with updated value to state
        return {
            system: {
                ...system,
                systemOptions: systemOptions.concat({
                    id: optionId,
                    optionValues: [{
                        id: valueId,
                        ...value,
                    }],
                    optionValueIdsToDelete: [],
                }),
            },
        };
    }
};


export function DELETE_OPTION_VALUE({
    system,
    system: {
        systemOptions,
    },
}, {
    optionId,
    valueId,
}) {
    console.log(arguments);
    const updatedOption = systemOptions.find(({ id }) => id === optionId);
    const optionIndex = systemOptions.indexOf(updatedOption);
    if (updatedOption) {
        // find value in option
        const {
            optionValues,
            optionValueIdsToDelete,
        } = updatedOption;
        const createdValue = optionValues.find(value => value.id === valueId);
        if (createdValue) {
            // check if value previously existed
            if (typeof createdValue.id === 'string') {
                // only remove from list
                return {
                    system: {
                        ...system,
                        systemOptions: systemOptions.replace(optionIndex, {
                            ...updatedOption,
                            optionValues: optionValues.filter(value => value !== createdValue),
                        }),
                    },
                };
            } else {
                // remove update from list and add id to deletions
                return {
                    system: {
                        ...system,
                        systemOptions: systemOptions.replace(optionIndex, {
                            ...updatedOption,
                            optionValues: optionValues.filter(value => value !== createdValue),
                            optionValueIdsToDelete: optionValueIdsToDelete.concat(valueId),
                        }),
                    },
                };
            }
        } else {
            // add value to delete array
            return {
                system: {
                    ...system,
                    systemOptions: systemOptions.replace(optionIndex, {
                        ...updatedOption,
                        // optionValues: optionValues.replace()
                        optionValueIdsToDelete: optionValueIdsToDelete.concat(valueId),
                    }),
                },
            };
        }
    } else {
        // add option with deleted value to state
        return {
            system: {
                ...system,
                systemOptions: systemOptions.concat({
                    id: optionId,
                    optionValues: [],
                    optionValueIdsToDelete: [valueId],
                }),
            },
        };
    }
};


// CONFIGURATION OVERRIDES

export function CREATE_CONFIGURATION_OVERRIDE({
    system,
    system: {
        systemConfigurationOverrides,
    },
}, {

}) {

}


export function UPDATE_CONFIGURATION_OVERRIDE({
    system,
    system: {
        systemConfigurationOverrides,
    },
}, {

}) {

}


export function DELETE_CONFIGURATION_OVERRIDE({
    system,
    system: {
        systemConfigurationOverrides,
    },
}) {

}


import {
    allocate,
} from '../../../../../utils';

import {
    system as defaultSystem,
    option as defaultSystemOption,
    value as defaultOptionValue,
    override as defaultOverride,
} from './default';


var _fakeId = 1;

// fake ids are always stringified numbers
const _getFakeId = () => `${_fakeId++}`;

export const _removeFakeIds = obj => !obj || typeof obj !== 'object' ?
    obj
    :
    Object.entries(obj).reduce((result, [key, value]) => ({
        ...result,
        [key]: key === 'id' || key === '__created' ?
            typeof value === 'number' ?
                value
                :
                undefined
            :
            value && typeof value === 'object' ?
                Array.isArray(value) ?
                    value.map(_removeFakeIds)
                    :
                    _removeFakeIds(value)
                :
                value,
    }), {});

const _validateKey = key => !Object.keys(defaultSystem).includes(key)
    &&
    !Object.keys(defaultSystemOption).includes(key)
    &&
    !Object.keys(defaultOptionValue).includes(key)
    &&
    new Error(`Invalid key: ${key}`);


// SYSTEM DIRECT

export default {

    // SYSTEM

    UPDATE({
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
    },
    UPDATE_LIST({
        system,
    }, update) {
        console.log(arguments);
        const [[key, { addedItems, deletedItems }], tooMany] = Object.entries(update);
        if (tooMany) throw new Error('Cannot update multiple lists at once: ' + JSON.stringify(update));
        _validateKey(key);
        const deleteKey = key + 'ToDelete';
        const currentAddedItems = system[key];
        const currentDeletedItems = system[deleteKey];
        const {
            addedItems: newAddedItems,
            deletedItems: newDeletedItems,
        } = allocate({
            existing: {
                addedItems: currentAddedItems,
                deletedItems: currentDeletedItems,
            },
            incoming: {
                addedItems,
                deletedItems,
            },
        });
        return {
            system: {
                ...system,
                [key]: newAddedItems,
                [deleteKey]: newDeletedItems,
            },
        };
    },

    // CONFIGURATION OVERRIDES

    OVERRIDE: {
        CREATE({
            system,
            system: {
                configurationOverrides,
                configurationOverridesToDelete,
            },
        }, {
            detailTypeId,
            configurationTypeId,
        }) {
            const deletedOverride = configurationOverridesToDelete.find(o => o.detailTypeId === detailTypeId
                &&
                o.configurationTypeId === configurationTypeId);
            if (deletedOverride) {
                return {
                    system: {
                        ...system,
                        configurationOverridesToDelete: configurationOverridesToDelete
                            .filter(o => o !== deletedOverride),
                    },
                };
            } else {
                return {
                    system: {
                        ...system,
                        configurationOverrides: configurationOverrides
                            .concat({
                                ...defaultOverride,
                                __created: true,
                                detailTypeId,
                                configurationTypeId,
                            }),
                    },
                };
            }
        },
        UPDATE({
            system,
            system: {
                configurationOverrides,
            },
        }, {
            detailTypeId,
            configurationTypeId,
            ...update
        }) {
            console.log(arguments);
            const override = configurationOverrides.find(o => o.detailTypeId === detailTypeId
                &&
                o.configurationTypeId === configurationTypeId);
            if (override) {
                const overrideIndex = configurationOverrides.indexOf(override);
                return {
                    system: {
                        ...system,
                        configurationOverrides: configurationOverrides
                            .replace(overrideIndex, {
                                ...override,
                                ...update,
                            }),
                    },
                };
            } else {
                return {
                    system: {
                        ...system,
                        configurationOverrides: configurationOverrides
                            .concat({
                                ...defaultOverride,
                                detailTypeId,
                                configurationTypeId,
                                ...update,
                            }),
                    },
                };
            }
        },
        DELETE({
            system,
            system: {
                configurationOverrides,
                configurationOverridesToDelete,
            },
        }, {
            detailTypeId,
            configurationTypeId,
        }) {
            const override = configurationOverrides
                .find(o => o.detailTypeId === detailTypeId
                    &&
                    o.configurationTypeId === configurationTypeId);
            if (override) {
                return {
                    system: {
                        ...system,
                        configurationOverrides: configurationOverrides
                            .filter(o => o !== override),
                    },
                };
            } else {
                return {
                    system: {
                        ...system,
                        configurationOverridesToDelete: configurationOverridesToDelete
                            .concat({
                                ...defaultOverride,
                                detailTypeId,
                                configurationTypeId,
                            }),
                    },
                };
            }
        },
    },

    // SYSTEM OPTIONS

    OPTION: {
        CREATE({
            system,
            system: {
                systemOptions,
            },
        }, option) {
            console.log(arguments);
            Object.keys(option).forEach(_validateKey);
            return {
                system: {
                    // add new option
                    ...system,
                    systemOptions: systemOptions
                        .concat({
                            ...defaultSystemOption,
                            id: _getFakeId(),
                            ...option,
                        }),
                },
            };
        },
        UPDATE({
            system,
            system: {
                systemOptions,
            }
        }, {
            optionId,
            ...update
        }) {
            console.log(arguments);
            Object.keys(update).forEach(_validateKey);
            // find option in state
            const option = systemOptions
                .find(({ id }) => id === optionId);
            if (option) {
                const optionIndex = systemOptions
                    .indexOf(option);
                // update key on option in state
                return {
                    system: {
                        ...system,
                        systemOptions: systemOptions
                            .replace(optionIndex, {
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
                        systemOptions: systemOptions
                            .concat({
                                ...defaultSystemOption,
                                id: optionId,
                                ...update,
                            }),
                    },
                };
            }
        },
        UPDATE_LIST({
            system,
            system: {
                systemOptions,
            }
        }, {
            optionId,
            ...update
        }) {
            console.trace(arguments);
            const [[key, { addedItems, deletedItems }], tooMany] = Object.entries(update);
            if (tooMany) throw new Error('Cannot update multiple lists at once: ' + JSON.stringify(update));
            _validateKey(key);
            const deleteKey = key + 'ToDelete';
            // find option in state
            const option = systemOptions
                .find(({ id }) => id === optionId);
            if (option) {
                const optionIndex = systemOptions
                    .indexOf(option);
                const currentAddedItems = option[key];
                const currentDeletedItems = option[deleteKey];
                const {
                    addedItems: newAddedItems,
                    deletedItems: newDeletedItems,
                } = allocate({
                    existing: {
                        addedItems: currentAddedItems,
                        deletedItems: currentDeletedItems,
                    },
                    incoming: {
                        addedItems,
                        deletedItems,
                    },
                });
                console.log({
                    key,
                    deleteKey,
                    addedItems,
                    deletedItems,
                    currentAddedItems,
                    currentDeletedItems,
                    newAddedItems,
                    newDeletedItems,
                });
                return {
                    system: {
                        ...system,
                        systemOptions: systemOptions
                            .replace(optionIndex, {
                                ...option,
                                [key]: newAddedItems,
                                [deleteKey]: newDeletedItems,
                            }),
                    },
                };
            } else {
                return {
                    system: {
                        ...system,
                        systemOptions: systemOptions
                            .concat({
                                ...defaultSystemOption,
                                id: optionId,
                                [key]: addedItems,
                                [deleteKey]: deletedItems,
                            }),
                    },
                };
            }
        },
        DELETE({
            system,
            system: {
                systemOptions,
                systemOptionIdsToDelete,
            }
        }, {
            optionId,
        }) {
            console.log(arguments);
            const createdOption = systemOptions
                .find(option => option.id === optionId);
            // remove option from state
            if (createdOption) {
                // check if option previously existed
                if (typeof createdOption.id === 'string') {
                    // only remove from options if option did not previously exist
                    return {
                        system: {
                            ...system,
                            systemOptions: systemOptions
                                .filter(option => option !== createdOption),
                        },
                    };
                } else {
                    // remove update from options and add to delete array if did previously exist
                    return {
                        system: {
                            ...system,
                            systemOptions: systemOptions
                                .filter(option => option !== createdOption),
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
        },

        // OPTION VALUES

        VALUE: {
            CREATE({
                system,
                system: {
                    systemOptions,
                },
            }, {
                optionId,
                ...value
            }) {
                console.log(arguments);
                Object.keys(value).forEach(_validateKey)
                // find option
                const option = systemOptions
                    .find(({ id }) => id === optionId);
                if (option) {
                    const optionIndex = systemOptions
                        .indexOf(option);
                    // add value to option
                    return {
                        system: {
                            ...system,
                            systemOptions: systemOptions
                                .replace(optionIndex, {
                                    ...option,
                                    optionValues: option.optionValues
                                        .concat({
                                            ...defaultOptionValue,
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
                            systemOptions: systemOptions
                                .concat({
                                    ...defaultSystemOption,
                                    id: optionId,
                                    optionValues: [{
                                        id: _getFakeId(),
                                        ...value,
                                    }],
                                }),
                        },
                    };
                }
            },
            UPDATE({
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
                Object.keys(value).forEach(_validateKey)
                // find option in state
                const option = systemOptions
                    .find(({ id }) => id === optionId);
                if (option) {
                    const optionIndex = systemOptions
                        .indexOf(option);
                    const { optionValues } = option;
                    // find value in option
                    const optionValue = optionValues.find(({ id }) => id === valueId);
                    if (optionValue) {
                        const optionValueIndex = option.optionValues.indexOf(optionValue);
                        // update value in option
                        return {
                            system: {
                                ...system,
                                systemOptions: systemOptions
                                    .replace(optionIndex, {
                                        ...option,
                                        optionValues: option.optionValues
                                            .replace(optionValueIndex, {
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
                                systemOptions: systemOptions
                                    .replace(optionIndex, {
                                        ...option,
                                        optionValues: option.optionValues
                                            .concat({
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
                            systemOptions: systemOptions
                                .concat({
                                    ...defaultSystemOption,
                                    id: optionId,
                                    optionValues: [{
                                        id: valueId,
                                        ...value,
                                    }],
                                }),
                        },
                    };
                }
            },
            DELETE({
                system,
                system: {
                    systemOptions,
                },
            }, {
                optionId,
                valueId,
            }) {
                console.log(arguments);
                const updatedOption = systemOptions
                    .find(({ id }) => id === optionId);
                const optionIndex = systemOptions
                    .indexOf(updatedOption);
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
                                    systemOptions: systemOptions
                                        .replace(optionIndex, {
                                            ...updatedOption,
                                            optionValues: optionValues
                                                .filter(value => value !== createdValue),
                                        }),
                                },
                            };
                        } else {
                            // remove update from list and add id to deletions
                            return {
                                system: {
                                    ...system,
                                    systemOptions: systemOptions
                                        .replace(optionIndex, {
                                            ...updatedOption,
                                            optionValues: optionValues
                                                .filter(value => value !== createdValue),
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
                                systemOptions: systemOptions
                                    .replace(optionIndex, {
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
                            systemOptions: systemOptions
                                .concat({
                                    ...defaultSystemOption,
                                    id: optionId,
                                    optionValueIdsToDelete: [valueId],
                                }),
                        },
                    };
                }
            },
        }
    },
};

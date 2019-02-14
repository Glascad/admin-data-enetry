
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

export default class SystemUpdate {

    static _fakeId = 1;

    // fake ids are always stringified numbers
    static _getFakeId = () => `${SystemUpdate._fakeId++}`;


    constructor(system) {
        Object.assign(this, defaultSystem, system);
        console.log({ incomingSystem: system });
        console.log({ system: this });
    }


    _getOption = (id, systemOptions = this.systemOptions) => systemOptions
        .find(option => option.id === id);

    _getOptionValue = (id, option) => option.optionValues.find(value => value.id === id);


    // UPDATES

    update = (key, value) => new SystemUpdate({
        ...this,
        [key]: value,
    });

    updateList = (key, addedItems, deletedItems) => {
        if (!this.hasOwnProperty(key)) throw new Error(`key: ${key} does not exist in SystemUpdate`);
        const deleteKey = key + 'ToDelete';
        const currentAddedItems = this[key];
        const currentDeletedItems = this[deleteKey];
        const [newDeletedItems, newAddedItems] = allocateItems(
            deletedItems,
            ...allocateItems(
                addedItems,
                currentAddedItems,
                currentDeletedItems,
            ).reverse(),
        );
        return new SystemUpdate({
            ...this,
            [key]: newAddedItems,
            [deleteKey]: newDeletedItems,
        });
    }

    updateOption = (id, key, value) => {
        // find option in state
        const option = this._getOption(id);
        if (option) {
            const optionIndex = this.systemOptions.indexOf(option);
            // update key on option in state
            return new SystemUpdate({
                ...this,
                systemOptions: this.systemOptions.replace(optionIndex, {
                    ...option,
                    [key]: value,
                }),
            });
        } else {
            // add option to state
            return new SystemUpdate({
                ...this,
                systemOptions: this.systemOptions.concat({
                    id,
                    [key]: value,
                    optionValues: [],
                    optionValueIdsToDelete: [],
                }),
            });
        }
    };

    updateOptionValue = (optionId, optionValueId, key, value) => {
        // find option in state
        const option = this._getOption(optionId);
        if (option) {
            const optionIndex = this.systemOptions.indexOf(option);
            // find value in option
            const optionValue = this._getOptionValue(optionValueId, option);
            if (optionValue) {
                const optionValueIndex = option.optionValues.indexOf(optionValue);
                // update value in option
                return new SystemUpdate({
                    ...this,
                    systemOptions: this.systemOptions.replace(optionIndex, {
                        ...option,
                        optionValues: option.optionValues.replace(optionValueIndex, {
                            ...optionValue,
                            [key]: value,
                        }),
                    }),
                });
            } else {
                // add value to option
                return new SystemUpdate({
                    ...this,
                    systemOptions: this.systemOptions.replace(optionIndex, {
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
            return new SystemUpdate({
                ...this,
                systemOptions: this.systemOptions.concat({
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

    createOption = name => new SystemUpdate({
        // add new option
        ...this,
        systemOptions: this.systemOptions.concat({
            id: this._getFakeId(),
            name,
            optionValues: [],
            optionValueIdsToDelete: [],
        }),
    });

    createOptionValue = (optionId, name) => {
        // find option
        const option = this._getOption(optionId);
        if (option) {
            const optionIndex = this.systemOptions.indexOf(option);
            // add value to option
            return new SystemUpdate({
                ...this,
                systemOptions: this.systemOptions.replace(optionIndex, {
                    ...option,
                    optionValues: option.optionValues.concat({
                        id: this._getFakeId(),
                        name,
                    }),
                }),
            });
        } else {
            // add option with value to state
            return new SystemUpdate({
                ...this,
                systemOptions: this.systemOptions.concat({
                    id: optionId,
                    optionValues: [{
                        id: this._getFakeId(),
                        name,
                    }],
                    optionValueIdsToDelete: [],
                }),
            });
        }
    };


    // DELETES

    deleteOption = id => {
        // find option in state
        const createdOption = this.systemOptions.find(option => option.id === id);
        const optionIndex = this.systemOptions.indexOf(createdOption);
        // remove option from state
        if (createdOption) {
            // check if option previously existed
            if (typeof createdOption.id === 'string') {
                // only remove from options if option did not previously exist
                return new SystemUpdate({
                    ...this,
                    systemOptions: this.systemOptions.filter(option => option !== createdOption),
                });
            } else {
                // remove update from options and add to delete array if did previously exist
                return new SystemUpdate({
                    ...this,
                    systemOptions: this.systemOptions.filter(option => option !== createdOption),
                    systemOptionIdsToDelete: this.systemOptionIdsToDelete.concat(id)
                });
            }
        } else {
            // add option to list of deletions
            return new SystemUpdate({
                ...this,
                systemOptionIdsToDelete: this.systemOptionIdsToDelete.concat(id)
            });
        }
    };

    deleteOptionValue = (optionId, valueId) => {
        // find option in state
        const updatedOption = this._getOption(optionId);
        const optionIndex = this.systemOptions.indexOf(updatedOption);
        if (updatedOption) {
            // find value in option
            const createdValue = updatedOption.optionValues.find(value => value.id === valueId);
            const optionValueIndex = updatedOption.optionValues.indexOf(createdValue);
            if (createdValue) {
                // check if value previously existed
                if (typeof createdValue.id === 'string') {
                    // only remove from list
                    return new SystemUpdate({
                        ...this,
                        systemOptions: this.systemOptions.replace(optionIndex, {
                            ...updatedOption,
                            optionValues: updatedOption.optionValues.filter(value => value !== createdValue),
                        }),
                    });
                } else {
                    // remove update from list and add id to deletions
                    return new SystemUpdate({
                        ...this,
                        systemOptions: this.systemOptions.replace(optionIndex, {
                            ...updatedOption,
                            optionValues: updatedOption.optionValues.filter(value => value !== createdValue),
                            optionValueIdsToDelete: updatedOption.optionValueIdsToDelete.concat(valueId),
                        }),
                    });
                }
            } else {
                // add value to delete array
                return new SystemUpdate({
                    ...this,
                    systemOptions: this.systemOptions.replace(optionIndex, {
                        ...updatedOption,
                        // optionValues: updatedOption.optionValues.replace()
                        optionValueIdsToDelete: (updatedOption.optionValueIdsToDelete || []).concat(valueId),
                    }),
                });
            }
        } else {
            // add option with deleted value to state
            return new SystemUpdate({
                ...this,
                systemOptions: this.systemOptions.concat({
                    id: optionId,
                    optionValues: [],
                    optionValueIdsToDelete: [valueId],
                }),
            });
        }
    };

    mergeUpdate = ({
        system: {
            // lists
            _systemTags = [],
            _infillSizes = [],
            _infillPocketSizes = [],
            _infillPocketTypeIds = [],
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
    }, {
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
        ...systemUpdate
    } = removeNullValues(this)) => ({
        n: console.log({
            system,
            systemUpdate,
        }),
        allSystemTypes,
        allSystemTags,
        allInfillSizes,
        allInfillPocketTypes,
        allInfillPocketSizes,
        allConfigurationTypes,
        system: {
            // other keys
            ...system,
            ...systemUpdate,
            // lists
            _systemTags: _systemTags
                .filter(({ id }) => !systemTagIdsToDelete
                    .includes(id))
                .concat(systemTagIds
                    .map(id => allSystemTags
                        .find(st => st.id === id))),
            _infillSizes: _infillSizes
                .filter(({ size }) => !infillSizesToDelete
                    .includes(size))
                .concat(infillSizes
                    .map(size => allInfillSizes
                        .find(is => is.size === size))),
            _infillPocketSizes: _infillPocketSizes
                .filter(({ size }) => !infillPocketSizesToDelete
                    .includes(size))
                .concat(infillPocketSizes
                    .map(size => allInfillPocketSizes
                        .find(ips => ips.size === size))),
            _infillPocketTypeIds: _infillPocketTypeIds
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

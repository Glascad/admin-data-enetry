
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
    systemOptions: [],
    invalidSystemConfigurationTypeIds: [],
    systemConfigurationOverrides: [],
    // deletion lists
    systemOptionIdsToDelete: [],
    invalidSystemConfigurationTypeIdsToDelete: [],
    systemConfigurationOverridesToDelete: [],
};

export default class SystemUpdate {

    static _fakeId = 1;

    // fake ids are always stringified numbers
    static _getFakeId = () => `${SystemUpdate._fakeId++}`;


    constructor(system) {
        Object.assign(this, defaultSystem, system);
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
        const updatedOption = this.systemOptions.find(option => option.id === optionId);
        if (!updatedOption) {
            return {
                system: {
                    systemOptions: this.systemOptions.concat({
                        id: optionId,
                        optionValueIdsToDelete: [valueId],
                    }),
                },
            };
        } else {
            const optionIndex = this.systemOptions.indexOf(updatedOption);
            const optionValue = updatedOption.optionValues.find(value => value.id === valueId);
            if (!optionValue) {
                return {
                    system: {
                        systemOptions: this.systemOptions.replace(optionIndex, {
                            ...updatedOption,
                            // optionValues: updatedOption.optionValues.replace()
                            optionValueIdsToDelete: (updatedOption.optionValueIdsToDelete || []).concat(valueId),
                        }),
                    },
                };
            } else {

            }
        }
        return {
            system: {
                systemOptions: this.systemOptions.map(option => {
                    if (option.id !== optionId) return option;
                    else {
                        const {
                            optionValues,
                            optionValueIdsToDelete,
                        } = option;
                        // const createdOptionValue = 
                        return {
                            ...option,
                            optionValues
                        };
                    }
                }),
            },
        };
    };

}

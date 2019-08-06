import { option as defaultSystemOption } from '../../../default';

export default ({
    system,
    system: {
        systemOptions,
    },
}, {
    optionId,
    valueId,
}) => {
    // console.log(arguments);
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
}
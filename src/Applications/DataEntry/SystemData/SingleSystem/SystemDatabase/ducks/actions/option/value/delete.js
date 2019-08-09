import { option as defaultSystemOption } from '../../../default';

export default ({
    system,
    system: {
        systemOptions,
    },
}, {
    optionName,
    name,
}) => {
    console.log({system, optionName, name});
    const updatedOption = systemOptions
        .find(so => so.name === optionName);
    const optionIndex = systemOptions
        .indexOf(updatedOption);
    if (updatedOption) {
        // find value in option
        const {
            optionValues,
            optionValuesToDelete,
        } = updatedOption;
        const createdValue = optionValues.find(ov => ov.name === name);
        if (createdValue) {
            // check if value previously existed
            if (typeof createdValue.name === 'string') {
                // only remove from list
                return {
                    system: {
                        ...system,
                        systemOptions: systemOptions
                            .replace(optionIndex, {
                                ...updatedOption,
                                optionValues: optionValues
                                    .filter(ov => ov.name !== createdValue.name),
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
                                    .filter(ov => ov.name !== createdValue.name),
                                optionValuesToDelete: optionValuesToDelete.concat(name),
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
                            optionValuesToDelete: optionValuesToDelete.concat(name),
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
                        name: optionName,
                        optionValuesToDelete: [name],
                    }),
            },
        };
    }
}
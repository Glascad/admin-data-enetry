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
    // console.log(arguments);
    const updatedOption = systemOptions
        .find(({ name }) => name === optionName);
    const optionIndex = systemOptions
        .indexOf(updatedOption);
    if (updatedOption) {
        // find name in option
        const {
            optionValues,
            optionValuesToDelete,
        } = updatedOption;
        const createdValue = optionValues.find(v => v === name);
        if (createdValue) {
            // check if name previously existed
            // only remove from list
            return {
                system: {
                    ...system,
                    systemOptions: systemOptions
                        .replace(optionIndex, {
                            ...updatedOption,
                            optionValues: optionValues
                                .filter(v => v !== createdValue),
                        }),
                },
            };
        } else {
            // add name to delete array
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
        // add option with deleted name to state
        return {
            system: {
                ...system,
                systemOptions: systemOptions
                    .concat({
                        ...defaultSystemOption,
                        optionValuesToDelete: [name],
                    }),
            },
        };
    }
}
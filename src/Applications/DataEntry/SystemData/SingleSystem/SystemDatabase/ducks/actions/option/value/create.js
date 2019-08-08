import { _getFakeId } from "../../utils";
import { value as defaultOptionValue, option as defaultSystemOption } from '../../../default';

export default ({
    system,
    system: {
        systemOptions,
    },
}, {
    optionName,
    value
}) => {
    // console.log(value);
    // Object.keys(value).forEach(_validateKey)
    // find option
    const option = systemOptions
        .find(({ name }) => name === optionName);
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
                            .concat(value),
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
                        optionValues: [value],
                    }),
            },
        };
    }
}
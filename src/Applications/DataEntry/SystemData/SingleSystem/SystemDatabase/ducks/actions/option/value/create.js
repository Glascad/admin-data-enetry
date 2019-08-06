import { _getFakeId } from "../../utils";
import { value as defaultOptionValue, option as defaultSystemOption } from '../../../default';

export default ({
    system,
    system: {
        systemOptions,
    },
}, {
    optionId,
    ...value
}) => {
    // console.log(arguments);
    // Object.keys(value).forEach(_validateKey)
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
}
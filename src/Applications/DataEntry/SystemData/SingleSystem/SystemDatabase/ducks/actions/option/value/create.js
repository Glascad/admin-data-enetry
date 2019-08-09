import { _getFakeId } from "../../utils";
import { value as defaultOptionValue, option as defaultSystemOption } from '../../../default';
import { logInputOutput } from "../../../../../../../../../utils";

export default logInputOutput("createOptionValue",({
    system,
    system: {
        systemOptions,
    },
}, {
    optionName,
    name
}) => {
    // console.log(systemOptions);
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
                            .concat({name}),
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
                        name: optionName,
                        optionValues: [{name}],
                    }),
            },
        };
    }
})
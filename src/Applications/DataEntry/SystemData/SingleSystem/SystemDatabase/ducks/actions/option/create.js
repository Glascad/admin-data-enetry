import { option as defaultSystemOption } from '../../default';
import { _getFakeId } from '../utils';

export default ({
    system,
    system: {
        systemOptions,
    },
}, option) => {
    // console.log(arguments);
    // Object.keys(option).forEach(_validateKey);
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
}
import { option as defaultSystemOption } from '../../default';
import { _getFakeId } from '../utils';
import { logInputOutput } from '../../../../../../../../utils';

export default logInputOutput('Create System Option', ({
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
                    nodeId: _getFakeId(),
                    ...option,
                }),
        },
    };
});

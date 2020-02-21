import { getFakeContainerId } from './get-fake-id';
import CONTENT_TYPES from '../../../../../../../../../utils/objects/content_types';

export default function createContainer({
    elevationInput,
    elevationInput: {
        containers = []
    },
}, {
    daylightOpening,
    contents = CONTENT_TYPES.GLASS,
}) {

    return {
        elevationInput: {
            ...elevationInput,
            containers: containers.concat({
                id: getFakeContainerId(),
                daylightOpening,
                contents,
            }),
        },
    };
}

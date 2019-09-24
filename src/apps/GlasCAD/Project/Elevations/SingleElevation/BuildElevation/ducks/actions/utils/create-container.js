import { getFakeContainerId } from './get-fake-id';

export default function createContainer({
    elevationInput,
    elevationInput: {
        containers = []
    },
}, {
    daylightOpening,
}) {

    return {
        elevationInput: {
            ...elevationInput,
            containers: containers.concat({
                id: getFakeContainerId(),
                daylightOpening,
            }),
        },
    };
}

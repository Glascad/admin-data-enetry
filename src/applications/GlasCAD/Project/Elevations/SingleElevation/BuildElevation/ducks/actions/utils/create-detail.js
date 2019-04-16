import getFakeId from './get-fake-id';

export default function createDetail({
    elevationInput,
    elevationInput: {
        details = []
    },
}, {
    vertical,
    firstContainer: {
        rawContainer: {
            id: firstContainerId,
            fakeId: firstContainerFakeId,
        },
    },
    secondContainer: {
        rawContainer: {
            id: secondContainerId,
            fakeId: secondContainerFakeId,
        },
    },
}) {

    return {
        elevationInput: {
            ...elevationInput,
            details: details.concat({
                fakeId: getFakeId(),
                vertical,
                firstContainerId,
                firstContainerFakeId,
                secondContainerId,
                secondContainerFakeId,
            }),
        },
    };
}

import { getFakeDetailId } from './get-fake-id';

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
        },
    },
    secondContainer: {
        rawContainer: {
            id: secondContainerId,
        },
    },
}) {

    // CHECK DELETED DETAILS FOR A MATCHING DETAIL TO `STOP` DELETING

    return {
        elevationInput: {
            ...elevationInput,
            details: details.concat({
                id: getFakeDetailId(),
                vertical,
                firstContainerId,
                secondContainerId,
            }),
        },
    };
}

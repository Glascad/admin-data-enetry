
export default function validateElevation({
    _elevationContainers,
    _containerDetails,
}) {

    const allContainerIds = _elevationContainers.map(({ id }) => id);
    const allContainerFakeIds = _elevationContainers.map(({ fakeId }) => fakeId);

    const getInvalidId = ({
        firstContainerId,
        firstContainerFakeId,
        secondContainerId,
        secondContainerFakeId,
    }) => [
        {
            id: firstContainerId,
            fakeId: firstContainerFakeId,
        },
        {
            id: secondContainerId,
            fakeId: secondContainerFakeId,
        }
    ]
        .find(({ id, fakeId }) => (
            (
                id && !allContainerIds.includes(id)
            )
            ||
            (
                fakeId && !allContainerFakeIds.includes(fakeId)
            )
        ));

    const {
        invalidId,
        detail,
    } = _containerDetails
        .reduce((invalidId, detail) => {
            if (invalidId) return invalidId;
            else {
                const possibleInvalidId = getInvalidId(detail);
                if (possibleInvalidId) {
                    return {
                        detail,
                        invalidId: possibleInvalidId,
                    };
                }
            }
        }, null)
        ||
        {};

    if (invalidId) {
        const { id, fakeId } = invalidId;

        console.error(detail);

        throw new Error(`Invalid Detail with ${fakeId ? 'FAKE' : ''} CONTAINER ID: ${id || fakeId}`);
    }

    return arguments[0];
}

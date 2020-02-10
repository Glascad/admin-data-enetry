
export default function validateElevation({
    _elevationContainers,
    _containerDetails,
}) {

    const allContainerIds = _elevationContainers.map(({ id }) => id);

    const getInvalidId = ({
        firstContainerId,
        secondContainerId,
    }) => [firstContainerId, secondContainerId].find(id => id && !allContainerIds.includes(id));

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
        console.error(detail);

        throw new Error(`Invalid Detail with Container Id: ${invalidId}`);
    }

    return arguments[0];
}

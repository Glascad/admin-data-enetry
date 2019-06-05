
export default function redirectDetail({
    elevationInput,
    elevationInput: {
        details = [],
    },
}, {
    detail,
    detail: {
        rawDetail,
        rawDetail: {
            id: detailId,
            firstContainerId,
            secondContainerId,
        },
    },
    oldContainer,
    oldContainer: {
        rawContainer: {
            id: oldId,
        },
    },
    newContainer,
    newContainer: {
        rawContainer: {
            id: newId,
        },
    },
}) {

    // console.log({ detail, oldContainer, newContainer });
    // console.trace(detail);

    const oldIdIsFirst = oldId === firstContainerId ?
        true
        :
        oldId === secondContainerId ?
            false
            :
            new Error(`Container Id: ${oldId} is not found in Detail ${detailId}`);

    const oldKeyToDelete = `${
        oldIdIsFirst ?
            'first'
            :
            'second'
        }ContainerId`;

    const newKeyToAdd = `${
        oldIdIsFirst ?
            'first'
            :
            'second'
        }ContainerId`;

    const previouslyUpdatedDetail = details.find(({ id }) => id === detailId);

    const updatedDetail = {
        ...rawDetail,
        ...previouslyUpdatedDetail,
        [oldKeyToDelete]: undefined,
        [newKeyToAdd]: newId,
    };

    // console.log({ updatedDetail });

    return {
        elevationInput: {
            ...elevationInput,
            details: previouslyUpdatedDetail ?
                details.replace(
                    details.indexOf(previouslyUpdatedDetail),
                    updatedDetail,
                )
                :
                details.concat(updatedDetail),
        },
    };
}

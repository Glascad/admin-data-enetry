
export default function redirectDetail({
    elevationInput,
    elevationInput: {
        details = [],
    },
}, {
    detail: {
        rawDetail,
        rawDetail: {
            id: detailId,
            fakeId: detailFakeId,
            firstContainerId,
            firstContainerFakeId,
            secondContainerId,
            secondContainerFakeId,
        },
    },
    oldContainer: {
        rawContainer: {
            id: oldId,
            fakeId: oldFakeId,
        },
    },
    newContainer: {
        rawContainer: {
            id: newId,
            fakeId: newFakeId,
        },
    },
}) {

    const oldIdIsReal = !!oldId && !oldFakeId;
    const newIdIsReal = !!newId && !newFakeId;

    const oldIdIsFirst = oldIdIsReal ?
        oldId === firstContainerId ?
            true
            :
            oldId === secondContainerId ?
                false
                :
                new Error(`Real Container Id: ${oldId} is not found in Detail ${detailId || detailFakeId}`)
        :
        oldId === firstContainerFakeId ?
            true
            :
            oldId === secondContainerFakeId ?
                false
                :
                new Error(`Fake Container Id: ${oldFakeId} is not found in Detail ${detailId || detailFakeId}`);

    const oldKeyToDelete = `${
        oldIdIsFirst ?
            'first'
            :
            'second'
        }Container${
        oldIdIsReal ?
            ''
            :
            'Fake'
        }Id`;

    const newKeyToAdd = `${
        oldIdIsFirst ?
            'first'
            :
            'second'
        }Container${
        newIdIsReal ?
            ''
            :
            'Fake'
        }Id`;

    const previouslyUpdatedDetail = details.find(({ id, fakeId }) => (id || detailId) === (detailId || detailFakeId));

    const updatedDetail = {
        ...rawDetail,
        ...previouslyUpdatedDetail,
        [oldKeyToDelete]: undefined,
        [newKeyToAdd]: (newId || newFakeId),
    };

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

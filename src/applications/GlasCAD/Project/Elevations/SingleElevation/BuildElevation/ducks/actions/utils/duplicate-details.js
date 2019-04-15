import getFakeId from './get-fake-id';

export default function createDetail({
    elevationInput,
    elevationInput: {
        details = []
    },
}, {
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

    const previouslyUpdatedDetail = details.find(({ id, fakeId }) => (id || fakeId) === (detailId || detailFakeId));

    const newDetail = {
        ...rawDetail,
        ...previouslyUpdatedDetail,
        id: undefined,
        fakeId: getFakeId(),
        [oldKeyToDelete]: undefined,
        [newKeyToAdd]: (newId || newFakeId),
    };

    return {
        elevationInput: {
            ...elevationInput,
            details: details.concat(newDetail),
        },
    };
}

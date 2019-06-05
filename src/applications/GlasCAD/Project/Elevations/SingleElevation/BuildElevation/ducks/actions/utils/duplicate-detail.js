import { getFakeDetailId } from './get-fake-id';

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
            fakeId: detailFakeId,
            firstContainerId,
            firstContainerFakeId,
            secondContainerId,
            secondContainerFakeId,
        },
    },
    oldContainer,
    oldContainer: {
        rawContainer: {
            id: oldId,
            fakeId: oldFakeId,
        },
    },
    newContainer,
    newContainer: {
        rawContainer: {
            id: newId,
            fakeId: newFakeId,
        },
    },
}) {

    // console.log(`DUPLICATING DETAIL: ${detailId || detailFakeId}, REDIRECTING FROM: ${oldId || oldFakeId} TO:  ${newId || newFakeId}`);
    // console.log({ detail, oldContainer, newContainer });
    // console.trace(detail);

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
        fakeId: getFakeDetailId(),
        [oldKeyToDelete]: undefined,
        [newKeyToAdd]: (newId || newFakeId),
    };

    // console.log({ newDetail });

    return {
        elevationInput: {
            ...elevationInput,
            details: details.concat(newDetail),
        },
    };
}

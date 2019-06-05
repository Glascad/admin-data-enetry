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

    // console.log(`DUPLICATING DETAIL: ${detailId}, REDIRECTING FROM: ${oldId} TO:  ${newId}`);
    // console.log({ detail, oldContainer, newContainer });
    // console.trace(detail);

    const oldIdIsFirst = oldId === firstContainerId ?
        true
        :
        oldId === secondContainerId ?
            false
            :
            new Error(`Container Id: ${oldId} is not found in Detail ${detailId}`)

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

    const newDetail = {
        ...rawDetail,
        ...previouslyUpdatedDetail,
        id: getFakeDetailId(),
        [oldKeyToDelete]: undefined,
        [newKeyToAdd]: newId,
    };

    // console.log({ newDetail });

    return {
        elevationInput: {
            ...elevationInput,
            details: details.concat(newDetail),
        },
    };
}

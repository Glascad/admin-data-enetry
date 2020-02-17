import { GET_RELATIVE_DIRECTIONS } from '../../../../../../../../utils';
import deleteContainer from './utils/delete-container';
import deleteDetail from './utils/delete-detail';
import mergeDLO from './utils/merge-dlo';
import redirectDetail from './utils/redirect-detail';


MERGE_CONTAINERS.getSelectedItems = ({
    container: {
        id,
    },
}) => ({
    containers: {
        [id]: container,
    },
}) => ([
    container,
]);

export default function MERGE_CONTAINERS({
    elevationInput,
    elevationInput: {
        containerIdsToDelete = [],
    },
}, {
    container,
    direction,
    direction: [
        vertical,
        first,
    ],
    allowCustomRoughOpenings,
}) {

    if (!container.canMergeByDirection(...direction, allowCustomRoughOpenings)) return arguments[0];

    const { FORWARD, BACKWARD, LEFT, RIGHT } = GET_RELATIVE_DIRECTIONS(direction);

    const [containerToMerge] = container.getImmediateContainersByDirection(...FORWARD);

    const {
        rawContainer: {
            id: mergedId,
        },
    } = containerToMerge;

    const [detailInBetween] = container.getDetailsByDirection(...FORWARD);

    const leftEndDetailToCheck = containerToMerge.getFirstOrLastDetailByDirection(...LEFT, first);
    const rightEndDetailToCheck = containerToMerge.getFirstOrLastDetailByDirection(...RIGHT, first);

    const leftEndDetailToCheckAgainst = container.getFirstOrLastDetailByDirection(...LEFT, !first);
    const rightEndDetailToCheckAgainst = container.getFirstOrLastDetailByDirection(...RIGHT, !first);

    const shouldDelete = ({
        rawDetail: {
            firstContainerId,
            secondContainerId,
        },
    }, {
        rawDetail: {
            firstContainerId: fcid,
            secondContainerId: scid,
        },
    }) => {

        const mergedIdIsFirst = mergedId === firstContainerId ?
            true
            :
            mergedId === secondContainerId ?
                false
                :
                new Error(``);

        const otherIdIsFirst = !mergedIdIsFirst;

        const otherIdToCompare = otherIdIsFirst ?
            firstContainerId
            :
            secondContainerId;

        return containerIdsToDelete.includes(otherIdToCompare)
            ||
            otherIdToCompare === (
                otherIdIsFirst ?
                    fcid
                    :
                    scid
            );
    }

    const shouldDeleteLeft = shouldDelete(leftEndDetailToCheck, leftEndDetailToCheckAgainst);
    const shouldDeleteRight = shouldDelete(rightEndDetailToCheck, rightEndDetailToCheckAgainst);

    const detailsToDelete = [detailInBetween]
        .concat(
            shouldDeleteLeft ?
                leftEndDetailToCheck
                :
                [],
            shouldDeleteRight ?
                rightEndDetailToCheck
                :
                [],
        );

    const leftDetails = containerToMerge.getDetailsByDirection(...LEFT);
    const rightDetails = containerToMerge.getDetailsByDirection(...RIGHT);

    const detailsToUpdate = containerToMerge
        .getDetailsByDirection(...FORWARD)
        .concat(
            shouldDeleteLeft ?
                leftDetails.filter(detail => detail !== leftEndDetailToCheck)
                :
                leftDetails,
            shouldDeleteRight ?
                rightDetails.filter(detail => detail !== rightEndDetailToCheck)
                :
                rightDetails,
        );

    // FIRST MERGE DLOS
    console.log('MERGING')
    const elevationWithMergedContainers = mergeDLO(...arguments);
    console.log({
        elevationInput,
        elevationWithMergedContainers,
    })

    // THEN DELETE CONTAINER
    const elevationWithDeletedContainer = deleteContainer(elevationWithMergedContainers, {
        container: containerToMerge,
    });

    // THEN DELETE DETAILS
    const elevationWithDeletedDetails = detailsToDelete
        .reduce((elevation, detail) => deleteDetail(elevation, { detail }),
            elevationWithDeletedContainer);

    // THEN REDIRECT DETAILS
    return detailsToUpdate
        .reduce((elevation, detail) => redirectDetail(elevation, {
            detail,
            oldContainer: containerToMerge,
            newContainer: container,
        }),
            elevationWithDeletedDetails);

};

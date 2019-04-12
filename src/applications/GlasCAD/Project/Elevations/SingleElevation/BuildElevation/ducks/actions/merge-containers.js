import mergeDLO from './utils/merge-dlo';
import deleteContainer from './utils/delete-container';
import { GET_RELATIVE_DIRECTIONS } from '../../../utils/recursive-elevation/directions';
import deleteDetail from './utils/delete-detail';
import redirectDetail from './utils/redirect-detail';
import mergeBottomLeftOffset from './utils/merge-bottom-left-offset';

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
            fakeId: mergedFakeId,
        },
    } = containerToMerge;

    console.log({
        containerId: container.id,
        mergeId: containerToMerge.id,
    });

    const [detailInBetween] = container.getDetailsByDirection(...FORWARD);

    const leftEndDetailToCheck = containerToMerge.getFirstOrLastDetailByDirection(...LEFT, first);
    const rightEndDetailToCheck = containerToMerge.getFirstOrLastDetailByDirection(...RIGHT, first);

    const leftEndDetailToCheckAgainst = container.getFirstOrLastDetailByDirection(...LEFT, !first);
    const rightEndDetailToCheckAgainst = container.getFirstOrLastDetailByDirection(...RIGHT, !first);

    const shouldDelete = ({
        rawDetail: {
            firstContainerId,
            firstContainerFakeId,
            secondContainerId,
            secondContainerFakeId,
        },
    }, {
        rawDetail: {
            firstContainerId: fcid,
            firstContainerFakeId: fcfkid,
            secondContainerId: scid,
            secondContainerFakeId: scfkid,
        },
    }) => {

        const mergedIdIsReal = !!mergedId && !mergedFakeId;

        const mergedIdIsFirst = mergedIdIsReal ?
            mergedId === firstContainerId ?
                true
                :
                mergedId === secondContainerId ?
                    false
                    :
                    new Error(``)
            :
            mergedFakeId === firstContainerFakeId ?
                true
                :
                mergedFakeId === secondContainerFakeId ?
                    false
                    :
                    new Error(``);

        const otherIdIsUndefined = mergedIdIsFirst ?
            secondContainerId === undefined && secondContainerFakeId === undefined
            :
            firstContainerId === undefined && firstContainerFakeId === undefined;

        const otherIdIsReal = !otherIdIsUndefined &&
            mergedIdIsFirst ?
            !!secondContainerId && !secondContainerFakeId
            :
            !!firstContainerId && !firstContainerFakeId;

        const otherIdIsFirst = !mergedIdIsFirst;

        const otherIdToCompare = otherIdIsReal ?
            otherIdIsFirst ?
                firstContainerId
                :
                secondContainerId
            :
            otherIdIsFirst ?
                firstContainerFakeId
                :
                secondContainerFakeId;

        return containerIdsToDelete.includes(otherIdToCompare)
            ||
            otherIdToCompare === (
                otherIdIsReal ?
                    otherIdIsFirst ?
                        fcid
                        :
                        scid
                    :
                    otherIdIsFirst ?
                        fcfkid
                        :
                        scfkid
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
    const elevationWithMergedDLOs = mergeDLO(...arguments);

    // THEN CHECK FOR BOTTOM / LEFT OFFSET
    const elevationWithMergedContainers = mergeBottomLeftOffset(elevationWithMergedDLOs, { container, direction });

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

import duplicateDetail from './duplicate-detail';
import redirectDetail from './redirect-detail';
import deleteDetail from './delete-detail';

export default function updateDetailsAfterMovingFrame({
    elevationInput,
}, {
    _frame,
    _frame: {
        vertical,
        placement,
    },
    distance,
}) {

    const newPlacement = {
        x: vertical ?
            placement.x - distance
            :
            placement.x,
        y: vertical ?
            placement.y
            :
            placement.y - distance,
        height: placement.height,
        width: placement.width,
    };

    // return [true, false]
    return [true, false]
        .reduce(({ newElevation: outerNewElevation }, first) => {
            const detailAcrossPerpendicular = _frame.getDetailAcrossPerpendicularByDirection(first);
            const perpendicular = _frame.getPerpendicularFrameByDirection(first);
            const expandingContainer = _frame.getFirstOrLastContainerByDirection(distance > 0, !first);
            const contractingContainer = _frame.getFirstOrLastContainerByDirection(distance < 0, !first);
            return perpendicular.details
                .reduce(({ done, newElevation, reachedRange }, detail) => {
                    // check first if detail is within range of motion
                    // have not yet reached range of motion
                    if (
                        !reachedRange
                        &&
                        (
                            (
                                detail.placement[vertical ? 'x' : 'y']
                                +
                                detail.placement[vertical ? 'width' : 'height']
                            )
                            <=
                            placement[vertical ? 'x' : 'y']
                        )
                    ) return {
                        newElevation,
                    };
                    // have passed range of motion
                    else if (
                        reachedRange
                        &&
                        (
                            detail.placement[vertical ? 'x' : 'y']
                            >=
                            (
                                placement[vertical ? 'x' : 'y']
                                +
                                placement[vertical ? 'width' : 'height']
                            )
                        )
                    ) return {
                        done: true,
                        newElevation,
                    };
                    // within range of motion
                    else {
                        // check first detail
                        if (
                            detail.placement[vertical ? 'x' : 'y']
                            ===
                            (
                                placement[vertical ? 'x' : 'y']
                                +
                                placement[vertical ? 'width' : 'height']
                            )
                        ) return {
                            newElevation: (
                                // check if beginning across from another detail
                                detailAcrossPerpendicular ?
                                    // redirect
                                    redirectDetail
                                    :
                                    // delete
                                    deleteDetail
                            )(newElevation, {
                                detail,
                                oldContainer: contractingContainer,
                                newContainer: expandingContainer,
                            }),
                        };
                        // check last detail
                        else if (
                            // if detail extends beyond new placement of frame
                            (
                                detail.placement[vertical ? 'x' : 'y']
                                +
                                detail.placement[vertical ? 'width' : 'height']
                            )
                            >=
                            newPlacement[vertical ? 'x' : 'y']
                        ) return {
                            // must split detail into two
                            newElevation: duplicateDetail(newElevation, {
                                detail,
                                oldContainer: contractingContainer,
                                newContainer: expandingContainer,
                            }),
                        };
                        // redirect all details in between
                        else return {
                            newElevation: redirectDetail(newElevation, {
                                detail,
                                oldContainer: contractingContainer,
                                newContainer: expandingContainer,
                            }),
                        };
                    }
                }, {
                        newElevation: outerNewElevation,
                        done: false,
                    });
        }, {
                newElevation: arguments[0],
            })
        .newElevation;
}

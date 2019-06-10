import duplicateDetail from './duplicate-detail';
import redirectDetail from './redirect-detail';
import deleteDetail from './delete-detail';
import ComparablePlacement from "./comparable-placement";

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

    const oldFramePlacement = new ComparablePlacement(placement, vertical, distance > 0);
    const newFramePlacement = new ComparablePlacement(newPlacement, vertical, distance > 0);

    const { newElevation } = [true, false]
        .reduce(({ newElevation: outerNewElevation }, first) => {
            const expandingContainer = _frame.getFirstOrLastContainerByDirection(distance < 0, !first);
            const contractingContainer = _frame.getFirstOrLastContainerByDirection(distance > 0, !first);
            const details = contractingContainer.getDetailsByDirection(vertical, first);
            // This needs to check whether a frame across the perpendicular matches up with the moved frame i.e. that they overlap --- we need to update the frame/detail matching logic to account for frames whose sightlines overlap, but are not the same frame
            const hasDetailAcrossPerpendicular = !!_frame.getDetailAcrossPerpendicularByDirection(first);

            const maybeReversedDetails = distance > 0 ?
                details.slice().reverse()
                :
                details;

            return maybeReversedDetails
                .reduce(({ newElevation, done }, detail, i) => {
                    // console.log(`Checking Detail ${detail.id}: ${(detail.firstContainer || {}).id} ${(detail.secondContainer || {}).id}`);
                    const detailPlacement = new ComparablePlacement(detail.placement, vertical, distance > 0);
                    // console.log({ detail, oldFramePlacement, newFramePlacement, detailPlacement });

                    if (done || detailPlacement.inner.isFartherThan(newFramePlacement.outer)) {
                        // console.log(`done`);
                        return { newElevation, done: true };
                    }
                    // first detail
                    if (
                        (i === 0)
                        &&
                        !hasDetailAcrossPerpendicular
                    ) {
                        // do nothing
                        if (newFramePlacement.outer.isCloserThan(detailPlacement.outer)) {
                            return { newElevation };
                        }
                        // delete first detail
                        if (newFramePlacement.outer.isFartherThanOrEqualTo(detailPlacement.outer)) {
                            return {
                                newElevation: deleteDetail(newElevation, {
                                    detail,
                                }),
                            };
                        }
                    }
                    // all details
                    if (newFramePlacement.inner.isFartherThanOrEqualTo(detailPlacement.outer)) {
                        // console.log(`Redirecting Intermediate Detail`);
                        return {
                            newElevation: redirectDetail(newElevation, {
                                detail,
                                oldContainer: contractingContainer,
                                newContainer: expandingContainer,
                            }),
                        };
                    }
                    // last detail (ending next to another detail)
                    // do nothing if frame ends up even with another frame across perpendicular
                    if (newFramePlacement.inner.isCloserThanOrEqualTo(detailPlacement.inner)) {
                        // console.log(`Doing nothing to Last Detail`);
                        return {
                            done: true,
                            newElevation,
                        };
                    }
                    // redirect if frame ends up even with the outer frame across perpendicular
                    if (newFramePlacement.outer.isCloserThan(detailPlacement.outer)) {
                        // console.log(`Redirecting Last Detail`);
                        return {
                            done: true,
                            newElevation: duplicateDetail(newElevation, {
                                detail,
                                oldContainer: contractingContainer,
                                newContainer: expandingContainer,
                            }),
                        };
                    }
                    {
                        // console.log(`Duplicating Last Detail`);
                        return {
                            done: true,
                            newElevation: redirectDetail(newElevation, {
                                detail,
                                oldContainer: contractingContainer,
                                newContainer: expandingContainer,
                            }),
                        };

                    }
                }, { newElevation: outerNewElevation });
        }, { newElevation: arguments[0] });


    return newElevation;
}

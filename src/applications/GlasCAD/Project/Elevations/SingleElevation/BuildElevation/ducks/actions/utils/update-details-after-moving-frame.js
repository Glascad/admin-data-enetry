import duplicateDetail from './duplicate-detail';
import redirectDetail from './redirect-detail';
import deleteDetail from './delete-detail';

const precision = 100;

const round = num => Math.round(num * precision) / precision;

class ComparableMeasurement {

    constructor(measurement, first) {
        this.rawMeasurement = measurement;
        this.measurement = round(measurement);
        this.first = first;
    }

    isFartherThan = ({ measurement }) => (
        this.first ?
            this.measurement < measurement
            :
            this.measurement > measurement
    );

    isCloserThan = ({ measurement }) => (
        this.first ?
            this.measurement > measurement
            :
            this.measurement < measurement
    );

    isEqualTo = ({ measurement }) => this.measurement === measurement;

    isFartherThanOrEqualTo = measurement => (
        this.isFartherThan(measurement)
        ||
        this.isEqualTo(measurement)
    );

    isCloserThanOrEqualTo = measurement => (
        this.isCloserThan(measurement)
        ||
        this.isEqualTo(measurement)
    );
}

class ComparablePlacement {
    constructor(placement, vertical, first) {
        this.placement = placement;
        this.vertical = vertical;
        this.first = first;

        const offsetKey = vertical ? 'x' : 'y';

        const dimensionKey = vertical ? 'width' : 'height';

        this.inner = new ComparableMeasurement(
            first ?
                placement[offsetKey] + placement[dimensionKey]
                :
                placement[offsetKey],
            first,
        );

        this.outer = new ComparableMeasurement(
            first ?
                placement[offsetKey]
                :
                placement[offsetKey] + placement[dimensionKey],
            first,
        );
    }
}

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
            const hasDetailAcrossPerpendicular = !!_frame.getDetailAcrossPerpendicularByDirection(first);

            const maybeReversedDetails = distance > 0 ?
                details.slice().reverse()
                :
                details;

            return maybeReversedDetails
                .reduce(({ newElevation, done }, detail, i) => {
                    console.log(`Checking Detail`);
                    const detailPlacement = new ComparablePlacement(detail.placement, vertical, distance > 0);
                    console.log({ detail, oldFramePlacement, newFramePlacement, detailPlacement });

                    if (done || detailPlacement.inner.isFartherThan(newFramePlacement.outer)) {
                        console.log(`done`);
                        return { newElevation, done: true };
                    }
                    // first detail
                    if (i === 0) {
                        const newPlacementExceedsDetailPlacement = newFramePlacement.inner.isFartherThanOrEqualTo(detailPlacement.outer);

                        if (hasDetailAcrossPerpendicular) {
                            if (newPlacementExceedsDetailPlacement) {
                                console.log(`Redirecting First Detail`);
                                return {
                                    newElevation: redirectDetail(newElevation, {
                                        detail,
                                        oldContainer: contractingContainer,
                                        newContainer: expandingContainer,
                                    }),
                                };
                            }
                            else {
                                console.log(`Splitting First Detail`);
                                return {
                                    newElevation: duplicateDetail(newElevation, {
                                        detail,
                                        oldContainer: contractingContainer,
                                        newContainer: expandingContainer,
                                    }),
                                };
                            }
                        } else {
                            if (newPlacementExceedsDetailPlacement) {
                                console.log(`Deleting First Detail`);
                                return {
                                    newElevation: deleteDetail(newElevation, {
                                        detail,
                                    }),
                                };
                            }
                            else {
                                console.log(`Leaving First Detail as is`);
                                return {
                                    newElevation,
                                };
                            }
                        }
                    }
                    // last detail (ending next to another detail)
                    else if (detailPlacement.outer.isEqualTo(newFramePlacement.inner)) {
                        console.log(`Redirecting Last Detail`);
                        return {
                            done: true,
                            newElevation: redirectDetail(newElevation, {
                                detail,
                                oldContainer: contractingContainer,
                                newContainer: expandingContainer,
                            }),
                        };
                    }
                    // last detail (ending next to another container)
                    else if (detailPlacement.outer.isFartherThan(newFramePlacement.inner)) {
                        console.log(`Duplicating Last Detail`);
                        return {
                            done: true,
                            newElevation: duplicateDetail(newElevation, {
                                detail,
                                oldContainer: contractingContainer,
                                newContainer: expandingContainer,
                            }),
                        };
                    }
                    // intermediate details
                    else {
                        console.log(`Redirecting Intermediate Detail`);
                        return {
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

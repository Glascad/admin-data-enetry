import updateDLO from './utils/update-dlo';
import updateDetailsAfterMovingFrame from './utils/update-details-after-moving-frame';

import { unique } from '../../../../../../../../utils';

export default function MOVE_FRAME({
    elevationInput,
}, {
    _frame,
    _frame: {
        vertical,
        firstContainers,
        details,
        secondContainers,
    },
    distance,
}) {
    if (!distance || !_frame.canMoveByDistance(distance)) return arguments[0];

    // console.log(`MOVING FRAME: ${_frame.refId} DISTANCE: ${distance}`);
    // console.log({ _frame, distance });

    const allFirstContainers = unique(
        firstContainers,
        secondContainers
            .reduce((excludedContainers, container) => excludedContainers
                .concat(container.getImmediateContainersByDirection(!vertical, true)),
                [])
    );

    const allSecondContainers = unique(
        secondContainers,
        firstContainers
            .reduce((excludedContainers, container) => excludedContainers
                .concat(container.getImmediateContainersByDirection(!vertical, false)),
                [])
    );

    const elevationWithShiftedFirstContainers = allFirstContainers
        .reduce((updatedElevation, container) => container ?
            updateDLO(updatedElevation, {
                container,
                distance,
                vertical: !vertical,
            })
            :
            updatedElevation,
            { elevationInput: elevationInput });

    const elevationWithSiftedSecondContainers = allSecondContainers
        .reduce((updatedElevation, container) => container ?
            updateDLO(updatedElevation, {
                container,
                distance: -distance,
                vertical: !vertical,
            })
            :
            updatedElevation,
            elevationWithShiftedFirstContainers);

    return updateDetailsAfterMovingFrame(elevationWithSiftedSecondContainers, {
        _frame,
        distance,
    });
}

import updateDLO from "./utils/update-dlo";

export default function MOVE_FRAME({
    elevation: elevationInput,
}, {
    _frame,
    _frame: {
        vertical,
        firstContainers,
        secondContainers,
    },
    distance,
}) {

    if (!_frame.canMoveByDirection(distance > 0)) return arguments[0];

    const elevationWithShiftedFirstContainers = firstContainers
        .reduce((updatedElevation, container) => updateDLO(updatedElevation, {
            container,
            distance,
            vertical: !vertical,
        }),
            { elevation: elevationInput });

    return secondContainers
        .reduce((updatedElevation, container) => updateDLO(updatedElevation, {
            container,
            distance: -distance,
            vertical: !vertical,
        }),
            elevationWithShiftedFirstContainers);
}

import updateDLO from "./utils/update-dlo";
import { unique } from "../../../../../../../../utils";

export default function MOVE_FRAME({
    elevation: elevationInput,
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

    if (!distance || !_frame.canMoveByDirection(distance > 0)) return arguments[0];

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

    console.log({
        _frame,
        vertical,
        firstContainers,
        secondContainers,
        allFirstContainers,
        allSecondContainers,
    });

    const elevationWithShiftedFirstContainers = allFirstContainers
        .reduce((updatedElevation, container) => container ?
            updateDLO(updatedElevation, {
                container,
                distance,
                vertical: !vertical,
            })
            :
            updatedElevation,
            { elevation: elevationInput });

    return allSecondContainers
        .reduce((updatedElevation, container) => container ?
            updateDLO(updatedElevation, {
                container,
                distance: -distance,
                vertical: !vertical,
            })
            :
            updatedElevation,
            elevationWithShiftedFirstContainers);
}

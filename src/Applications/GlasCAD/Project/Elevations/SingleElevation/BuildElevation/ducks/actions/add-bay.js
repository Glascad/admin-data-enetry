import updateDetailsAfterAddingBay from "./utils/update-details-after-adding-bay";
import updateDLO from "./utils/update-dlo";
import createContainer from "./utils/create-container";

ADD_BAY.getSelectedItems = ({
    container: {
        id,
    },
    first,
}) => ({
    containers: {
        [id]: container,
    },
}) => container.getImmediateContainersByDirection(false, first);


export default function ADD_BAY({
    elevationInput,
}, {
    container,
    container: {
        daylightOpening: DLO,
        elevation: {
            sightline,
            roughOpening,
        },
    },
    distance,
    first,
}) {

    const selectedFrame = first ?
        container.leftFrame
        :
        container.rightFrame;

    const selectedContainers = first ?
        selectedFrame.firstContainers
        :
        selectedFrame.secondContainers;

    const elevationWithUpdatedDLO = selectedContainers.reduce((updatedElevation, container) => (
        updateDLO(updatedElevation, {
            container,
            distance: distance + sightline
        })
    ), arguments[0]);

    const newDLO = {
        x: distance,
        y: roughOpening.y - (sightline * 2),
    };

    const elevationWithAddedContainer = createContainer(elevationWithUpdatedDLO, { daylightOpening: newDLO });

    return updateDetailsAfterAddingBay(elevationWithAddedContainer, {
        _frame: selectedFrame,
    });
}
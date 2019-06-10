import ComparablePlacement from "./utils/comparable-placement";
import updateDLO from "./utils/update-dlo";
import createContainer from "./utils/create-container";
import updateDetailsAfterAddingFrame from "./utils/update-details-after-adding-frame";

export default function ADD_FRAME({
    elevationInput,
}, {
    container,
    container: {
        daylightOpening: DLO,
        elevation: {
            sightline,
        },
    },
    vertical,
    distance,
}) {

    const elevationWithUpdatedDLO = updateDLO( arguments[0], {
        container,
        vertical: !vertical,
        distance: distance + sightline
    });

    const newDLO = {
        x: vertical ?
            distance
            :
            DLO.x,
        y: vertical ?
            DLO.y
            :
            distance,
    }

    const elevationWithAddedContainer = createContainer( elevationWithUpdatedDLO, {daylightOpening: newDLO});

    return updateDetailsAfterAddingFrame(elevationWithAddedContainer, arguments[1]);


    // split dlo

    // 
}

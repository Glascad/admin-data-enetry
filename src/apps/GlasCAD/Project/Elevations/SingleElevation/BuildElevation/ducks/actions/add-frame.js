import updateDLO from './utils/update-dlo';
import createContainer from './utils/create-container';
import updateDetailsAfterAddingFrame from './utils/update-details-after-adding-frame';

ADD_FRAME.getSelectedItems = ({
    container: {
        id,
    },
    vertical,
    distance,
}) => ({
    containers: {
        [id]: container,
    },
}) => ([
    container.getFrameByDirection(!vertical, false),
]);

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

    const correctedDistance = distance || (
        (DLO[vertical ? 'x' : 'y'] - sightline) / 2
    );

    const elevationWithUpdatedDLO = updateDLO(arguments[0], {
        container,
        vertical: !vertical,
        distance: correctedDistance + sightline
    });

    const newDLO = {
        x: vertical ?
            correctedDistance
            :
            DLO.x,
        y: vertical ?
            DLO.y
            :
            correctedDistance,
    };

    const elevationWithAddedContainer = createContainer(elevationWithUpdatedDLO, { daylightOpening: newDLO });

    return updateDetailsAfterAddingFrame(elevationWithAddedContainer, {
        ...arguments[1],
        distance: correctedDistance,
    });
}

import duplicateDetail from './duplicate-detail';
import redirectDetail from './redirect-detail';
import deleteDetail from './delete-detail';
import ComparablePlacement from "./comparable-placement";
import { GET_RELATIVE_DIRECTIONS } from '../../../../utils/recursive-elevation/directions';

export default function updateDetailsAfterMovingFrame({
    elevationInput,
    elevationInput: {
        containers: {
            length,
        },
        containers,
    },
}, {
    container: oldContainer,
    container: {
        elevation: {
            sightline,
        },
        placement,
        daylightOpening,
    },
    vertical,
    distance,
}) {
    const newContainer = containers[length - 1];

    const detailsToRedirect = oldContainer.getDetailsByDirection(!vertical, false);

    const elevationWithRedirectedDetails = detailsToRedirect.reduce((updatedElevation, detail) => redirectDetail(updatedElevation, { detail, oldContainer, newContainer }), arguments[0]);

    const newPlacement = {
        x: vertical ?
            placement.x + daylightOpening.x - distance - sightline
            :
            placement.x,
        y: vertical ?
            placement.y
            :
            placement.y + daylightOpening.y - distance - sightline,
        height: placement.height,
        width: placement.width,
    };

    const newFramePlacement = new ComparablePlacement(newPlacement, vertical);

    return [true, false]
        .reduce((outerNewElevation, first) => {

            const details = oldContainer.getDetailsByDirection(vertical, first);

            return details
                .reduce((newElevation, detail, i) => {
                    const detailPlacement = new ComparablePlacement(detail.placement, vertical);

                    if (detailPlacement.outer.isCloserThan(newFramePlacement.inner)) {
                        return newElevation;
                    }

                    if (
                        detailPlacement.inner.isCloserThan(newFramePlacement.inner)
                        &&
                        detailPlacement.outer.isFartherThan(newFramePlacement.outer)
                    ) {
                        return duplicateDetail(newElevation, { detail, oldContainer, newContainer });
                    }

                    return redirectDetail(newElevation, { detail, oldContainer, newContainer });

                }, outerNewElevation);
        }, elevationWithRedirectedDetails);
}

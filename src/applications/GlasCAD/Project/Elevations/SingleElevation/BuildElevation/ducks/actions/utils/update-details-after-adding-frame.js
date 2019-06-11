import duplicateDetail from './duplicate-detail';
import redirectDetail from './redirect-detail';
import createDetail from './create-detail';
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
    console.log("UPDATING DETAILS AFTER ADDING FRAME");

    const newContainer = containers[length - 1];

    const elevationWithCreatedDetail = createDetail(arguments[0], {
        vertical,
        firstContainer: oldContainer,
        secondContainer: newContainer,
    });

    const detailsToRedirect = oldContainer.getDetailsByDirection(!vertical, false);

    const elevationWithRedirectedDetails = detailsToRedirect.reduce((updatedElevation, detail) => redirectDetail(updatedElevation, {
        n: console.log(`-----------\nredirecting detail: ${detail.id} ${detail.vertical ? 'vertical' : 'horizontal'} ${detail.firstContainerId}-${detail.secondContainerId}`),
        detail,
        oldContainer,
        newContainer,
    }), elevationWithCreatedDetail);

    const framePlacement = {
        x: vertical ?
            placement.x + daylightOpening.x - distance - sightline
            :
            placement.x,
        y: vertical ?
            placement.y
            :
            placement.y + daylightOpening.y - distance - sightline,
        height: vertical ?
            placement.height
            :
            sightline,
        width: vertical ?
            sightline
            :
            placement.width,
    };

    const comparableFramePlacement = new ComparablePlacement(framePlacement, vertical);

    console.log("-----------");
    console.log({ comparableFramePlacement, framePlacement });

    return [true, false]
        .reduce((outerNewElevation, first) => {

            const details = oldContainer.getDetailsByDirection(vertical, first);

            return details
                .reduce((newElevation, detail, i) => {
                    const detailPlacement = new ComparablePlacement(detail.placement, vertical);

                    console.log("-----------");

                    console.log(`Checking Detail: ${detail.id} ${detail.vertical ? 'vertical' : 'horizontal'}, ${detail.firstContainerId}-${detail.secondContainerId}`);

                    console.log({ detailPlacement, placement: detail.placement });

                    // do nothing
                    if (detailPlacement.outer.isCloserThan(comparableFramePlacement.inner)) {
                        console.log(`doing nothing`);
                        return newElevation;
                    }

                    // duplicate detail
                    if (
                        detailPlacement.outer.isFartherThan(comparableFramePlacement.outer)
                        &&
                        detailPlacement.inner.isCloserThan(comparableFramePlacement.inner)
                    ) {
                        console.log(`duplicating`);
                        return duplicateDetail(newElevation, { detail, oldContainer, newContainer });
                    }

                    // redirect detail
                    console.log(`redirecting`);
                    return redirectDetail(newElevation, { detail, oldContainer, newContainer });

                }, outerNewElevation);
        }, elevationWithRedirectedDetails);
}

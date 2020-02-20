import { DIRECTIONS, replace } from "../../../../../../../../utils";
import ADD_FRAME from "./add-frame";
import DELETE_CONTAINER from "./delete-container";

ALTER_ROUGH_OPENING.getSelectedItems = ({
    first,
    container: {
        id: containerId,
    },
}) => ({
    containers: {
        [containerId]: container,
    },
}, refId) => (
            refId.match(/Container/i) ?
                first ?
                    container.topContainers
                    :
                    [container]
                :
                [container.getFrameByDirection(...DIRECTIONS.UP)]
        );

export default function ALTER_ROUGH_OPENING({
    elevationInput,
}, {
    container,
    container: {
        id: containerId,
        rawContainer,
        daylightOpening: {
            dimensions: {
                height,
            },
        },
    },
    distance,
    first,
}) {

    // console.log(arguments);

    const _frame = container.getFrameByDirection(true, first);

    // delete container (set customRoughOpening to true) if step distance is equal to container.dlo.height + container.topFrame.sightline
    if (height + _frame.sightline <= Math.abs(distance)) {
        return DELETE_CONTAINER(arguments[0], { container });
    } else {

        const distanceToAddFrame = first ?
            height - distance
            :
            distance - _frame.sightline;

        if (!container.canAddIntermediateByVerticalAndDistance(false, distanceToAddFrame)) return arguments[0];

        // otherwise add frame, and then set customRoughOpening on new container to true
        else {
            const {
                elevationInput: elevationWithAddedFrame,
                elevationInput: {
                    containers = [],
                    containers: {
                        length,
                    },
                },
            } = ADD_FRAME(arguments[0], {
                container,
                vertical: false,
                distance: distanceToAddFrame,
            });

            if (first) {
                // on raise curb, delete the already existing container

                const previouslyUpdatedContainer = containers.find(({ id }) => id === containerId);

                const deletedContainer = {
                    ...previouslyUpdatedContainer,
                    customRoughOpening: true,
                };

                return {
                    elevationInput: {
                        ...elevationWithAddedFrame,
                        containers: replace(containers,
                            containers.indexOf(previouslyUpdatedContainer),
                            deletedContainer,
                        ),
                    },
                };
            } else {
                // on step head, delete the new container from add-frame
                return {
                    elevationInput: {
                        ...elevationWithAddedFrame,
                        containers: replace(containers, length - 1, {
                            ...containers[length - 1],
                            customRoughOpening: true,
                        }),
                    },
                };
            }
        }
    }
}

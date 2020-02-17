import { DIRECTIONS, GET_RELATIVE_DIRECTIONS, replace } from "../../../../../../../../utils";
import MERGE_CONTAINERS from './merge-containers';
import updateDLO from "./utils/update-dlo";
import CONTENT_TYPES from "../../../../../../../../utils/objects/content_types";

const {
    UP,
    DOWN,
    RIGHT,
    LEFT,
} = DIRECTIONS

DELETE_CONTAINER.getSelectedItems = ({ }) => ({ }) => ([]);

export default function DELETE_CONTAINER({
    elevationInput,
}, {
    container,
    container: {
        rawContainer,
        rawContainer: {
            id: containerId,
        },
    },
}) {

    const allDirection = [UP, DOWN, RIGHT, LEFT];
    // Expand containers DLO to account for non existent details. 
    // Merge available in any direction will be merged
    const mergeDirection = allDirection
        .find(direction => {
            const [otherContainer] = container.getImmediateContainersByDirection(...direction);
            return (
                otherContainer
                &&
                otherContainer.contents !== CONTENT_TYPES.GLASS
                &&
                container.canMergeByDirection(...direction, true)
            );
        });

    // The container will adjust SL for any place that needs to Override SL
    const elevationWithUpdatedDeletedDLO = allDirection.reduce((elevationWithUpdatedDeletedDLO, direction) => {

        console.log({
            container,
            direction,
            canOverrideSightlineByDirection: container.canOverrideSightlineByDirection(...direction)
        })

        return container.canOverrideSightlineByDirection(...direction) ?
            updateDLO({ elevationInput: elevationWithUpdatedDeletedDLO }, {
                container,
                vertical: direction[0],
                distance: -container.getFrameByDirection(...direction).placement[direction[0] ? 'height' : 'width']
            }).elevationInput
            :
            elevationWithUpdatedDeletedDLO
    }, elevationInput);



    if (mergeDirection) {
        return MERGE_CONTAINERS({ elevationInput: elevationWithUpdatedDeletedDLO }, {
            container: container.getImmediateContainersByDirection(...mergeDirection)[0],
            direction: GET_RELATIVE_DIRECTIONS(mergeDirection).BACKWARD,
            allowCustomRoughOpenings: true,
        });
    }

    const {
        containers = [],
    } = elevationWithUpdatedDeletedDLO;

    const previouslyUpdatedContainer = containers.find(({ id }) => id === containerId);

    const deletedContainer = {
        ...rawContainer,
        ...previouslyUpdatedContainer,
        contents: container.getNewContentsType(),
    };

    return {
        elevationInput: {
            ...elevationWithUpdatedDeletedDLO,
            containers: previouslyUpdatedContainer ?
                replace(containers,
                    containers.indexOf(previouslyUpdatedContainer),
                    deletedContainer,
                )
                :
                containers.concat(deletedContainer)
        },
    };
}

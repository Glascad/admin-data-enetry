import { DIRECTIONS, GET_RELATIVE_DIRECTIONS } from "../../../utils/recursive-elevation/directions";
import MERGE_CONTAINERS from './merge-containers';

export default function DELETE_CONTAINER({
    elevation: elevationInput,
    elevation: {
        containers = [],
    },
}, {
    container,
    container: {
        rawContainer,
        rawContainer: {
            id: containerId,
            fakeId: containerFakeId,
        },
    },
}) {

    const mergeDirection = Object.values(DIRECTIONS)
        .find(direction => {
            const [otherContainer] = container.getImmediateContainersByDirection(...direction);
            return (
                otherContainer
                &&
                otherContainer.customRoughOpening
                &&
                container.canMergeByDirection(...direction, true)
            );
        });

    if (mergeDirection) {
        return MERGE_CONTAINERS(arguments[0], {
            container: container.getImmediateContainersByDirection(...mergeDirection)[0],
            direction: GET_RELATIVE_DIRECTIONS(mergeDirection).BACKWARD,
            allowCustomRoughOpenings: true,
        });
    }

    const previouslyUpdatedContainer = containers.find(({ id, fakeId }) => (id || fakeId) === (containerId || containerFakeId));

    const deletedContainer = {
        ...rawContainer,
        ...previouslyUpdatedContainer,
        customRoughOpening: true,
    };

    return {
        elevation: {
            ...elevationInput,
            containers: previouslyUpdatedContainer ?
                containers.replace(
                    containers.indexOf(previouslyUpdatedContainer),
                    deletedContainer,
                )
                :
                containers.concat(deletedContainer)
        },
    };
}

import RecursiveElevation from "../../utils/recursive-elevation/elevation";
import validateElevation from "./validate-elevation";
import _ from 'lodash';

function mergeElevationInput(
    rawElevation = {},
    elevationInput = {},
) {
    const {
        roughOpening: {
            x,
            y,
        } = {},
        finishedFloorHeight,
        _containerDetails = [],
        _elevationContainers = [],
        sightline = 10,
    } = rawElevation;

    const {
        containers = [],
        details = [],
        detailIdsToDelete = [],
        containerIdsToDelete = [],
    } = elevationInput;

    const [containersToUpdate, containersToAdd] = _.partition(containers, ({ id }) => id > 0);
    const [detailsToUpdate, detailsToAdd] = _.partition(details, ({ id }) => id > 0);

    return {
        ...rawElevation,
        _elevationContainers: _elevationContainers
            .filter(({ id }) => !containerIdsToDelete.includes(id))
            .map(container => {
                const update = containersToUpdate.find(({ id }) => id === container.id);
                return update ?
                    {
                        ...container,
                        ...update,
                        daylightOpening: {
                            ...container.daylightOpening,
                            ...update.daylightOpening,
                        },
                        __typename: "UPDATED_CONTAINER",
                    }
                    :
                    container;
            })
            .concat(containersToAdd),
        _containerDetails: _containerDetails
            .filter(({ id }) => !detailIdsToDelete.includes(id))
            .map(detail => {
                const update = detailsToUpdate.find(({ id }) => id === detail.id);
                return update ?
                    {
                        ...detail,
                        ...update,
                        __typename: "UPDATED_DETAIL",
                    }
                    :
                    detail;
            })
            .concat(detailsToAdd),
    };
}


export default function ({
    elevationInput
}, {
    _elevation: rawElevation,
    _system,
} = {}) {

    const mergedElevation = mergeElevationInput(rawElevation, elevationInput);

    validateElevation(mergedElevation);

    const recursiveElevation = new RecursiveElevation(mergedElevation, _system);

    return {
        elevationInput,
        rawElevation,
        mergedElevation,
        recursiveElevation,
    };
}

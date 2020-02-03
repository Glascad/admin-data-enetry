import RecursiveElevation from "../../utils/recursive-elevation/elevation";
import _ from 'lodash';
import validateElevation from "./validate-elevation";

function mergeElevationInput(
    rawElevation = {},
    elevationInput = {},
) {
    const {
        roughOpening: {
            width,
            height,
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

var timeout = 0;

export default function ({
    elevationInput
}, {
    _elevation: rawElevation,
    _system,
} = {}) {

    // console.log("MERGING INPUT");

    const mergedElevation = mergeElevationInput(rawElevation, elevationInput);

    const recursiveElevation = new RecursiveElevation(mergedElevation, _system);

    clearTimeout(timeout);

    timeout = setTimeout(() => {
        try {
            validateElevation(mergedElevation)
        } catch (err) {
            console.error(err);
        }
    }, 100);

    return {
        elevationInput,
        rawElevation,
        mergedElevation,
        recursiveElevation,
    };
}

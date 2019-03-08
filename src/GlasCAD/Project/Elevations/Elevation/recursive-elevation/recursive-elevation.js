
import RecursiveContainer from './recursive-container';
import RecursiveDetail from './recursive-detail';

export default class RecursiveElevation {
    constructor({
        finishedFloorHeight = 0,
        roughOpening = {},
        _elevationContainers = [],
        _containerDetails = [],
        sightline = 10,
    } = {}) {

        // mark fake ids with underscores
        const containers = _elevationContainers
            .map(c => ({
                ...c,
                id: c.id || `_${c.fakeId}`,
            }));

        const details = _containerDetails
            .map(d => ({
                ...d,
                id: d.id || `_${d.fakeId}`,
                firstContainerId: d.firstContainerId || `_${d.firstContainerFakeId}`,
                secondContainerId: d.secondContainerId || `_${d.secondContainerFakeId}`,
            }));

        const detailsById = details
            .reduce((byId, detail) => ({
                ...byId,
                [detail.id]: detail,
            }), {});

        const containersById = containers
            .reduce((byId, container) => ({
                ...byId,
                [container.id]: container,
            }), {});

        Object.assign(
            this,
            {
                finishedFloorHeight,
                roughOpening,
                containers,
                sightline,
                detailIds: Object.keys(detailsById),
                containerIds: Object.keys(containersById),
                details: Object.entries(detailsById)
                    .reduce((all, [id, detail]) => ({
                        ...all,
                        [id]: new RecursiveDetail(detail, this),
                    }), {}),
                containers: Object.entries(containersById)
                    .reduce((all, [id, container]) => ({
                        ...all,
                        [id]: new RecursiveContainer(container, this),
                    }), {}),
            },
        );

        const [originalContainerId] = Object.entries(containersById)
            .find(([_, { original }]) => original) || [];

        this.originalContainer = this.containers[originalContainerId];

        window.temp1 = this;
    }

    get allContainers() { return this.containerIds.map(id => this.containers[id]); }
    get allDetails() { return this.detailIds.map(id => this.details[id]); }

    get containerRefs() { return this.allContainers.map(({ ref }) => ref); }
    get detailRefs() { return this.allDetails.map(({ ref }) => ref); }

    get placedContainers() { return this.allContainers.map(({ placement }) => placement); }
    get placedDetails() { return this.allDetails.map(({ placement }) => placement); }

    get joinedFrames() {
        return this.allDetails.reduce((all, detail) => {
            if (all.some(detailSet => detailSet.some(d => d === detail))) return all;
            else {
                console.log("ADDING NEW DETAIL AND FINDING ITS MATCHED DETAILS");
                console.log(detail.ref);
                const newAll = all.concat([detail.allMatchedDetails]);
                console.log("FOUND AND ADDED NEW MATCHED DETAILS");
                console.log(detail.allMatchedDetails.map(({ ref }) => ref));
                return newAll;
            }
        }, []);
    }

    get placedFrames() {

    }
}

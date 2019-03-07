
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
    }

    get containerRefs() { return this.containerIds.map(id => this.containers[id].ref); }
    get detailRefs() { return this.detailIds.map(id => this.details[id].ref); }

    get placedContainers() { return this.containerIds.map(id => this.containers[id].placement); }
    get placedDetails() { return this.detailIds.map(id => this.details[id].placement); }

    get placedFrames() {
        
    }
}

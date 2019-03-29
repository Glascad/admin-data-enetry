
import RecursiveContainer from './container';
import RecursiveDetail from './detail';
import RecursiveFrame from './frame';
import RecursiveDimension from './dimension';

export default class RecursiveElevation {

    static RecursiveContainer = RecursiveContainer;
    static RecursiveDetail = RecursiveDetail;
    static RecursiveFrame = RecursiveFrame;
    static RecursiveDimension = RecursiveDimension;

    constructor(
        rawElevation = {},
        {
            _systemType: {
                _systemTypeDetailTypeConfigurationTypes: detailTypeConfigurationTypes = [],
            } = {},
        } = {},
    ) {

        const {
            finishedFloorHeight = 0,
            roughOpening = {},
            _elevationContainers = [],
            _containerDetails = [],
            sightline = 10,
        } = rawElevation;

        // mark fake ids with underscores
        const containers = _elevationContainers
            .map(c => ({
                ...c,
                id: c.id || `_${c.fakeId}`,
                rawContainer: c,
            }));

        const details = _containerDetails
            .map(d => ({
                ...d,
                id: d.id || `_${d.fakeId}`,
                firstContainerId: d.firstContainerId || `_${d.firstContainerFakeId}`,
                secondContainerId: d.secondContainerId || `_${d.secondContainerFakeId}`,
                rawDetail: d,
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
                rawElevation,
                finishedFloorHeight,
                roughOpening,
                sightline,
                detailTypeConfigurationTypes,
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

    class = RecursiveElevation;

    // LOGIC
    get verticalFramesRunThroughHeadAndSill() { return true; }

    // REFERENCES
    // ALL
    get allContainers() { return this.containerIds.map(id => this.containers[id]); }
    get allDetails() { return this.detailIds.map(id => this.details[id]); }
    get allFrames() {
        return this.allDetails.reduce((all, detail) => {
            if (!all.some(_frame => _frame.contains(detail))) return all
                .concat(new RecursiveFrame(detail.allMatchedDetails, this));
            else return all;
        }, []);
    }

    // REFIDS
    get containerRefIds() { return this.allContainers.map(({ refId }) => refId); }
    get detailRefIds() { return this.allDetails.map(({ refId }) => refId); }
    get frameRefIds() { return this.allFrames.map(({ refId }) => refId); }

    // REFS
    get containerRefs() { return this.allContainers.map(({ ref }) => ref); }
    get detailRefs() { return this.allDetails.map(({ ref }) => ref); }
    get frameRefs() { return this.allFrames.map(({ ref }) => ref); }

    // PLACEMENT
    get placedContainers() { return this.allContainers.map(({ placement }) => placement); }
    get placedDetails() { return this.allDetails.map(({ placement }) => placement); }
    get placedFrames() { return this.allFrames.map(({ placement }) => placement); }

    // DIMENSIONS
    get containerDimensions() {
        return this.allContainers
            .reduce(({
                verticals = [],
                horizontals = [],
            },
                container
            ) => {
                const prevVerticalDimension = verticals.find(dimension => dimension.matchContainer(container));
                const prevHorizontalDimension = horizontals.find(dimension => dimension.matchContainer(container));

                if (prevVerticalDimension) prevVerticalDimension.addContainer(container);
                if (prevHorizontalDimension) prevHorizontalDimension.addContainer(container);

                return {
                    verticals: prevVerticalDimension ?
                        verticals
                        :
                        verticals.concat(new RecursiveDimension(container, this, true)),
                    horizontals: prevHorizontalDimension ?
                        horizontals
                        :
                        horizontals.concat(new RecursiveDimension(container, this, false)),
                };
            }, {});
    }

    // OPTIONS / TYPES
    get detailTypes() { return this.allDetails.map(({ type }) => type); }

    // RETRIEVAL
    getItemByRefId = id => {
        const cb = ({ refId }) => refId === id;
        return this.allContainers.find(cb)
            ||
            this.allFrames.find(cb)
            ||
            this.allDetails.find(cb);
    }

    getDetailByType = type => this.allDetails
        .filter(({ detailType }) => detailType === type);

    getDetailByConfigurationType = configurationType => this.allDetails
        .filter(({ configurationTypes }) => configurationTypes
            .some(({ type }) => type === configurationType));
}

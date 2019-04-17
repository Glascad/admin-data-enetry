
import RecursiveContainer from './container';
import RecursiveDetail from './detail';
import RecursiveFrame from './frame';
import RecursiveDimension from './dimension';

import dimensionsOverlap from './dimensions-overlap';
import sortDimensionTracks from './sort-dimension-tracks';

export default class RecursiveElevation {

    static RecursiveContainer = RecursiveContainer;
    static RecursiveDetail = RecursiveDetail;
    static RecursiveFrame = RecursiveFrame;
    static RecursiveDimension = RecursiveDimension;

    static instanceCount = 0;

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
            minimumDaylightOpening = 5,
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
                class: RecursiveElevation,
                instanceCount: ++RecursiveElevation.instanceCount,
                rawElevation,
                finishedFloorHeight,
                roughOpening,
                sightline,
                minimumDaylightOpening,
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

    // LOGIC
    get verticalFramesRunThroughHeadAndSill() { return true; }

    // REFERENCES
    // ALL
    get allContainers() { return this.containerIds.map(id => this.containers[id]); }
    get allDetails() { return this.detailIds.map(id => this.details[id]); }
    get allFrames() {
        return this.__allFrames || (
            this.__allFrames = this.allDetails.reduce((all, detail) => (
                detail.exists
                &&
                !all.some(_frame => _frame.contains(detail))
            ) ?
                all.concat(new RecursiveFrame(detail.allMatchedDetails, this, detail))
                :
                all,
                [])
        );
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
        return this.__containerDimensions || (
            this.__containerDimensions = console.log("Calculating Container Dimensions") || this.allContainers
                .reduce(({
                    true: verticals,
                    false: horizontals,
                },
                    container
                ) => {
                    const prevVerticalDimension = verticals.find(dimension => dimension.matchContainer(container));
                    const prevHorizontalDimension = horizontals.find(dimension => dimension.matchContainer(container));

                    if (prevVerticalDimension) prevVerticalDimension.addContainer(container);
                    if (prevHorizontalDimension) prevHorizontalDimension.addContainer(container);

                    return {
                        true: prevVerticalDimension ?
                            verticals
                            :
                            verticals.concat(new RecursiveDimension(container, this, true)),
                        false: prevHorizontalDimension ?
                            horizontals
                            :
                            horizontals.concat(new RecursiveDimension(container, this, false)),
                    };
                }, {
                        true: [],
                        false: [],
                    })
        );
    }

    getContainerDimensionTracksByVertical(vertical) {
        return this.containerDimensions[vertical]
            .reduce((tracks, dimension) => {
                const correctTrack = tracks
                    .find(track => track.
                        every(otherDimension => !dimensionsOverlap(dimension, otherDimension)));

                return correctTrack ?
                    tracks.replace(
                        tracks.indexOf(correctTrack),
                        correctTrack.concat(dimension),
                    )
                    :
                    tracks.concat([[dimension]]);
            }, [])
            .sort(sortDimensionTracks);
    }

    get verticalContainerDimensionTracks() { return this.getContainerDimensionTracksByVertical(true); }
    get horizontalContainerDimensionTracks() { return this.getContainerDimensionTracksByVertical(false); }

    // OPTIONS / TYPES
    get detailTypes() { return this.allDetails.map(({ type }) => type); }

    // RETRIEVAL
    getItemByRefId = (refId = "") => {
        // ignore instance count
        const cb = item => item.refId.replace(/<.*$/, '') === refId.replace(/<.*$/, '');
        return (
            this.allContainers.find(cb)
            ||
            this.allFrames.find(cb)
            ||
            this.allDetails.find(cb)
        );
    }

    getDetailByType = type => this.allDetails
        .filter(({ detailType }) => detailType === type);

    getDetailByConfigurationType = configurationType => this.allDetails
        .filter(({ configurationTypes }) => configurationTypes
            .some(({ type }) => type === configurationType));
}

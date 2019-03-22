
import RecursiveContainer from './container';
import RecursiveDetail from './detail';
import RecursiveFrame from './frame';

export default class RecursiveElevation {

    static RecursiveContainer = RecursiveContainer;
    static RecursiveDetail = RecursiveDetail;
    static RecursiveFrame = RecursiveFrame;

    constructor({
        finishedFloorHeight = 0,
        roughOpening = {},
        _elevationContainers = [],
        _containerDetails = [],
        sightline = 10,
    } = {}, {
        _systemType: {
            _systemTypeDetailTypeConfigurationTypes: detailTypeConfigurationTypes = [],
        } = {},
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

    get verticalFramesRunThroughHeadAndSill() { return true; }

    get allContainers() { return this.containerIds.map(id => this.containers[id]); }
    get allDetails() { return this.detailIds.map(id => this.details[id]); }
    get allFrames() {
        return this.allDetails.reduce((all, detail) => {
            if (!all.some(_frame => _frame.contains(detail))) return all
                .concat(new RecursiveFrame(detail.allMatchedDetails, this));
            else return all;
        }, []);
    }

    get containerRefIds() { return this.allContainers.map(({ refId }) => refId); }
    get detailRefIds() { return this.allDetails.map(({ refId }) => refId); }
    get frameRefIds() { return this.allFrames.map(({ refId }) => refId); }

    get containerRefs() { return this.allContainers.map(({ ref }) => ref); }
    get detailRefs() { return this.allDetails.map(({ ref }) => ref); }
    get frameRefs() { return this.allFrames.map(({ ref }) => ref); }

    get placedContainers() { return this.allContainers.map(({ placement }) => placement); }
    get placedDetails() { return this.allDetails.map(({ placement }) => placement); }
    get placedFrames() { return this.allFrames.map(({ placement }) => placement); }

    get containerDimensions() {
        return this.placedContainers
            .reduce(({
                verticals = [],
                horizontals = [],
            }, {
                x,
                y,
                width,
                height,
                refId
            }) => {
                const prevVerticalDimension = verticals.find(dimension => dimension.y === y && dimension.height === height);
                const prevHorizontalDimension = horizontals.find(dimension => dimension.x === x && dimension.width === width);

                const prevVerticalDimensionIndex = verticals.indexOf(prevVerticalDimension);
                const prevHorizontalDimensionIndex = horizontals.indexOf(prevHorizontalDimension);

                return {
                    verticals: prevVerticalDimension ?
                        verticals.replace(prevVerticalDimensionIndex, {
                            ...prevVerticalDimension,
                            horizontalPrecedence: (
                                prevVerticalDimension.horizontalPrecedence
                                * prevVerticalDimension.refIds.length
                                + x
                            ) / (
                                    prevVerticalDimension.refIds.length
                                    + 1
                                ),
                            refIds: prevVerticalDimension.refIds.concat(refId),
                        })
                        :
                        verticals.concat({
                            horizontalPrecedence: x,
                            y,
                            height,
                            refIds: [refId],
                        }),
                    horizontals: prevHorizontalDimension ?
                        horizontals.replace(prevHorizontalDimensionIndex, {
                            ...prevHorizontalDimension,
                            verticalPrecedence: (
                                prevHorizontalDimension.verticalPrecedence
                                * prevHorizontalDimension.refIds.length
                                + y
                            ) / (
                                    prevHorizontalDimension.refIds.length
                                    + 1
                                ),
                            refIds: prevHorizontalDimension.refIds.concat(refId),
                        })
                        :
                        horizontals.concat({
                            verticalPrecedence: y,
                            x,
                            width,
                            refIds: [refId],
                        }),
                };
            }, {});
    }

    get detailTypes() { return this.allDetails.map(({ type }) => type); }

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

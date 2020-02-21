import { DIRECTIONS, Loggable, replace } from '../../../../../../../utils';
import RecursiveContainer from './container';
import RecursiveDetail from './detail';
import RecursiveDimension from './dimension';
import dimensionsOverlap from './dimensions-overlap';
import RecursiveFrame from './frame';
import sortDimensionTracks from './sort-dimension-tracks';
import CONTENT_TYPES from '../../../../../../../utils/objects/content_types';

const {
    UP,
    DOWN,
    LEFT,
    RIGHT,
} = DIRECTIONS;

/**
 * CALCULATION ORDER
 * 
 * Add pointers (create linked network)
 * vvv
 * Generate Frames (merge details)
 * vvv
 * Calculate Container placement (based on Frame sightline)
 * vvv
 * Calculate Frame & Detail placement (based on Container placement)
 */

const dimensionTracksKey = 'dimensions<vertical>';

export default class RecursiveElevation extends Loggable {

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

        super();

        const {
            _systemSet = {},
            finishedFloorHeight = 0,
            roughOpening = {},
            _elevationContainers = [],
            _containerDetails = [],
            _systemSet: {
                _system: {
                    sightline = 2,
                } = {},
            } = {},
            minimumDaylightOpening = 5,
        } = rawElevation;

        // mark fake ids with underscores
        const containers = _elevationContainers
            .map(c => ({
                ...c,
                rawContainer: c,
            }));

        const details = _containerDetails
            .map(d => ({
                ...d,
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
                systemSet: _systemSet,
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
                [dimensionTracksKey]: {
                    true: undefined,
                    false: undefined,
                },
            },
        );

        const [originalContainerId] = Object.entries(containersById)
            .find(([_, { original }]) => original) || [];

        this.originalContainer = this.containers[originalContainerId];

        window.temp1 = this;
    }

    // LOGIC
    // REFERENCES
    // ALL
    get allContainers() { return this.containerIds.map(id => this.containers[id]); }
    get allDetails() { return this.detailIds.map(id => this.details[id]); }
    get allFrames() {
        return this.__allFrames || (
            this.__allFrames = this.allDetails.reduce((all, detail) => (
                !all.some(_frame => _frame.contains(detail)) && detail.exists
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

    getPrecedenceByVertical = vertical => {
        const {
            roughOpening: {
                height,
                width,
            },
        } = this;

        return vertical ?
            width / 2
            :
            height / 2;
    }

    get precedence() {
        return {
            true: this.getPrecedenceByVertical(true),
            false: this.getPrecedenceByVertical(false),
        };
    }

    getDimensionsByVertical = vertical => {
        return this.allContainers
            .reduce((dimensions, container) => {

                if (container.contents !== CONTENT_TYPES.GLASS) return dimensions;
                else {
                    const prevDimension = dimensions.find(dimension => dimension.matchContainer(container));

                    if (prevDimension) {
                        prevDimension.addContainer(container);
                        return dimensions;
                    } else {
                        return dimensions.concat(new RecursiveDimension(container, this, vertical));
                    }
                }
            }, []);
    }

    getDimensionTracksByVertical = vertical => {
        return this[dimensionTracksKey][vertical] || (
            this[dimensionTracksKey][vertical] = this.getDimensionsByVertical(vertical)
                .reduce(({ true: first, false: second }, dimension) => {

                    const { precedence: elevationPrecedence } = this;

                    const { precedence } = dimension;

                    const belongsFirst = precedence <= elevationPrecedence[vertical];

                    return {
                        true: belongsFirst ?
                            first.concat(dimension)
                            :
                            first,
                        false: belongsFirst ?
                            second
                            :
                            second.concat(dimension),
                    };

                }, {
                    true: [],
                    false: [],
                })
        );
    }

    get dimensions() {
        return {
            true: this.getDimensionTracksByVertical(true),
            false: this.getDimensionTracksByVertical(false),
        };
    }

    getDimensionTracksByDirection = (vertical, first) => {
        return this.dimensions[!vertical][first]
            .reduce((tracks, dimension) => {
                const correctTrack = tracks
                    .find(track => track.
                        every(otherDimension => !dimensionsOverlap(dimension, otherDimension)));

                return correctTrack ?
                    replace(tracks,
                        tracks.indexOf(correctTrack),
                        correctTrack.concat(dimension),
                    )
                    :
                    tracks.concat([[dimension]]);
            }, [])
            .sort(sortDimensionTracks);
    }

    get leftDimensionTracks() { return this.getDimensionTracksByDirection(...LEFT).concat([[this.leftRoughOpeningDimension]]); }
    get rightDimensionTracks() { return this.getDimensionTracksByDirection(...RIGHT); }
    get topDimensionTracks() { return this.getDimensionTracksByDirection(...UP); }
    get bottomDimensionTracks() { return this.getDimensionTracksByDirection(...DOWN).concat([[this.bottomRoughOpeningDimension]]); }

    get leftRoughOpeningDimension() {
        return this.__leftRoughOpeningDimension || (
            this.__leftRoughOpeningDimension = new RecursiveDimension(null, this, true)
        );
    }

    get bottomRoughOpeningDimension() {
        return this.__bottomRoughOpeningDimension || (
            this.__bottomRoughOpeningDimension = new RecursiveDimension(null, this, false)
        );
    }

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

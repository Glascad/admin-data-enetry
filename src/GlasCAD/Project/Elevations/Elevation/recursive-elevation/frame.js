
const containersKey = 'containers[first]';

export default class RecursiveFrame {
    constructor(matchedDetails, elevation) {

        const details = matchedDetails.reduce((byId, detail) => ({
            ...byId,
            [detail.id]: detail,
        }), {});

        const [{ vertical }] = matchedDetails;

        Object.assign(
            this,
            {
                elevation,
                detailIds: Object.keys(details),
                matchedDetails,
                details,
                vertical,
                [containersKey]: {
                    true: undefined,
                    false: undefined,
                },
            },
        );
    }

    contains = detail => this.matchedDetails.includes(detail);

    _getContainers = first => this[containersKey][first] || (
        this[containersKey][first] = this.details.map(detail => detail._getContainer(first))
    );

    get sightline() {
        return this.__sightline || (
            // add sightline calculation here based on detail option values
            this.__sightline = this.elevation.sightline
        );
    }

    get placement() {
        return {};
    }
}

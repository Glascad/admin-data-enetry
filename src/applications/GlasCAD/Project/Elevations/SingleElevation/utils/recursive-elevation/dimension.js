
export default class RecursiveDimension {

    constructor(placedContainer, elevation, vertical) {

        const {
            refId,
            x,
            y,
            height,
            width,
        } = placedContainer;

        const offset = vertical ?
            y
            :
            x;

        const dimension = vertical ?
            height
            :
            width;

        const precedence = vertical ?
            x
            :
            y;

        const refIds = [refId];

        Object.assign(
            this,
            {
                placedContainer,
                elevation,
                vertical,
                dimension,
                offset,
                precedence,
                refIds,
            },
        );
    }

    matchContainer = ({
        x,
        y,
        height,
        width,
    }) => {
        const {
            vertical,
            dimension,
            offset,
        } = this;

        return vertical ? (
            y === offset
            &&
            height === dimension
        ) : (
                x === offset
                &&
                width === dimension
            );
    }

    addContainer = ({
        x,
        y,
        refId,
    }) => {

        const {
            vertical,
            precedence,
            refIds: {
                length,
            },
        } = this;

        const newContainerPrecedence = vertical ?
            x
            :
            y;

        this.precedence = (precedence * length + newContainerPrecedence) / (length + 1);

        this.refIds.push(refId);

        return this;
    }

    get refId() { return `DimensionButton${this.refIds.join().replace(/\D+/g, '-')}`; }

}

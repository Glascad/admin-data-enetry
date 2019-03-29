
export default class RecursiveDimension {

    constructor(container, elevation, vertical) {

        const {
            refId,
            placement: {
                x,
                y,
                height,
                width,
            },
        } = container;

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

        const containers = [container];
        const refIds = [refId];

        Object.assign(
            this,
            {
                containers,
                elevation,
                vertical,
                dimension,
                offset,
                precedence,
                refIds,
            },
        );
    }

    class = RecursiveDimension;

    get refId() { return `Dimension${this.refIds.join().replace(/\D+/g, '-')}`; }

    matchContainer = ({
        placement: {
            x,
            y,
            height,
            width,
        },
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

    addContainer = container => {

        const {
            refId,
            placement: {
                x,
                y,
            },
        } = container;

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

        this.containers.push(container);
        this.refIds.push(refId);

        return this;
    }
}


export default class RecursiveDimension {

    static instanceCount = 0;

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
            x + (width / 2)
            :
            y + (height / 2);

        const containers = [container];
        const refIds = [refId];

        Object.assign(
            this,
            {
                class: RecursiveDimension,
                instanceCount: ++RecursiveDimension.instanceCount,
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

    get refId() { return `Dimension${this.refIds.join().replace(/\D+/g, '-')}<${this.instanceCount}>`; }

    get ref() { return document.getElementById(this.refId); }

    registerReactComponent = ReactComponent => this.__ReactComponent = ReactComponent;

    get ReactComponent() { return this.__ReactComponent; }

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
                height,
                width,
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
            x + (width / 2)
            :
            y + (height / 2);

        this.precedence = ((precedence * length) + newContainerPrecedence) / (length + 1);

        this.containers.push(container);

        this.refIds.push(refId);

        return this;
    }
}

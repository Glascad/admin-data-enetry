import RecursiveContainer from "./container";
import RecursiveElevation from "./elevation";
import { Loggable } from "../../../../../../../utils";
import CONTENT_TYPES from "../../../../../../../utils/objects/content_types";

const getValuesFromItem = item => {
    if (item instanceof RecursiveContainer) {
        const {
            id,
            refId,
            placement: {
                x,
                y,
                height,
                width,
            },
            contents,
        } = item;
        return {
            ids: [id],
            refIds: [refId],
            containers: [item],
            isRoughOpening: contents !== CONTENT_TYPES.GLASS,
            x,
            y,
            height,
            width,
        };
    }
    if (item instanceof RecursiveElevation) {
        const {
            roughOpening: {
                width,
                height,
            },
        } = item;
        return {
            ids: [],
            refIds: [],
            containers: [],
            isRoughOpening: true,
            x: 0,
            y: 0,
            height,
            width,
        };
    }
}

export default class RecursiveDimension extends Loggable {

    static instanceCount = 0;

    constructor(item, elevation, vertical) {

        super();

        const {
            ids,
            refIds,
            x,
            y,
            height,
            width,
            containers,
            isRoughOpening,
        } = getValuesFromItem(item || elevation);

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

        Object.assign(
            this,
            {
                class: RecursiveDimension,
                instanceCount: ++RecursiveDimension.instanceCount,
                containers,
                isRoughOpening,
                elevation,
                vertical,
                dimension,
                offset,
                precedence,
                refIds,
                ids,
            },
        );
    }

    get refId() { return `Dimension-${this.ids.join('-')}<${this.instanceCount}>`; }

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
        contents,
    }) => {
        const {
            vertical,
            dimension,
            offset,
            isRoughOpening,
        } = this;

        return (!!(contents !== CONTENT_TYPES.GLASS) === !!isRoughOpening) && (
            vertical ? (
                y === offset
                &&
                height === dimension
            ) : (
                    x === offset
                    &&
                    width === dimension
                )
        );
    }

    addContainer = container => {

        const {
            vertical,
            precedence,
            refIds: {
                length,
            },
        } = this;

        const {
            id,
            refId,
            precedence: {
                [vertical]: newContainerPrecedence,
            },
        } = container;

        this.precedence = ((precedence * length) + newContainerPrecedence) / (length + 1);

        this.containers.push(container);

        this.refIds.push(refId);

        this.ids.push(id);

        return this;
    }
}

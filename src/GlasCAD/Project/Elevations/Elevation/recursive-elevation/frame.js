
import { sortContainers } from './utils';

const containersKey = 'containers[first]';

export default class RecursiveFrame {
    constructor(details, elevation) {

        const [{ vertical }] = details;

        Object.assign(
            this,
            {
                elevation,
                details,
                vertical,
                [containersKey]: {
                    true: undefined,
                    false: undefined,
                },
            },
        );
    }

    get refId() { return `Frame-${this.details.map(({ id }) => id).join('-')}`; }

    get ref() { return document.getElementById(this.refId); }

    contains = detail => this.details.includes(detail);

    _getContainersByDirection = first => this[containersKey][first] || (
        this[containersKey][first] = this.details
            .map(detail => detail._getContainer(first))
            .filter(Boolean)
            .sort(sortContainers(!this.vertical))
    );

    _getFirstOrLastContainerByDirection = (first, last) => {
        const containers = this._getContainersByDirection(first);
        return containers[last ?
            containers.length - 1
            :
            0];
    }

    get leftContainers() { if (this.vertical) return this._getContainersByDirection(true); }
    get rightContainers() { if (this.vertical) return this._getContainersByDirection(false); }
    get topContainers() { if (!this.vertical) return this._getContainersByDirection(false); }
    get bottomContainers() { if (!this.vertical) return this._getContainersByDirection(true); }

    get allContainers() {
        return [
            ...this._getContainersByDirection(true),
            ...this._getContainersByDirection(false),
        ];
    }

    get containerRefs() { return this.allContainers.map(({ ref }) => ref); }

    get sightline() {
        return this.__sightline || (
            // add sightline calculation here based on detail option values
            this.__sightline = this.elevation.sightline
        );
    }

    get placement() {
        const {
            refId,
            vertical,
            sightline,
        } = this;

        // farthest to the bottom / left
        const {
            leftContainers,
            leftContainers: [firstLeftContainer] = [],
            leftContainers: {
                length: leftContainersLength = 0,
            } = {},
            rightContainers,
            rightContainers: [firstRightContainer] = [],
            rightContainers: {
                length: rightContainersLength = 0,
            } = {},
            topContainers: [firstTopContainer] = [],
            topContainers: {
                length: topContainersLength = 0,
            } = {},
            bottomContainers: [firstBottomContainer] = [],
            bottomContainers: {
                length: bottomContainersLength = 0,
            } = {},
        } = this;

        // farthest to the top / right
        const {
            leftContainers: {
                [leftContainersLength - 1]: lastLeftContainer = 0,
            } = {},
            rightContainers: {
                [rightContainersLength - 1]: lastRightContainer = 0,
            } = {},
            topContainers: {
                [topContainersLength - 1]: lastTopContainer = 0,
            } = {},
            bottomContainers: {
                [bottomContainersLength - 1]: lastBottomContainer = 0,
            } = {},
        } = this;

        const x = vertical ?
            Math.min(
                firstLeftContainer ?
                    firstLeftContainer.placement.x + firstLeftContainer.placement.width
                    :
                    Infinity,
                firstRightContainer ?
                    firstRightContainer.placement.x - sightline
                    :
                    Infinity
            )
            :
            Math.min(
                firstBottomContainer ?
                    firstBottomContainer.placement.x
                    :
                    Infinity,
                firstTopContainer ?
                    firstTopContainer.placement.x
                    :
                    Infinity
            );

        const y = vertical ?
            Math.min(
                firstLeftContainer ?
                    firstLeftContainer.placement.y
                    :
                    Infinity,
                firstRightContainer ?
                    firstRightContainer.placement.y
                    :
                    Infinity,
            )
            :
            Math.min(
                firstBottomContainer ?
                    firstBottomContainer.placement.y + firstBottomContainer.placement.height
                    :
                    Infinity,
                firstTopContainer ?
                    firstTopContainer.placement.y - sightline
                    :
                    Infinity,
            );

        const height = vertical ?
            Math.max(
                lastLeftContainer ?
                    lastLeftContainer.placement.y + lastLeftContainer.placement.height
                    :
                    0,
                lastRightContainer ?
                    lastRightContainer.placement.y + lastRightContainer.placement.height
                    :
                    0
            ) - y
            :
            sightline;

        const width = vertical ?
            sightline
            :
            Math.max(
                lastBottomContainer ?
                    lastBottomContainer.placement.x + lastBottomContainer.placement.width
                    :
                    0,
                lastTopContainer ?
                    lastTopContainer.placement.x + lastTopContainer.placement.width
                    :
                    0,
            ) - x;

        const onEdgeOfRoughOpening = vertical && (
            !leftContainers.length
            ||
            !rightContainers.length
        );

        const verticalLastContainer = lastLeftContainer || lastRightContainer;
        const verticalFirstContainer = firstLeftContainer || firstRightContainer;

        const needsTopExtension = onEdgeOfRoughOpening
            &&
            !verticalLastContainer.topContainers.length;

        const needsBottomExtension = onEdgeOfRoughOpening
            &&
            !verticalFirstContainer.bottomContainers.length;

        const verticalTopExtension = needsTopExtension ?
            verticalLastContainer.topFrame.sightline
            :
            0;
        const verticalBottomExtension = needsBottomExtension ?
            verticalLastContainer.bottomFrame.sightline
            :
            0;
        
        if (verticalTopExtension) {
            console.log('vvv NEEDS TOP EXTENSION vvv');
            console.log(this.ref);
        }

        if (verticalBottomExtension) {
            console.log('vvv NEEDS BOTTOM EXTENSION vvv');
            console.log(this.ref);
        }

        return {
            refId,
            x,
            y: y - verticalBottomExtension,
            height: height + verticalBottomExtension + verticalTopExtension,
            width,
        };
    }
}

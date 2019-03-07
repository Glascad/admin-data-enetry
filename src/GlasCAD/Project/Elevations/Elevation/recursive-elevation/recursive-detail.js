
export default class RecursiveDetail {
    constructor(detail, elevation) {
        Object.assign(
            this,
            detail,
            {
                elevation,
            },
        );
    }

    get ref() { return document.querySelector(`#Detail-${this.id}`); }

    _getContainer(first) {
        return this.elevation.containers[
            first ?
                this.firstContainerId || this.firstContainerFakeId
                :
                this.secondContainerId || this.secondContainerFakeId
        ];
    }

    get matchedFrames() {
        const { vertical } = this;
        const first = this._getContainer(true);
        const second = this._getContainer(false);

        const matchedFrames = [first, second]
            .map(container => {
                const before = container._getImmediateContainersByDirection(!vertical, true);
            });
    }

    get placement() {
        if (!this.__placement) {

            const {
                id,
                vertical,
                elevation: {
                    sightline,
                },
            } = this;

            if (vertical) {
                // FIRST CONTAINER
                const {
                    placement: {
                        id: firstId,
                        x: firstX = 0,
                        y: firstY = sightline,
                        height: firstHeight = 0,
                        width: firstWidth = 0,
                    } = {},
                } = this._getContainer(true) || {};

                // SECOND CONTAINER
                const {
                    placement: {
                        id: secondId,
                        x: secondX = sightline,
                        y: secondY = sightline,
                        height: secondHeight = 0,
                        width: secondWidth = 0,
                    } = {},
                } = this._getContainer(false) || {};

                const x = firstId ?
                    firstX + firstWidth
                    :
                    secondX - sightline;

                const y = Math.max(firstY, secondY);

                const height = !firstId ?
                    secondHeight
                    :
                    !secondId ?
                        firstHeight
                        :
                        Math.min(firstY + firstHeight, secondY + secondHeight) - y;

                const width = sightline;

                this.__placement = {
                    id,
                    firstId,
                    secondId,
                    vertical,
                    x,
                    y,
                    height,
                    width,
                };
            } else {
                // FIRST CONTAINER
                const {
                    placement: {
                        id: firstId,
                        x: firstX = sightline,
                        y: firstY = 0,
                        height: firstHeight = 0,
                        width: firstWidth = 0,
                    } = {},
                } = this._getContainer(true) || {};

                // SECOND CONTAINER
                const {
                    placement: {
                        id: secondId,
                        x: secondX = sightline,
                        y: secondY = sightline,
                        height: secondHeight = 0,
                        width: secondWidth = 0,
                    } = {},
                } = this._getContainer(false) || {};

                const x = Math.max(firstX, secondX);

                const y = firstId ?
                    firstY + firstHeight
                    :
                    secondY - sightline;

                const height = sightline;

                const width = !firstId ?
                    secondWidth
                    :
                    !secondId ?
                        firstWidth
                        :
                        Math.min(firstX + firstWidth, secondX + secondWidth) - x;

                this.__placement = {
                    id,
                    firstId,
                    secondId,
                    vertical,
                    x,
                    y,
                    height,
                    width,
                };
            }
        }
        return this.__placement;
    }
}

import React, { PureComponent, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { withContext } from '../../../../../../../components';
import { parseSearch } from '../../../../../../../utils';

export const TransformContext = createContext();

export const withTransformContext = withContext(TransformContext, ({ context }) => ({ transform: context }), { pure: true });

export const pixelsPerInch = 4;

const defaultScale = 1;

const minScale = 0.1;

class TransformProvider extends PureComponent {

    state = {
        baseScale: defaultScale,
        scrollMultiplier: 0.0007,
        scale: {
            x: defaultScale,
            y: defaultScale,
            nudgeAmount: 0.01,
        },
        translate: {
            nudgeAmount: 10,
            x: 0,
            y: 0,
        },
        grabbing: false,
    };

    componentDidMount = () => {
        window.addEventListener('keydown', this.watchSpaceKeyDown);
        window.addEventListener('keydown', this.watchArrowKeys);
        window.addEventListener('keyup', this.watchSpaceKeyUp);
        window.addEventListener('mouseup', this.watchMouseUp);
        window.addEventListener('mousedown', this.watchMouseDown);
        window.addEventListener('touchdown', this.startPanning);
        window.addEventListener('touchup', this.watchMouseUp);
        window.addEventListener('mousedown', this.watchMiddleMouseDown, true);
        window.addEventListener('wheel', this.watchScroll, { passive: false });
        // document.addEventListener('visibilitychange');
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.watchSpaceKeyDown);
        window.removeEventListener('keydown', this.watchArrowKeys);
        window.removeEventListener('keyup', this.watchSpaceKeyUp);
        window.removeEventListener('mouseup', this.watchMouseUp);
        window.removeEventListener('mousedown', this.watchMouseDown);
        window.removeEventListener('touchdown', this.startPanning);
        window.removeEventListener('touchup', this.watchMouseUp);
        window.removeEventListener('wheel', this.watchScroll);
        window.removeEventListener('mousemove', this.pan);
        window.removeEventListener('touchmove', this.pan);
    }

    componentDidUpdate = ({
        elevation: {
            rawElevation: {
                id: oldId,
            } = {},
            roughOpening: oldRO,
            roughOpening: {
                x: oldX,
                y: oldY,
            } = {},
        } = {},
    }) => {
        const {
            props: {
                elevation: {
                    rawElevation: {
                        id: newId,
                    } = {},
                    roughOpening: newRO,
                    roughOpening: {
                        x,
                        y,
                    } = {},
                } = {},
                location: {
                    search,
                },
            },
        } = this;

        if (
            (
                oldId !== newId
            ) || (
                (
                    typeof x === 'number'
                ) && (
                    typeof y === 'number'
                ) && (
                    !oldX
                    ||
                    !oldY
                    ||
                    typeof oldX !== 'number'
                    ||
                    typeof oldY !== 'number'
                )
            )
        ) {

            this.setZoom(x, y)

            setTimeout(() => {
                this.setZoom(x, y)
            })
        }
    }

    setZoom = (x, y) => {
        // console.log(this.props);
        const IE = document.getElementById("InteractiveElevation");

        // console.log({ IE });

        if (IE) {

            const ratioY = IE.clientHeight / y / pixelsPerInch;
            const ratioX = IE.clientWidth / x / pixelsPerInch;

            // console.log({ ratioY, ratioX })

            const baseScaleY = ratioY * 0.6;
            const baseScaleX = ratioX * 0.75;

            // console.log({ baseScaleY, baseScaleX });

            const baseScale = Math.min(baseScaleY, baseScaleX);

            // console.log({
            //     baseScaleY,
            //     baseScaleX,
            //     baseScale,
            // });

            const baseTranslateX = -x * 0.2;

            this.setState(({ scale, translate }) => ({
                baseScale,
                scale: {
                    ...scale,
                    x: baseScale,
                    y: baseScale,
                },
                translate: {
                    ...translate,
                    x: baseTranslateX,
                },
            }));
        }
    }

    watchSpaceKeyDown = e => {
        const { key } = e;
        if (key === ' ' && !this.state.spaceKey) {
            this.setState(() => ({ spaceKey: true }));
        }
    }

    watchSpaceKeyUp = ({ key }) => {
        if (key === ' ') this.setState(() => ({ spaceKey: false }));
    }

    watchArrowKeys = e => {
        const { key } = e;
        if (this.state.spaceKey) {
            if (key === "ArrowUp") {
                e.preventDefault();
                this.setState(({ scale: { x, y, nudgeAmount } }) => ({
                    scale: {
                        nudgeAmount,
                        x: Math.max(+x + nudgeAmount, minScale) || minScale,
                        y: Math.max(+y + nudgeAmount, minScale) || minScale,
                    },
                }));

            } else if (key === 'ArrowDown') {
                e.preventDefault();
                this.setState(({ scale: { x, y, nudgeAmount } }) => ({
                    scale: {
                        nudgeAmount,
                        x: Math.max(+x - nudgeAmount, minScale) || minScale,
                        y: Math.max(+y - nudgeAmount, minScale) || minScale,
                    },
                }));
            }
        }
    }

    watchScroll = e => {
        e.preventDefault();
        this.setState(({ scrollMultiplier, scale: { x, y } }) => ({
            scale: {
                y: Math.max(+y - scrollMultiplier * e.deltaY, minScale) || minScale,
                x: Math.max(+x - scrollMultiplier * e.deltaY, minScale) || minScale,
            },
        }));
    }

    watchMouseDown = e => {
        if (this.state.spaceKey) {
            this.startPanning(e);
        }
    }

    watchMiddleMouseDown = e => {
        if (e.which == 2) {
            this.startPanning(e, true);
        }
    }

    startPanning = (e, captured) => {

        console.log("PANNING");

        if (!captured) e.preventDefault();

        const { clientX, clientY } = e;

        this.setState(() => ({ grabbing: true }));

        const {
            state: {
                translate: {
                    x,
                    y,
                },
            },
        } = this;

        this.mouseStart = {
            x: +clientX - +x,
            y: +clientY - +y,
        };

        window.addEventListener('mousemove', this.pan);
        window.addEventListener('touchmove', this.pan);

    };

    watchMouseUp = () => {
        if (this.state.grabbing) {

            window.removeEventListener('mousemove', this.pan);
            window.removeEventListener('touchmove', this.pan);

            this.setState(() => ({ grabbing: false }));
        }
    }

    pan = e => {

        e.preventDefault();

        const { clientX, clientY } = e;

        const {
            mouseStart: {
                x,
                y,
            },
        } = this;

        this.setState({
            translate: {
                x: +clientX - +x,
                y: +clientY - +y,
            },
        });
    }

    updateScale = (value = minScale) => this.setState(({ scale: { x, y, nudgeAmount } }) => ({
        // n: console.log({
        //     value,
        //     plusValue: + value,
        //     maxValue: Math.max(+value, minScale),
        //     minScale,
        //     nudgeAmount,
        // }),
        scale: {
            nudgeAmount,
            x: Math.max(+value, minScale) || minScale,
            y: Math.max(+value, minScale) || minScale,
        },
    }));

    updateScaleNudge = (value = minScale) => this.setState(({ scale }) => ({
        scale: {
            ...scale,
            nudgeAmount: Math.max(+value, minScale) || minScale,
        },
    }));

    updateTranslateX = (value = 0) => this.setState(({ translate }) => ({
        translate: {
            ...translate,
            x: +value || 0,
        },
    }));

    updateTranslateY = (value = 0) => this.setState(({ translate }) => ({
        translate: {
            ...translate,
            y: -value || 0,
        },
    }));

    updateTranslateNudge = (value = 0) => this.setState(({ translate }) => ({
        translate: {
            ...translate,
            nudgeAmount: +value || 0,
        },
    }));

    // reset zoom
    resetScale = () => this.setState(({ baseScale, scale }) => ({
        scale: {
            ...scale,
            x: baseScale,
            y: baseScale,
        },
    }));

    // reset pan
    resetTranslate = () => this.setState(({ translate }) => ({
        translate: {
            ...translate,
            x: 0,
            y: 0,
        },
    }));

    render = () => {
        const {
            state: {
                pixelsPerInch,
                scale,
                translate,
                spaceKey,
                grabbing,
            },
            props: {
                children,
            },
            updateScale,
            updateScaleNudge,
            resetScale,
            updateTranslateX,
            updateTranslateY,
            updateTranslateNudge,
            resetTranslate,
            watchMouseDown,
            watchMouseUp,
        } = this;

        return (
            <TransformContext.Provider
                value={{
                    pixelsPerInch,
                    scale,
                    translate,
                    minScale,
                    updateScale,
                    updateScaleNudge,
                    resetScale,
                    updateTranslateX,
                    updateTranslateY,
                    updateTranslateNudge,
                    resetTranslate,
                    watchMouseDown,
                    watchMouseUp,
                    spaceKey,
                    grabbing,
                }}
            >
                {children}
                {grabbing ? (
                    <div
                        id="cursor-grabbing-"
                        style={{
                            cursor: 'grabbing',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: '100vh',
                            width: '100vw',
                            zIndex: 99999,
                        }}
                    />
                ) : null}
            </TransformContext.Provider>
        );
    }
}

export default withRouter(TransformProvider);
import React, { PureComponent, createContext } from 'react';
import { withContext } from '../../../../../../../components';

export const TransformContext = createContext();

export const withTransformContext = withContext(TransformContext, ({ context }) => ({ transform: context }), { pure: true });

export const pixelsPerInch = 4;

const defaultScale = 1;

const minScale = 0.1;

export default class TransformProvider extends PureComponent {

    state = {
        baseTranslate: {
            x: 0,
            y: 0,
        },
        baseScale: defaultScale,
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
        window.addEventListener('touchup', this.watchMouseUp);
        window.addEventListener('mousedown', this.watchMiddleMouseDown, true);
        window.addEventListener('wheel', this.watchScroll);
        window.addEventListener('mousedown', this.watchScrollClick);
        // document.addEventListener('visibilitychange');
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.watchSpaceKeyDown);
        window.removeEventListener('keydown', this.watchArrowKeys);
        window.removeEventListener('keyup', this.watchSpaceKeyUp);
        window.removeEventListener('mouseup', this.watchMouseUp);
        window.removeEventListener('touchup', this.watchMouseUp);
        window.addEventListener('wheel', this.watchScroll);
    }

    componentDidUpdate = ({
        elevation: {
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
                    roughOpening: newRO,
                    roughOpening: {
                        x,
                        y,
                    } = {},
                } = {},
            },
        } = this;
        if (
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
        ) {
            console.log({ x, y });
            console.log(this.props);
            const IE = document.getElementById("InteractiveElevation");
            console.log({ IE });

            if (IE) {
                const ratio = IE.clientHeight / y / pixelsPerInch;
                const baseScale = ratio * 0.6;

                console.log({ ratio, baseScale });

                const baseTranslateX = -x * 0.2;

                this.setState(({ baseTranslate }) => ({
                    baseScale,
                    baseTranslate: {
                        ...baseTranslate,
                        x: baseTranslateX,
                    },
                }));
            }
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
        if (e.deltaY > 0) {
            e.preventDefault();
            this.setState(({ scale: { x, y, nudgeAmount } }) => ({
                scale: {
                    nudgeAmount,
                    x: Math.max(+x - nudgeAmount, minScale) || minScale,
                    y: Math.max(+y - nudgeAmount, minScale) || minScale,
                },
            }));
        }
        else if (e.deltaY < 0) {
            e.preventDefault();
            this.setState(({ scale: { x, y, nudgeAmount } }) => ({
                scale: {
                    nudgeAmount,
                    x: Math.max(+x + nudgeAmount, minScale) || minScale,
                    y: Math.max(+y + nudgeAmount, minScale) || minScale,
                },
            }));
        }
    }

    watchMouseDown = e => {
        if (this.state.spaceKey){
            this.startPanning(e);
        }
    }

    watchMiddleMouseDown = e => {
        if (e.which == 2){
            this.startPanning(e);
        }
    }

    startPanning = e => {

        e.preventDefault();

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

    updateScale = ({ target: { value = minScale } }) => this.setState(({ scale: { x, y, nudgeAmount } }) => ({
        scale: {
            nudgeAmount,
            x: Math.max(+value, minScale) || minScale,
            y: Math.max(+value, minScale) || minScale,
        },
    }));

    updateScaleNudge = ({ target: { value = minScale } }) => this.setState(({ scale }) => ({
        scale: {
            ...scale,
            nudgeAmount: Math.max(+value, minScale) || minScale,
        },
    }));

    updateTranslateX = ({ target: { value = 0 } }) => this.setState(({ translate }) => ({
        translate: {
            ...translate,
            x: +value || 0,
        },
    }));

    updateTranslateY = ({ target: { value = 0 } }) => this.setState(({ translate }) => ({
        translate: {
            ...translate,
            y: -value || 0,
        },
    }));

    updateTranslateNudge = ({ target: { value = 0 } }) => this.setState(({ translate }) => ({
        translate: {
            ...translate,
            nudgeAmount: +value || 0,
        },
    }));

    resetScale = () => this.setState({ scale: this.state.baseScale });

    resetTranslate = () => this.setState({ translate: { x: 0, y: 0 } });

    render = () => {
        const {
            state: {
                pixelsPerInch,
                baseScale,
                scale,
                baseTranslate,
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
                    scale: {
                        ...scale,
                        x: scale.x * baseScale,
                        y: scale.y * baseScale,
                    },
                    translate: {
                        ...translate,
                        x: translate.x + baseTranslate.x,
                        y: translate.y + baseTranslate.y,
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

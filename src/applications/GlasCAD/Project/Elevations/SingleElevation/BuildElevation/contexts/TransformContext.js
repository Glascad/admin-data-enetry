import React, { PureComponent, createContext } from 'react';

export const TransformContext = createContext();

const defaultScale = 1;

export default class TransformProvider extends PureComponent {

    state = {
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
        // document.addEventListener('visibilitychange');
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.watchSpaceKeyDown);
        window.removeEventListener('keydown', this.watchArrowKeys);
        window.removeEventListener('keyup', this.watchSpaceKeyUp);
        window.removeEventListener('mouseup', this.watchMouseUp);
    }

    watchSpaceKeyDown = e => {
        const { key } = e;
        if (key === ' ') {
            e.preventDefault();
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
                        x: + x + nudgeAmount,
                        y: + y + nudgeAmount,
                    },
                }))

            } else if (key === 'ArrowDown') {
                e.preventDefault();
                this.setState(({ scale: { x, y, nudgeAmount } }) => ({
                    scale: {
                        nudgeAmount,
                        x: +x - nudgeAmount,
                        y: +y - nudgeAmount,
                    },
                }))
            }
        }
    }

    watchMouseDown = e => {
        if (this.state.spaceKey) {

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
        }
    };

    watchMouseUp = () => {
        if (this.state.grabbing) {

            window.removeEventListener('mousemove', this.pan);

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

    updateScale = ({ target: { value = 0 } }) => this.setState(({ scale: { x, y, nudgeAmount } }) => ({
        scale: {
            nudgeAmount,
            x: +value || 0,
            y: +value || 0,
        },
    }));

    updateScaleNudge = ({ target: { value = 0 } }) => this.setState(({ scale }) => ({
        scale: {
            ...scale,
            nudgeAmount: +value || 0,
        },
    }))

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
    }))

    resetScale = () => this.setState({ scale: defaultScale });

    resetTranslate = () => this.setState({ translate: { x: 0, y: 0 } });

    render = () => {
        const {
            state: {
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
                    scale,
                    translate,
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

import React, { Component, createContext } from 'react';

export const TransformContext = createContext();

const defaultScale = 1;

export default class TransformProvider extends Component {

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

    watchSpaceKeyDown = ({ key }) => key === ' ' && (
        this.spaceKey = true
    ) && (
            document.body.style.cursor = 'grab'
        );

    watchSpaceKeyUp = ({ key }) => key === ' ' && !(
        this.spaceKey = false
    ) && (
            document.body.style.cursor = 'default'
        );

    watchArrowKeys = ({ key }) => this.spaceKey && (
        key === "ArrowUp" ?
            this.setState(({ scale: { x, y, nudgeAmount } }) => ({
                scale: {
                    nudgeAmount,
                    x: + x + nudgeAmount,
                    y: + y + nudgeAmount,
                },
            }))
            :
            key === 'ArrowDown' ?
                this.setState(({ scale: { x, y, nudgeAmount } }) => ({
                    scale: {
                        nudgeAmount,
                        x: +x - nudgeAmount,
                        y: +y - nudgeAmount,
                    },
                }))
                :
                null
    );

    watchMouseDown = e => {
        if (this.spaceKey) {

            e.preventDefault();

            const { clientX, clientY } = e;

            this.panning = true;

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

            document.body.style.cursor = 'grabbing !important';
            window.addEventListener('mousemove', this.pan);
        }
    };

    watchMouseUp = () => {
        if (this.panning) {

            document.body.style.cursor = "";
            window.removeEventListener('mousemove', this.pan);

            this.panning = false;
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
                }}
            >
                {children}
            </TransformContext.Provider>
        );
    }
}

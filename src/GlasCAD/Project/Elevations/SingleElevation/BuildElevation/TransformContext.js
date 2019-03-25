import React, { Component, createContext } from 'react';

export const TransformContext = createContext();

const defaultScale = 0.75;

export default class TransformProvider extends Component {

    state = {
        scale: defaultScale,
        translate: {
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
            this.setState(({ scale }) => ({
                scale: +scale + 0.01,
            }))
            :
            key === 'ArrowDown' ?
                this.setState(({ scale }) => ({
                    scale: +scale - 0.01,
                }))
                :
                null
    );

    watchMouseDown = e => {
        if (this.spaceKey) {

            e.preventDefault();

            const { clientX, clientY } = e;

            this.panning = true;

            // console.log("START");
            // console.log({ clientX, clientY });

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

            document.body.style.cursor = 'grabbing';
            window.addEventListener('mousemove', this.pan);
        }
    };

    watchMouseUp = () => {
        if (this.panning) {
            // console.log("DONE");
            // console.log(this.state);

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

        // console.log("MOVE");
        // console.log({ clientX, clientY });

        this.setState({
            translate: {
                x: +clientX - +x,
                y: +clientY - +y,
            },
        });
    }

    undoPan = () => {

    }

    updateScale = ({ target: { value = 0 } }) => this.setState({
        scale: +value || 0,
    });

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
            resetScale,
            updateTranslateX,
            updateTranslateY,
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
                    resetScale,
                    updateTranslateX,
                    updateTranslateY,
                    resetTranslate,
                    watchMouseDown,
                    watchMouseUp,
                }}
            >
                {children}
            </TransformContext.Provider>
        )
    }
}

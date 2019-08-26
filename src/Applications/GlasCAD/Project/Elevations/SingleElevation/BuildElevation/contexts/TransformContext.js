import React, { PureComponent, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { withContext } from '../../../../../../../components';
import { parseSearch } from '../../../../../../../utils';
import TransformContext from '../../../../../../../components'

export const ElevationTransformContext = createContext();

export const withTransformContext = withContext(ElevationTransformContext, ({ context }) => ({ transform: context }), { pure: true });

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
            <TransformContext
            initialState={this.state}
            children={children}
            >
            </TransformContext>
        );
    }
}

export default withRouter(TransformProvider);
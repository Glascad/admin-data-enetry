import React, { Component, createRef } from 'react';

import { StaticContext } from '../../../../../../Statics/Statics';
import { TransformContext } from '../TransformContext';

import Container from './elevation-components/Container';
import Frame from './elevation-components/Frame';
import FinishedFloor from './elevation-components/FinishedFloor';
import DimensionButton from './elevation-components/DimensionButton';

import './InteractiveElevation.scss';

export default class InteractiveElevation extends Component {

    static contextType = StaticContext;

    InteractiveElevation = createRef();

    componentDidMount = () => {
        setTimeout(() => {
            this.previousViewportStyles = {
                paddingBottom: this.context.Viewport.current.style.paddingBottom,
                marginBottom: this.context.Viewport.current.style.marginBottom,
                overflowY: this.context.Viewport.current.style.overflowY,
            };
            console.log(this.context.Viewport);
            this.context.Viewport.current.style.paddingBottom = "0";
            this.context.Viewport.current.style.marginBottom = "0";
            this.context.Viewport.current.style.overflowY = "hidden";
            this.InteractiveElevation.current.style.height = `${
                window.innerHeight
                -
                this.InteractiveElevation.current.offsetTop
                -
                48}px`;
        });
    }

    componentWillUnmount = () => {
        this.context.Viewport.current.style.paddingBottom = this.previousViewportStyles.paddingBottom;
        this.context.Viewport.current.style.marginBottom = this.previousViewportStyles.marginBottom;
        this.context.Viewport.current.style.overflowY = this.previousViewportStyles.overflowY;
    }

    render = () => {
        const {
            props: {
                elevation: {
                    placedContainers = [],
                    placedFrames = [],
                    roughOpening: {
                        x: rox = 0,
                        y: roy = 0,
                    } = {},
                    finishedFloorHeight,
                    containerDimensions: {
                        verticals = [],
                        horizontals = [],
                    },
                },
            },
        } = this;

        return (
            <TransformContext.Consumer>
                {({
                    scale,
                    translate: {
                        x,
                        y,
                    },
                    watchMouseDown,
                }) => (
                        <div
                            id="InteractiveElevation"
                            ref={this.InteractiveElevation}
                            onMouseDown={watchMouseDown}
                        >
                            <div
                                id="elevation-display"
                                style={{
                                    height: roy,
                                    width: rox,
                                    transform: `translate(${x}px, ${y - finishedFloorHeight}px) scale(${scale}, ${scale})`,
                                }}
                            >
                                {/* ROUGH OPENING */}
                                {/* <div /> */}
                                {/* CONTAINERS */}
                                {placedContainers.map(container => (
                                    <Container
                                        key={container.refId}
                                        container={container}
                                        finishedFloorHeight={finishedFloorHeight}
                                    />
                                ))}
                                {/* FRAMES */}
                                {placedFrames.map(_frame => (
                                    <Frame
                                        key={_frame.refId}
                                        _frame={_frame}
                                        finishedFloorHeight={finishedFloorHeight}
                                    />
                                ))}
                                {/* FINISHED FLOOR */}
                                <FinishedFloor
                                    finishedFloorHeight={finishedFloorHeight}
                                />
                                <div id="left-dimension-track">
                                    {/* VERTICAL DIMENSIONS */}
                                    {verticals.map(dimension => (
                                        <DimensionButton
                                            key={dimension.refId}
                                            dimension={dimension}
                                            vertical={true}
                                        />
                                    ))}
                                </div>
                                <div id="bottom-dimension-track">
                                    {/* HORIZONTAL DIMENSIONS */}
                                    {horizontals.map(dimension => (
                                        <DimensionButton
                                            key={dimension.refId}
                                            dimension={dimension}
                                            vertical={false}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
            </TransformContext.Consumer>
        );
    }
}

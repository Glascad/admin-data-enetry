import React, { Component } from 'react';

import { TransformContext } from '../TransformContext';

import Container from './Container';
import Frame from './Frame';
import FinishedFloor from './FinishedFloor';

import './InteractiveElevation.scss';

export default class InteractiveElevation extends Component {


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
                        <div id="InteractiveElevation">
                            <svg
                                width={rox + 20}
                                height={roy + finishedFloorHeight + 20}
                                viewBox={`-10 ${-finishedFloorHeight - 10} ${rox + 10} ${roy + 10}`}
                                transform='scale(1, -1)'
                                onMouseDown={watchMouseDown}
                            >
                                <g
                                    transform={`scale(${scale}, ${scale}) translate(${x}, ${-y})`}
                                >
                                    {/* ROUGH OPENING */}
                                    {/* <rect
                                        width={x}
                                        height={y}
                                        x={0}
                                        y={finishedFloorHeight}
                                        // fill="rgba(127, 191, 255, 0.25)"
                                        fill="rgba(0, 0, 0, 0)"
                                        stroke="black"
                                    /> */}
                                    {/* FINISHED FLOOR */}
                                    <FinishedFloor
                                        finishedFloorHeight={finishedFloorHeight}
                                    />
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
                                </g>
                            </svg>
                        </div>
                    )}
            </TransformContext.Consumer>
        );
    }
}

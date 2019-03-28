import React, { Component } from 'react';

import { TransformContext } from '../TransformContext';

import Container from './Container';
import Frame from './Frame';
import FinishedFloor from './FinishedFloor';
import DimensionButton from './DimensionButton';

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
                    watchDimensionMouseDown,
                }) => (
                        <div id="InteractiveElevation">
                            <svg
                                id="Elevation"
                                width={rox + 20}
                                height={roy + finishedFloorHeight + 20}
                                viewBox={`-10 ${-finishedFloorHeight - 10} ${rox + 10} ${roy + 10}`}
                                transform='scale(1, -1)'
                                onMouseDown={watchMouseDown}
                            >
                                <g
                                    transform={`scale(${scale}, ${scale}) 
                                        translate(${x}, ${-y})`}
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
                                    {/* </g> */}
                                    {/* </svg> */}
                                    {/* <svg
                                id="VerticalDimensions"
                                width={120}
                                height={roy + finishedFloorHeight + 20}
                                viewBox={`-10 ${-finishedFloorHeight - 10} 110 ${roy + 10}`}
                                transform='scale(1, -1)'
                                onMouseDown={watchMouseDown}
                            > */}
                                    <g id="VerticalDimensions">
                                        <circle
                                            cx={40 - x}
                                            cy={roy + 20}
                                            r={10}
                                            onMouseDown={watchDimensionMouseDown}
                                        />
                                        {/* VERTICAL DIMENSIONS */}
                                        {verticals.map(dimension => (
                                            <DimensionButton
                                                key={dimension.refId}
                                                dimension={dimension}
                                                vertical={true}
                                            />
                                        ))}
                                    </g>
                                    {/* </svg> */}
                                    {/* <svg
                                id="HorizontalDimensions"
                                width={rox + 20}
                                height={120}
                                viewBox={`-10 110 ${rox + 10} 110`}
                                transform='scale(1, -1)'
                                onMouseDown={watchMouseDown}
                            > */}
                                    <g id="HorizontalDimensions">
                                        {/* HORIZONTAL DIMENSIONS */}
                                        {horizontals.map(dimension => (
                                            <DimensionButton
                                                key={dimension.refId}
                                                dimension={dimension}
                                                vertical={false}
                                            />
                                        ))}
                                    </g>
                                </g>
                            </svg>
                        </div>
                    )}
            </TransformContext.Consumer>
        );
    }
}

import React, {
    PureComponent,
    createRef,
} from 'react';

import { StaticContext } from '../../../../../../Statics/Statics';
import { TransformContext, pixelsPerInch } from '../contexts/TransformContext';

import Container from './components/Container';
import Frame from './components/Frame';
import FinishedFloor from './components/FinishedFloor';
import DimensionButton from './components/DimensionButton';

import './InteractiveElevation.scss';
import SelectionLayer from './components/SelectionLayer';
import { withContext } from '../../../../../../../components';
import { SelectionContext } from '../contexts/SelectionContext';
import RecursiveContainer from '../../utils/recursive-elevation/container';
import RecursiveFrame from '../../utils/recursive-elevation/frame';
import RecursiveDetail from '../../utils/recursive-elevation/detail';

class InteractiveElevation extends PureComponent {

    InteractiveElevation = createRef();

    componentDidMount = () => {
        setTimeout(() => {
            try {
                this.previousViewportStyles = {
                    paddingBottom: this.props.staticContext.Viewport.current.style.paddingBottom,
                    marginBottom: this.props.staticContext.Viewport.current.style.marginBottom,
                    overflowY: this.props.staticContext.Viewport.current.style.overflowY,
                    overflowX: this.props.staticContext.Viewport.current.style.overflowX,
                };
            } catch (err) {
                console.error(err);
            }
        });
        this.resizeViewport();

        window.addEventListener('resize', this.resizeViewport);
    }

    resizeViewport = () => {
        setTimeout(() => {
            try {
                // console.log(this.props.staticContext.Viewport);
                this.props.staticContext.Viewport.current.style.paddingBottom = "0";
                this.props.staticContext.Viewport.current.style.marginBottom = "0";
                this.props.staticContext.Viewport.current.style.overflowY = "hidden";
                this.props.staticContext.Viewport.current.style.overflowX = "hidden";
                this.InteractiveElevation.current.style.height = `${
                    window.innerHeight
                    -
                    this.InteractiveElevation.current.offsetTop
                    -
                    48}px`;
            } catch (err) {
                console.error(err);
            }
        });
    }

    componentWillUnmount = () => {
        try {
            this.props.staticContext.Viewport.current.style.paddingBottom = this.previousViewportStyles.paddingBottom;
            this.props.staticContext.Viewport.current.style.marginBottom = this.previousViewportStyles.marginBottom;
            this.props.staticContext.Viewport.current.style.overflowY = this.previousViewportStyles.overflowY;
        } catch (err) {
            console.error(err);
        }
        window.removeEventListener('resize', this.resizeViewport);
    }

    render = () => {
        const {
            props: {
                elevation: {
                    allContainers = [],
                    allFrames = [],
                    roughOpening: {
                        x: rox = 0,
                        y: roy = 0,
                    } = {},
                    finishedFloorHeight,
                    topDimensionTracks = [],
                    rightDimensionTracks = [],
                    leftDimensionTracks = [],
                    bottomDimensionTracks = [],
                } = {},
                transformContext: {
                    scale: {
                        nudgeAmount: scaleNudge,
                        x: scaleX,
                        y: scaleY,
                    },
                    translate: {
                        nudgeAmount,
                        x,
                        y,
                    },
                    spaceKey,
                    watchMouseDown,
                },
                selectedClass,
                selectItem,
                framesSelectable,
                updateElevation,
            },
        } = this;

        return (
            <div
                id="InteractiveElevation"
                className={spaceKey ?
                    'spacebar-pressed'
                    :
                    ''}
                ref={this.InteractiveElevation}
                onMouseDown={watchMouseDown}
            >
                <div
                    id="elevation-display"
                    className={`${
                        selectedClass
                        }-selected`}
                    style={{
                        height: roy * pixelsPerInch,
                        width: rox * pixelsPerInch,
                        transform: `translate(${x}px, ${y - finishedFloorHeight}px) scale(${scaleX}, ${scaleY})`,
                    }}
                    onMouseDown={e => e.stopPropagation()}
                >
                    {/* ROUGH OPENING */}
                    {/* <div /> */}
                    {/* CONTAINERS */}
                    {allContainers.map(container => (
                        <Container
                            key={container.refId}
                            container={container}
                            selectItem={selectItem}
                        />
                    ))}
                    {/* FRAMES */}
                    {allFrames.map(_frame => (
                        <Frame
                            key={_frame.refId}
                            _frame={_frame}
                            selectItem={selectItem}
                            selectable={framesSelectable}
                        />
                    ))}
                    {/* FINISHED FLOOR */}
                    <FinishedFloor
                        finishedFloorHeight={finishedFloorHeight}
                    />
                    {/* SELECTION */}
                    <SelectionLayer />
                    {/* VERTICAL DIMENSIONS */}
                    <div id="left-dimension-track">
                        {leftDimensionTracks.map((track, i) => (
                            <div key={i}>
                                {track.map(dimension => (
                                    <DimensionButton
                                        key={dimension.refId}
                                        track={i}
                                        first={true}
                                        dimension={dimension}
                                        updateElevation={updateElevation}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div id="right-dimension-track">
                        {rightDimensionTracks.map((track, i) => (
                            <div key={i}>
                                {track.map(dimension => (
                                    <DimensionButton
                                        key={dimension.refId}
                                        first={false}
                                        track={i}
                                        dimension={dimension}
                                        updateElevation={updateElevation}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    {/* <div
                        id="bottom-left"
                        className="corner"
                        style={{
                            bottom: 0,
                            left: 0,
                        }}
                        />
                        <div
                        id="bottom-right"
                        className="corner"
                        style={{
                            bottom: 0,
                            right: 0,
                        }}
                        />
                        <div
                        id="top-left"
                        className="corner"
                        style={{
                            top: 0,
                            left: 0,
                        }}
                        />
                    <div
                        id="top-right"
                        className="corner"
                        style={{
                            top: 0,
                            right: 0,
                        }}
                    /> */}
                    {/* HORIZONTAL DIMENSIONS */}
                    <div id="top-dimension-track">
                        {topDimensionTracks.map((track, i) => (
                            <div key={i}>
                                {track.map(dimension => (
                                    <DimensionButton
                                        key={dimension.refId}
                                        track={i}
                                        first={false}
                                        dimension={dimension}
                                        finishedFloorHeight={finishedFloorHeight}
                                        updateElevation={updateElevation}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div id="bottom-dimension-track">
                        {bottomDimensionTracks.map((track, i) => (
                            <div key={i}>
                                {track.map(dimension => (
                                    <DimensionButton
                                        key={dimension.refId}
                                        track={i}
                                        first={true}
                                        dimension={dimension}
                                        finishedFloorHeight={finishedFloorHeight}
                                        updateElevation={updateElevation}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default (
    withContext(
        StaticContext,
        ({ context }) => ({
            context: undefined,
            staticContext: context,
        }),
        { pure: true },
    )(
        withContext(
            SelectionContext,
            ({
                context: {
                    items: {
                        0: {
                            vertical,
                            class: SelectedClass,
                        } = {},
                        length,
                    },
                    selectItem,
                },
            }) => ({
                context: undefined,
                selectedClass: SelectedClass === RecursiveContainer ?
                    'container'
                    :
                    SelectedClass === RecursiveFrame ?
                        `${vertical ?
                            'vertical'
                            :
                            'horizontal'
                        }-frame`
                        :
                        SelectedClass === RecursiveDetail ?
                            'detail'
                            :
                            length ?
                                'string'
                                :
                                '',
                framesSelectable: !SelectedClass
                    ||
                    SelectedClass === RecursiveFrame,
                selectItem,
            }),
            { pure: true },
        )(
            withContext(
                TransformContext,
                ({ context }) => ({
                    context: undefined,
                    transformContext: context,
                }),
                { pure: true },
            )(
                InteractiveElevation
            )
        )
    )
);

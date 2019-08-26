import React, {
    PureComponent,
    createRef,
} from 'react';

import { withRouter } from 'react-router-dom';

import { StaticContext } from '../../../../../../Statics/Statics';
import { ElevationTransformContext, pixelsPerInch } from '../contexts/TransformContext';

// import Container from './components/Container';
import Container from './Containers/Container';
import Frame from './Frames/Frame.js';
import DimensionButton from './components/DimensionButton';

import './InteractiveElevation.scss';
import SelectionLayer from './components/SelectionLayer';
import { withContext, Ellipsis } from '../../../../../../../components';
import { SelectionContext } from '../contexts/SelectionContext';
import RecursiveContainer from '../../utils/recursive-elevation/container';
import RecursiveFrame from '../../utils/recursive-elevation/frame';
import RecursiveDetail from '../../utils/recursive-elevation/detail';
import { parseSearch } from '../../../../../../../utils';
import { SAMPLE_ELEVATIONS } from '../../SingleElevation';
import Containers from './Containers/Containers';
import Frames from './Frames/Frames';

class InteractiveElevation extends PureComponent {

    InteractiveElevation = createRef();

    state = {
        loadingTooLong: false,
    };

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
        setTimeout(() => {
            this.setState({ loadingTooLong: true });
        }, 2000);
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
            state: {
                loadingTooLong,
            },
            props: {
                location: {
                    search,
                },
                refetch,
                elevation,
                elevation: {
                    rawElevation: {
                        bugId: elevationBugId,
                        id,
                    } = {},
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
                ElevationtransformContext: {
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
                updating,
                selectedClass,
                selectItem,
                framesSelectable,
                updateElevation,
            },
        } = this;

        console.log(this.props.elevation); 

        const {
            elevationId,
            bugId,
            sampleElevation,
        } = parseSearch(search);

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
                {console.log({
                    id,
                    elevationId,
                    sampleElevation,
                    bugId,
                    elevationBugId,
                    elevation,
                })}
                {updating ? (
                    <div
                        id="elevation-loading"
                    >
                        <Ellipsis
                            text="Saving"
                        />
                    </div>
                ) : (
                    id && (
                        (
                            id === +elevationId
                        ) || (
                            id === (SAMPLE_ELEVATIONS[sampleElevation] || {}).id
                        ) || (
                            +bugId === +elevationBugId
                        )
                    )
                ) ? (
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
                                <div
                                    id="rough-opening"
                                    style={{
                                        height: roy * pixelsPerInch,
                                        width: rox * pixelsPerInch,
                                    }}
                                />
                                {/* FINISHED FLOOR */}
                                <div
                                    id="FinishedFloor"
                                    style={{
                                        top: `calc(100% + ${finishedFloorHeight * pixelsPerInch}px)`,
                                    }}
                                />
                                {/* CONTAINERS */}
                                <Containers
                                    containers={allContainers}
                                    selectItem={selectItem}
                                />
                                {/* FRAMES */}

                                <Frames 
                                    allFrames={allFrames}
                                    selectItem={selectItem}
                                    selectable={framesSelectable}
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
                        ) : (
                            <div
                                id="elevation-loading"
                            >
                                <Ellipsis
                                    text="Loading"
                                />
                                {loadingTooLong ? (
                                    <>
                                        <p>
                                            Taking too long?
                                    </p>
                                        <button
                                            onClick={refetch}
                                        >
                                            Reload
                                    </button>
                                    </>
                                ) : null}
                            </div>
                        )}
            </div>
        );
    }
}

export default withRouter(
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
                ElevationTransformContext,
                ({ context }) => ({
                    context: undefined,
                    ElevationtransformContext: context,
                }),
                { pure: true },
            )(
                InteractiveElevation
            )
        )
    )
);

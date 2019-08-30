import React, {
    useRef,
    useState,
    useContext,
    useEffect,
} from 'react';

import { withRouter } from 'react-router-dom';

import { StaticContext } from '../../../../../../Statics/Statics';
import { TransformContext, pixelsPerInch, withTransformContext } from '../contexts/ElevationTransformContext';

// import Container from './components/Container';
import Container from './Containers/Container';
import Frame from './Frames/Frame.js';
import DimensionButton from './components/DimensionButton';

import './InteractiveElevation.scss';
import SelectionLayer from './components/SelectionLayer';
import { withContext, Ellipsis, TransformBox } from '../../../../../../../components';
import { SelectionContext } from '../contexts/SelectionContext';
import RecursiveContainer from '../../utils/recursive-elevation/container';
import RecursiveFrame from '../../utils/recursive-elevation/frame';
import RecursiveDetail from '../../utils/recursive-elevation/detail';
import { parseSearch } from '../../../../../../../utils';
import { SAMPLE_ELEVATIONS } from '../../SingleElevation';
import Containers from './Containers/Containers';
import Frames from './Frames/Frames';

const InteractiveElevation = ({
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
    spaceKey,
    watchMouseDown,
    updating,
    selectedClass,
    selectItem,
    framesSelectable,
    updateElevation,
}) => {
    const InteractiveElevation = useRef();
    
    const [loadingTooLong, setLoadingTooLong] = useState(false);
    
    const staticContext = useContext(StaticContext);

    const [{ paddingBottom, marginBottom, overflowY }, setPreviousViewportStyles] = useState({});

    useEffect(() => {
        setTimeout(() => {
            try {
                setPreviousViewportStyles({
                    paddingBottom: staticContext.Viewport.current.style.paddingBottom,
                    marginBottom: staticContext.Viewport.current.style.marginBottom,
                    overflowY: staticContext.Viewport.current.style.overflowY,
                    overflowX: staticContext.Viewport.current.style.overflowX,
                });
            } catch (err) {
                console.error(err);
            }
        });
        setTimeout(() => {
            setLoadingTooLong(true);
        }, 2000);
        resizeViewport();

        window.addEventListener('resize', resizeViewport);

        return () => {
            setTimeout(() => {
                try {
                    staticContext.Viewport.current.style.paddingBottom = paddingBottom;
                    staticContext.Viewport.current.style.marginBottom = marginBottom;
                    staticContext.Viewport.current.style.overflowY = overflowY;
                } catch (err) {
                    console.error(err);
                }
                window.removeEventListener('resize', resizeViewport);
            })
        };
    },[]);

    const resizeViewport = () => {
        setTimeout(() => {
            try {
                staticContext.Viewport.current.style.paddingBottom = "0";
                staticContext.Viewport.current.style.marginBottom = "0";
                staticContext.Viewport.current.style.overflowY = "hidden";
                staticContext.Viewport.current.style.overflowX = "hidden";
                InteractiveElevation.current.style.height = `${
                    window.innerHeight
                    -
                    InteractiveElevation.current.offsetTop
                    -
                    48}px`;
            } catch (err) {
                console.error(err);
            }
        });
    }

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
            ref={InteractiveElevation}
            onMouseDown={watchMouseDown}
        >
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
                        <TransformBox
                            id="elevation-display"
                            className={`${
                                selectedClass
                                }-selected`}
                            selectedClass={selectedClass}
                            style={{
                                height: roy * pixelsPerInch,
                                width: rox * pixelsPerInch,
                            }}
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
                            {/* </div> */}
                        </TransformBox>
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
                TransformContext,
                ({ context: { spaceKey, watchMouseDown } }) => ({
                    context: undefined,
                    spaceKey,
                    watchMouseDown,
                }),
                { pure: true },
            )(
                InteractiveElevation
            )
        )
    )
);

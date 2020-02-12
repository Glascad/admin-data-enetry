import React, {
    useRef,
    useState,
    useContext,
    useEffect,
} from 'react';

import { withRouter } from 'react-router-dom';

import { StaticContext } from '../../../../../../Statics/Statics';
import { TransformContext, pixelsPerInch, withTransformContext } from '../contexts/ElevationTransformProvider';

// import Container from './components/Container';
import Container from './Containers/Container';
import Frame from './Frames/Frame';
import DimensionButton from './components/DimensionButton/DimensionButton';

import './InteractiveElevation.scss';
import SelectionLayer from './components/SelectionLayer/SelectionLayer';
import { withContext, Ellipsis, TransformBox } from '../../../../../../../components';
import { SelectionContext } from '../contexts/SelectionContext';
import RecursiveContainer from '../../utils/recursive-elevation/container';
import RecursiveFrame from '../../utils/recursive-elevation/frame';
import RecursiveDetail from '../../utils/recursive-elevation/detail';
import { parseSearch, match } from '../../../../../../../utils';
import { SAMPLE_ELEVATIONS } from '../../SingleElevation';
import Containers from './Containers/Containers';
import Frames from './Frames/Frames';

const InteractiveElevation = ({
    location: {
        search,
    },
    refetch,
    elevation: {
        rawElevation: {
            bugId: elevationBugId,
            id,
        } = {},
        allContainers = [],
        allFrames = [],
        roughOpening: {
            width = 0,
            height = 0,
        } = {},
        finishedFloorHeight,
        topDimensionTracks = [],
        rightDimensionTracks = [],
        leftDimensionTracks = [],
        bottomDimensionTracks = [],
    } = {},
    updating,
    selectedClass,
    selectItem,
    framesSelectable,
    updateElevation,
    staticContext: {
        viewportRef,
    },
}) => {
    const [loadingTooLong, setLoadingTooLong] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoadingTooLong(true);
        }, 2000);
    }, []);

    const {
        elevationId,
        bugId,
        sampleElevation,
    } = parseSearch(search);

    return match()
        .case(updating, () => (
            <div
                id="elevation-loading"
            >
                <Ellipsis
                    text="Saving"
                />
            </div>
        ))
        .case(id && (
            (
                id === +elevationId
            ) || (
                id === (SAMPLE_ELEVATIONS[sampleElevation] || {}).id
            ) || (
                +bugId === +elevationBugId
            )
        ), () => (
            <TransformBox
                id="InteractiveElevation"
                className={`${selectedClass}-selected`}
                innerStyle={{
                    height: height * pixelsPerInch,
                    width: width * pixelsPerInch,
                }}
                viewportRef={viewportRef}
            >
                {/* ROUGH OPENING */}
                <div
                    id="rough-opening"
                    style={{
                        height: height * pixelsPerInch,
                        width: width * pixelsPerInch,
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
        ))
        .otherwise(() => (
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
        ));
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
            InteractiveElevation
        )
    )
);

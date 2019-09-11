import React, { memo } from 'react';
import _ from 'lodash';

import DetailBubble from '../components/DetailBubble/DetailBubble';
import { transformProps } from '../../../../../../../../components';
import { pixelsPerInch } from '../../contexts/ElevationTransformContext';

const Detail = memo(function Detail({
    itemsByRefId,
    detail,
    detail: {
        id,
        exists,
        refId,
        vertical,
        registerReactComponent,
        _frame: {
            refId: frameRefId,
        } = {},
        firstContainer,
        firstContainer: {
            refId: firstContainerRefId,
        } = {},
        secondContainer: {
            refId: secondContainerRefId,
        } = {},
    },
    scaledPlacement: {
        x,
        y,
        height,
        width,
    },
    scaledFrameDetailPlacement: FDP,
    selectItem,
    containerIsSelected,
    cancelSelection,
    unselectItem,
}) {

    registerReactComponent(this);

    if (!exists) return null;

    return (
        <>
            <div
                id={refId}
                data-cy={`detail-${id}`}
                className={`Detail ${
                    frameRefId in itemsByRefId ?
                        'frame-selected'
                        :
                        firstContainerRefId in itemsByRefId ?
                            'first-container-selected'
                            :
                            secondContainerRefId in itemsByRefId ?
                                'second-container-selected'
                                :
                                'detail-selected'
                    } ${
                    firstContainer ?
                        ''
                        :
                        'no-first-container'
                    } ${
                    vertical ?
                        'vertical'
                        :
                        'horizontal'
                    }`}
                style={{
                    left: x,
                    bottom: y,
                    height,
                    width,
                }}
                onClick={() => {
                    unselectItem(detail);
                    selectItem(detail._frame);
                }}
            >
                <DetailBubble
                    cancelSelection={cancelSelection}
                    selectItem={selectItem}
                    detail={detail}
                    containerIsSelected={containerIsSelected}
                />
            </div>
            <div
                className="frame-detail-placement"
                style={{
                    left: FDP.x,
                    bottom: FDP.y,
                    height: FDP.height,
                    width: FDP.width,
                }}
            />
        </>
    );
});

const mapPlacement = _.memoize(({
    detail: {
        placement: {
            x,
            y,
            height,
            width,
        },
    },
}) => ({
    scaledPlacement: {
        x: pixelsPerInch * x,
        y: pixelsPerInch * y,
        height: pixelsPerInch * height,
        width: pixelsPerInch * width,
    },
}));

const mapFrameDetailPlacement = ({
    detail: {
        placedFrameDetail: {
            x,
            y,
            height,
            width,
        },
    },
}) => ({
    scaledFrameDetailPlacement: {
        x: pixelsPerInch * x,
        y: pixelsPerInch * y,
        height: pixelsPerInch * height,
        width: pixelsPerInch * width,
    },
});

export default memo(transformProps(props => ({
    ...mapFrameDetailPlacement(props),
    ...mapPlacement(props),
}))(Detail));
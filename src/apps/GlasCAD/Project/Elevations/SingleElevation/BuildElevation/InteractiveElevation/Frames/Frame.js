import React, { memo } from 'react';
import _ from 'lodash';
import { pixelsPerInch, withTransformContext } from '../../contexts/ElevationTransformProvider';
import { transformProps } from '../../../../../../../../components';
import { withSelectionContext } from '../../contexts/SelectionContext';

const Frame = memo(function Frame({
    _frame,
    _frame: {
        id,
        refId,
        vertical,
        registerReactComponent,
        details,
    },
    scaledPlacement: {
        x,
        y,
        height,
        width,
    },
    transform: {
        scale: {
            x: scaleX,
        },
    },
    selectable,
    selectItem,
    selected,

}) {

    registerReactComponent(this);

    const padding = 10 / scaleX;

    return (
        <div
            id={refId}
            data-cy={details.map(({ id }) => id).join('-')}
            className={`frame-wrapper ${
                vertical ?
                    'vertical'
                    :
                    'horizontal'
                } ${
                selected ?
                    'selected'
                    :
                    ''
                }`}
            style={selectable ?
                {
                    left: x - padding,
                    bottom: y - padding,
                    height: height + (2 * padding),
                    width: width + (2 * padding),
                    // background: `rgba(0, 0, 128, 0.2)`,
                } : {
                    left: x,
                    bottom: y,
                    height,
                    width,
                }}
            onClick={() => selectItem(_frame)}
        >
            <div
                className="Frame"
                style={{
                    height,
                    width,
                }}
            />
        </div>
    );
});

const mapSelection = _.memoize(({
    selection: {
        items,
    },
    _frame,
}) => ({
    selection: undefined,
    selected: items.includes(_frame),
}));

const scalePlacement = _.memoize(({
    _frame: {
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

export default withSelectionContext(
    transformProps(props => ({
        ...mapSelection(props),
        ...scalePlacement(props),
    }))(
        withTransformContext(Frame)
    )
);

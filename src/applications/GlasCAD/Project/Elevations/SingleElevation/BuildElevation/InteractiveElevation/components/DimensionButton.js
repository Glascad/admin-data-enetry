import React, { PureComponent } from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';
import { withContext } from '../../../../../../../../components';

class DimensionButton extends PureComponent {

    handleClick = () => {
        const {
            props: {
                isSelected,
                selectItem,
                unselectItem,
                dimension: {
                    containers,
                },
            },
        } = this;

        if (isSelected) {
            containers.forEach(container => unselectItem(container))
        } else {
            containers.forEach(container => selectItem(container, true));
        }
    }

    render = () => {
        const {
            props: {
                track,
                dimension: {
                    refId,
                    vertical,
                    dimension,
                    offset,
                },
                isSelected,
                finishedFloorHeight,
            },
            handleClick,
        } = this;

        const dimensionKey = vertical ?
            'Height'
            :
            'Width';

        const offsetKey = vertical ?
            'bottom'
            :
            'left';

        const trackOffsetKey = vertical ?
            'left'
            :
            'bottom';

        // size = 24, space = 12
        const trackOffset = -36 * (track + 1) - 50;

        return (
            <button
                id={refId}
                className={`DimensionButton ${
                    vertical ?
                        'vertical'
                        :
                        'horizontal'
                    } ${
                    isSelected ?
                        'selected'
                        :
                        ''
                    }`}
                style={{
                    [dimensionKey.toLowerCase()]: dimension,
                    [`max${dimensionKey}`]: dimension,
                    [`min${dimensionKey}`]: dimension,
                    [offsetKey]: offset,
                    [trackOffsetKey]: trackOffset,
                    transform: vertical ?
                        undefined
                        :
                        `translateY(${finishedFloorHeight}px)`,
                }}
                onClick={handleClick}
            >
                <div>
                    {dimension.toFixed(2).replace(/\.*0*$/, '')}
                </div>
            </button>
        );
    }
}

const mapProps = ({
    dimension: {
        containers,
    },
    context: {
        items,
        selectItem,
        unselectItem,
    },
}) => ({
    context: undefined,
    isSelected: items.some(item => containers.includes(item)),
    selectItem,
    unselectItem,
});

export default withContext(SelectionContext, mapProps, { pure: true })(DimensionButton);

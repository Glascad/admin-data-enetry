import React from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';
import { TransformContext } from '../../contexts/TransformContext';

export default function DimensionButton({
    track,
    dimension: {
        refId,
        vertical,
        containers,
        dimension,
        offset,
    },
    finishedFloorHeight,
}) {
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
    const trackOffset = -36 * (track + 2);

    return (
        <SelectionContext.Consumer>
            {({
                items,
                selectItem,
                unselectItem,
            }) => {
                const isSelected = items.some(item => containers.includes(item));

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
                            [dimensionKey.toLowerCase()]: ~~dimension,
                            [`max${dimensionKey}`]: ~~dimension,
                            [`min${dimensionKey}`]: ~~dimension,
                            [offsetKey]: ~~offset,
                            [trackOffsetKey]: ~~trackOffset,
                            transform: vertical ?
                                undefined
                                :
                                `translateY(${finishedFloorHeight}px)`,
                        }}
                        onClick={() => containers.some(container => items.includes(container)) ?
                            containers.forEach(container => unselectItem(container))
                            :
                            containers.forEach(container => selectItem(container, true))}
                    >
                        <div>
                            {dimension.toFixed(2).replace(/\.*0*$/, '')}
                        </div>
                    </button>
                );
            }}
        </SelectionContext.Consumer>
    );
}

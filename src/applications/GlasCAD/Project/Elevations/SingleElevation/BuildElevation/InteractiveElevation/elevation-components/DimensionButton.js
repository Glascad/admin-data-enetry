import React from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';
import { TransformContext } from '../../contexts/TransformContext';

export default function DimensionButton({
    dimension: {
        refId,
        vertical,
        containers,
        dimension,
        offset,
    },
}) {
    const dimensionKey = vertical ?
        'Height'
        :
        'Width';

    const offsetKey = vertical ?
        'bottom'
        :
        'left';

    return (
        <SelectionContext.Consumer>
            {({
                selection: {
                    items,
                    selectItem,
                    unselectItem,
                },
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
                            [dimensionKey.toLowerCase()]: dimension,
                            [`max${dimensionKey}`]: dimension,
                            [`min${dimensionKey}`]: dimension,
                            [offsetKey]: offset,
                        }}
                        onClick={() => containers.every(container => items.includes(container)) ?
                            containers.forEach(container => unselectItem(container))
                            :
                            containers.forEach(container => selectItem(container, true))}
                    >
                        <span id={refId} >
                            {dimension.toFixed(2).replace(/\.*0*$/, '')}
                        </span>
                    </button>
                );
            }}
        </SelectionContext.Consumer>
    );
}

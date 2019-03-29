import React from 'react';

import { SelectionContext } from '../../SelectionContext';
import { TransformContext } from '../../TransformContext';

export default function DimensionButton({
    vertical,
    dimension: {
        refId,
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
                    handleMouseDown,
                },
            }) => {
                const isSelected = items.includes(refId);

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
                        onClick={handleMouseDown}
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

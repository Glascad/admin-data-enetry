import React from 'react';

import { SelectionContext } from '../SelectionContext';

export default function Frame({
    _frame: {
        x,
        y,
        height,
        width,
        refId,
        vertical,
    },
}) {
    return (
        <SelectionContext.Consumer>
            {({
                selection: {
                    items,
                    handleMouseDown,
                },
            }) => (
                    <rect
                        id={refId}
                        x={x}
                        y={y}
                        height={height}
                        width={width}
                        fill={items.includes(refId) ?
                            "#4A90E2"
                            :
                            `rgba(0, 0, 0, ${
                            vertical ?
                                0.45
                                :
                                0.25
                            })`}
                        onMouseDown={handleMouseDown}
                    />
                )}
        </SelectionContext.Consumer>
    );
}

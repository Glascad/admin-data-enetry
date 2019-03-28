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
                    <div
                        id={refId}
                        className={`Frame ${
                            items.includes(refId) ?
                                'selected'
                                :
                                ''
                            } ${
                            vertical ?
                                'vertical'
                                :
                                ''
                            }`}
                        style={{
                            left: x,
                            bottom: y,
                            height,
                            width,
                        }}
                        onMouseDown={handleMouseDown}
                    />
                )}
        </SelectionContext.Consumer>
    );
}

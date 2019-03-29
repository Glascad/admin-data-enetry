import React from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';

export default function Frame({
    _frame,
    _frame: {
        refId,
        vertical,
        class: RecursiveFrame,
        placement: {
            x,
            y,
            height,
            width,
        },
    },
}) {
    return (
        <SelectionContext.Consumer>
            {({
                selection: {
                    items,
                    items: {
                        0: firstItem,
                        length,
                    },
                    selectItem,
                },
            }) => (
                    <div
                        id={refId}
                        className={`Frame ${
                            items.includes(_frame) ?
                                'selected'
                                :
                                ''
                            } ${
                            !length || (firstItem.class === RecursiveFrame) ?
                                'selectable'
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
                        onClick={() => selectItem(_frame)}
                    />
                )}
        </SelectionContext.Consumer>
    );
}

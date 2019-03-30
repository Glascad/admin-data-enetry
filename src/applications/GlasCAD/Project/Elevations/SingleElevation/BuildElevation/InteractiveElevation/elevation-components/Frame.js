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
                        // to make selecting a frame less difficult
                        className="frame-wrapper"
                        onClick={() => selectItem(_frame)}
                        style={{
                            left: x - 10,
                            bottom: y - 10,
                            height: height + 20,
                            width: width + 20,
                        }}
                    >
                        <div
                            id={refId}
                            className={`Frame ${
                                items.some(f => f.refId === refId) ?
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
                                height,
                                width,
                            }}
                        />
                    </div>
                )}
        </SelectionContext.Consumer>
    );
}

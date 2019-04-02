import React from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';

export default function Container({
    container,
    container: {
        refId,
        class: RecursiveContainer,
        placement: {
            x,
            y,
            height,
            width,
        },
    },
    tabIndex,
}) {
    return (
        <SelectionContext.Consumer>
            {({
                items,
                items: {
                    0: firstItem,
                    length,
                },
                selectItem,
            }) => (
                    <div
                        id={refId}
                        className={`Container ${
                            items.includes(container) ?
                                'selected'
                                :
                                ''
                            } ${
                            items[length - 1] === container ?
                                'last-selected'
                                :
                                ''
                            } ${(
                                !length
                                ||
                                typeof firstItem === 'string'
                                ||
                                (firstItem.class === RecursiveContainer)
                            ) ?
                                'selectable'
                                :
                                ''
                            }`}
                        style={{
                            left: ~~x,
                            bottom: ~~y,
                            height: ~~height,
                            width: ~~width,
                        }}
                        onClick={() => selectItem(container)}
                        tabIndex={tabIndex}
                    >
                        <div className="text">
                            {refId.replace(/\D*/, '*')}
                        </div>
                    </div>
                )}
        </SelectionContext.Consumer>
    );
}

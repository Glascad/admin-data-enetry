import React from 'react';

import { SelectionContext } from '../../SelectionContext';

export default function Container({
    container: {
        x,
        y,
        height,
        width,
        refId,
    },
    tabIndex,
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
                        className={`Container ${
                            items.includes(refId) ?
                                'selected'
                                :
                                ''
                            } ${
                            items[items.length - 1] === refId ?
                                'last-selected'
                                :
                                ''
                            } ${
                            !items.length || items[0].match(/Container/) ?
                                'selectable'
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
                        tabIndex={tabIndex}
                    >
                        <div
                            id={refId}
                            className="text"
                        >
                            {refId.replace(/\D*/, '*')}
                        </div>
                    </div>
                )}
        </SelectionContext.Consumer>
    );
}

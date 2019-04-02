import React from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';

export default function DetailBubble({
    detail,
    detail: {
        vertical,
        detailId,
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
                items,
            }) => (
                    <div
                        className={`detail-bubble-placement`}
                    >
                        <div
                            className={`DetailBubble ${
                                // items.some()
                                ''
                                }`}
                        >
                            <span className="detail-id">
                                {detailId}
                            </span>
                        </div>
                    </div>
                )}
        </SelectionContext.Consumer>
    )
}
import React from 'react';

import { SelectionContext } from '../../contexts/SelectionContext';

export default function DetailBubble({
    detail: {
        detailId,
    },
}) {
    return (
        <div
            className={`detail-bubble-placement`}
        >
            <button
                className="DetailBubble"
            >
                <span className="detail-id">
                    {detailId}
                </span>
            </button>
        </div>
    );
}
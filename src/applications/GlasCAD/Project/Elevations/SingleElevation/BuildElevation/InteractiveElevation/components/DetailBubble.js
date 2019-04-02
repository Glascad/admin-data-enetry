import React from 'react';

import SelectionContext from '../../contexts/SelectionContext';

export default function DetailBubble({
    detail,
    detail: {
        placement,
    },
}) {
    return (
        <SelectionContext.Consumer>
            {({ }) => (
                <div
                    // className={`DetailBubble ${}`}
                >

                </div>
            )}
        </SelectionContext.Consumer>
    )
}
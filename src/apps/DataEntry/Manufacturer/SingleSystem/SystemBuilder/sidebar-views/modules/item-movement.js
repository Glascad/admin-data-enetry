import React from 'react';

export const ItemMovement = ({
    item,
    item: {
        path = '',
    },
    name,
    partialAction,
    cancelPartial,
    dispatchPartial,
}) => console.log({item}) || !path.match(/^\d+\.\w+$/) ? (
    <>
        <button
            data-cy={`edit-${name.toLowerCase()}-move-button`}
            className="sidebar-button light"
            onClick={() => partialAction && partialAction.ACTION === "MOVE" ?
                cancelPartial()
                :
                dispatchPartial('MOVE', item)}
        >
            {partialAction && partialAction.ACTION === "MOVE" ? 'Cancel Move' : `Move ${name}`}
        </button>
        <button
            data-cy={`edit-${name.toLowerCase()}-copy-button`}
            className="sidebar-button light"
            onClick={() => partialAction && partialAction.ACTION === "COPY" ?
            cancelPartial()
            :
            dispatchPartial('COPY', item)}
            >
            {partialAction && partialAction.ACTION === "COPY" ? 'Cancel Copy' : `Copy ${name}`}
        </button>
    </>
) : null;
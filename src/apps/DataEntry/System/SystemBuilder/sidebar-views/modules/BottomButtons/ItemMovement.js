import React from 'react';

const ItemMovement = ({
    selectedItem,
    name,
    partialAction,
    cancelPartial,
    dispatchPartial,
}) => (
        <>
            <button
                data-cy={`edit-${name.toLowerCase()}-move-button`}
                className="sidebar-button light"
                onClick={() => partialAction && partialAction.ACTION === "MOVE" ?
                    cancelPartial()
                    :
                    dispatchPartial('MOVE', selectedItem)}
            >
                {partialAction && partialAction.ACTION === "MOVE" ? 'Cancel Move' : `Move ${name}`}
            </button>
            <button
                data-cy={`edit-${name.toLowerCase()}-copy-button`}
                className="sidebar-button light"
                onClick={() => partialAction && partialAction.ACTION === "COPY" ?
                    cancelPartial()
                    :
                    dispatchPartial('COPY', selectedItem)}
            >
                {partialAction && partialAction.ACTION === "COPY" ? 'Cancel Copy' : `Copy ${name}`}
            </button>
        </>
    );

export default ItemMovement;
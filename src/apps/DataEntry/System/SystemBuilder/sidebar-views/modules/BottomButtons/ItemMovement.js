import React from 'react';
import { UPDATE_ITEM, COPY_ITEM } from '../../../../ducks/actions';

export default function ItemMovement({
    selectedItem,
    name,
    partialAction,
    cancelPartial,
    dispatchPartial,
    systemMap,
}) {
    return (
        <>
            <button
                data-cy={`edit-${name.toLowerCase()}-move-button`}
                className="sidebar-button light"
                onClick={partialAction && partialAction.ACTION === UPDATE_ITEM ?
                    cancelPartial
                    :
                    () => dispatchPartial(UPDATE_ITEM, selectedItem, ({ __typename, path }) => ({
                        ...selectedItem,
                        update: {
                            [`parent${__typename}Path`]: path,
                        },
                    }))}
            >
                {partialAction && partialAction.ACTION === UPDATE_ITEM ? 'Cancel Move' : `Move ${name}`}
            </button>
            <button
                data-cy={`edit-${name.toLowerCase()}-copy-button`}
                className="sidebar-button light"
                onClick={partialAction && partialAction.ACTION === COPY_ITEM ?
                    cancelPartial
                    :
                    () => dispatchPartial(COPY_ITEM, selectedItem, item => ({
                        selectedItem,
                        targetItem: item,
                        systemMap,
                    }))}
            >
                {partialAction && partialAction.ACTION === COPY_ITEM ? 'Cancel Copy' : `Copy ${name}`}
            </button>
        </>
    );
}

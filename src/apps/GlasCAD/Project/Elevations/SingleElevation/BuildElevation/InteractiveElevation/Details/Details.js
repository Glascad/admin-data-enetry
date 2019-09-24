import React, { memo } from 'react';
import Detail from "./Detail"

export default memo(function Details({
    filteredDetailsToRender,
    selectItem,
    cancelSelection,
    unselectItem,
    itemsByRefId,
    detailIsSelected,
    containerIsSelected,
    frameIsSelected,
}) {
    return (
        <>
            {filteredDetailsToRender.map(detail => (
                <Detail
                    key={detail.detailId}
                    detail={detail}
                    selectItem={selectItem}
                    cancelSelection={cancelSelection}
                    unselectItem={unselectItem}
                    itemsByRefId={itemsByRefId}
                    detailIsSelected={detailIsSelected}
                    containerIsSelected={containerIsSelected}
                    frameIsSelected={frameIsSelected}
                />
            ))}
        </>
    )
});
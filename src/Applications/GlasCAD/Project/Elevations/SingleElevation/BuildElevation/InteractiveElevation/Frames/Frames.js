import React, { memo } from 'react';
import Frame from './Frame';

export default memo(function Frames({
    allFrames,
    selectItem,
    selectable,    
}) {
    return (
        <>
            {allFrames.map(_frame => (
                <Frame
                    key={_frame.refId}
                    _frame={_frame}
                    selectItem={selectItem}
                    selectable={selectable}
                />
            ))}
        </>
    )
})
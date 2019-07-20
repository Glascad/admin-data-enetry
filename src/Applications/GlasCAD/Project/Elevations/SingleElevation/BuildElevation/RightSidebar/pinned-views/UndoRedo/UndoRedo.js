import React from 'react';

import * as Icons from '../../../../../../../../../assets/icons';

export default function UndoRedo({
    undo,
    redo,
}) {
    return (
        <>
            <div
                onClick={undo}
            >
                {'<'}
            </div>
            <div
                onClick={redo}
            >
                {'<'}
            </div>
        </>
    );
}

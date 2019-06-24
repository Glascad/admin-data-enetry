import React, { useContext } from 'react';

import { TransformContext } from '../../../contexts/TransformContext';

import {
    Input,
    TitleBar,
} from '../../../../../../../../../components';

export default {
    title: "Zoom and Pan",
    component: ZoomAndPan,
};

function ZoomAndPan() {
    const {
        scale: {
            nudgeAmount: scaleNudge,
            x: scaleX,
            y: scaleY,
        },
        translate: {
            nudgeAmount,
            x,
            y,
        },
        minScale,
        updateScale,
        resetScale,
        updateTranslateX,
        updateTranslateY,
        updateTranslateNudge,
        resetTranslate,
    } = useContext(TransformContext);

    return (
        <>
            <TitleBar
                title="Zoom"
            />
            <Input
                label="Scale Factor"
                // direction="row"
                light={true}
                type="number"
                step={scaleNudge}
                min={minScale}
                value={scaleX}
                onChange={({ target: { value } }) => updateScale(+value)}
            />
            <button
                className="sidebar-button action"
                onClick={resetScale}
            >
                Reset Zoom
            </button>
            <TitleBar
                title="Pan"
            />
            <Input
                label="Translation Nudge Amount"
                light={true}
                type="number"
                value={nudgeAmount || ''}
                onChange={({ target: { value } }) => updateTranslateNudge(+value)}
            />
            <Input
                label="Horizontal Translation"
                light={true}
                type="number"
                step={nudgeAmount}
                value={x || ''}
                onChange={({ target: { value } }) => updateTranslateX(+value)}
            />
            <Input
                label="Vertical Translation"
                light={true}
                type="number"
                step={nudgeAmount}
                value={-y || ''}
                onChange={({ target: { value } }) => updateTranslateY(+value)}
            />
            <button
                className="sidebar-button action"
                onClick={resetTranslate}
            >
                Reset Pan
            </button>
        </>
    );
}

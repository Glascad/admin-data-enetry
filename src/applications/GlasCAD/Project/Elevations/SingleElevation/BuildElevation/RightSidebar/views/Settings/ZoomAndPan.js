import React from 'react';

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
    return (
        <TransformContext.Consumer>
            {({
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
                updateScale,
                resetScale,
                updateTranslateX,
                updateTranslateY,
                updateTranslateNudge,
                resetTranslate,
            }) => (
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
                            value={scaleX}
                            onChange={updateScale}
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
                            value={nudgeAmount || 0}
                            onChange={updateTranslateNudge}
                        />
                        <Input
                            label="Horizontal Translation"
                            light={true}
                            type="number"
                            step={nudgeAmount}
                            value={x || 0}
                            onChange={updateTranslateX}
                        />
                        <Input
                            label="Vertical Translation"
                            light={true}
                            type="number"
                            step={nudgeAmount}
                            value={-y || 0}
                            onChange={updateTranslateY}
                        />
                        <button
                            className="sidebar-button action"
                            onClick={resetTranslate}
                        >
                            Reset Pan
                        </button>
                    </>
                )}
        </TransformContext.Consumer>
    );
}

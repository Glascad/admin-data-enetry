import React from 'react';

import { TransformContext } from '../../../TransformContext';

import {
    Input,
    TitleBar,
} from '../../../../../../../../../components';

export default {
    name: "Zoom and Pan",
    component: ZoomAndPan,
};

function ZoomAndPan() {
    return (
        <TransformContext.Consumer>
            {({
                scale,
                translate: {
                    x,
                    y,
                },
                updateScale,
                resetScale,
                updateTranslateX,
                updateTranslateY,
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
                            step={0.01}
                            value={scale}
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
                            label="Horizontal Translation"
                            light={true}
                            type="number"
                            step={10}
                            value={x || 0}
                            onChange={updateTranslateX}
                        />
                        <Input
                            label="Vertical Translation"
                            light={true}
                            type="number"
                            step={10}
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

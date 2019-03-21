import React from 'react';

import { SelectionContext } from '../SelectionContext';
import { TransformContext } from '../TransformContext';

import {
    Input,
} from '../../../../../../components';

import './RightSidebar.scss';

export default function RightSidebar() {
    return (
        <SelectionContext.Consumer>
            {({
                sidebar: {
                    open,
                    toggle,
                },
            }) => (
                    <div id="RightSidebar" className={open ? "" : "closed"}>
                        <button
                            className="sidebar-button primary"
                            onClick={toggle}
                        >
                            Close
                        </button>
                        <TransformContext.Consumer>
                            {({
                                scale,
                                translate: {
                                    x,
                                    y,
                                },
                                updateScale,
                                updateTranslateX,
                                updateTranslateY,
                            }) => (
                                    <>
                                        <Input
                                            label="Zoom"
                                            direction="row"
                                            light={true}
                                            type="number"
                                            step={0.01}
                                            value={scale}
                                            onChange={updateScale}
                                        />
                                        <Input
                                            label="Pan X"
                                            direction="row"
                                            light={true}
                                            type="number"
                                            step={10}
                                            value={x}
                                            onChange={updateTranslateX}
                                            />
                                        <Input
                                            label="Pan Y"
                                            direction="row"
                                            light={true}
                                            type="number"
                                            step={10}
                                            value={y}
                                            onChange={updateTranslateY}
                                        />
                                    </>
                                )}
                        </TransformContext.Consumer>
                    </div>
                )}
        </SelectionContext.Consumer>
    );
}

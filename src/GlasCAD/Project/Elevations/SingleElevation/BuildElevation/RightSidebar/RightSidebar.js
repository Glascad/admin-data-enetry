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
                                resetScale,
                                updateTranslateX,
                                updateTranslateY,
                                resetTranslate,
                            }) => (
                                    <>
                                        {console.log({
                                            scale,
                                            x,
                                            y,
                                        })}
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
                                            label="Reset Zoom"
                                            type="switch"
                                            light={true}
                                            checked={scale === 1}
                                            readOnly={true}
                                            onClick={resetScale}
                                        />
                                        <Input
                                            label="Pan X"
                                            direction="row"
                                            light={true}
                                            type="number"
                                            // step={10}
                                            value={x || 0}
                                            onChange={updateTranslateX}
                                        />
                                        <Input
                                            label="Pan Y"
                                            direction="row"
                                            light={true}
                                            type="number"
                                            // step={10}
                                            value={y || 0}
                                            onChange={updateTranslateY}
                                        />
                                        <Input
                                            label="Reset Pan"
                                            type="switch"
                                            light={true}
                                            checked={x === 0 && y === 0}
                                            readOnly={true}
                                            onClick={resetTranslate}
                                        />
                                    </>
                                )}
                        </TransformContext.Consumer>
                    </div>
                )}
        </SelectionContext.Consumer>
    );
}

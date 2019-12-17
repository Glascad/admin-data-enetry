import React from 'react';
import * as Icons from '../../../../../assets/icons';
import { Input } from '../../../../../components';
import { Matrix } from '../../../../../utils';

export default function Reflect({
    selectedItem,
    dispatch,
    TRANSFORM,
}) {

    const createMirror = angle => () => dispatch(TRANSFORM, {
        targetItem: selectedItem,
        appliedTransform: Matrix.createMirrorAcrossAxis(angle, { x: 0, y: 0 }),
    });

    return (
        <div className="tray-section">
            <div className="label">
                Reflect
                </div>
            <div className="input-group">
                <Input
                    data-cy="reflect-vertical"
                    Icon={Icons.ReflectVertical}
                    onChange={createMirror(0)}
                    disabled={!selectedItem}
                />
                <Input
                    data-cy="reflect-horizontal"
                    Icon={Icons.ReflectHorizontal}
                    onChange={createMirror(90)}
                    disabled={!selectedItem}
                />
                <Input
                    data-cy="reflect-diagonal"
                    Icon={Icons.ReflectAngle}
                    onChange={createMirror(45)}
                    disabled={!selectedItem}
                />
            </div>
        </div>
    );
};
import React from 'react';
import * as Icons from '../../../../../assets/icons';
import { Input } from '../../../../../components';
import { Matrix } from '../../../../../utils';
import { acos, asin } from '../../../../../utils/functions/trig';

export default function ({
    selectedItem,
    selectedItem: {
        transform = {},
    } = {},
    dispatchTransform,
}) {

    const {
        a, b, c: xOffset = 0,
        d, e, f: yOffset = 0,
        g, h, i,
    } = transform;

    console.log({
        a: Math.acos(a)/ Math.PI * 180,
        b: -Math.asin(b)/ Math.PI * 180,
        d: Math.asin(d)/ Math.PI * 180,
        e: Math.acos(e)/ Math.PI * 180,
    })

    const createMirror = angle => () => dispatchTransform(Matrix.createMirrorAcrossAxis(angle, { x: 0, y: 0 }));

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
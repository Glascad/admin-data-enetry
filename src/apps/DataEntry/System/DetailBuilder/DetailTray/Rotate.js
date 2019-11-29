import React from 'react';
import * as Icons from '../../../../../assets/icons';
import { Input } from '../../../../../components';
import { Matrix } from '../../../../../utils';

export default function ({
    selectedItem,
    angle,
    setAngle,
    dispatchTransform,
}) {

    const createRotate = clockwise => () => dispatchTransform(
        Matrix.createRotation(
            clockwise ?
                -angle
                :
                +angle,
        ),
    );

    return (
        <div className="tray-section">
            <div className="label">
                Rotate
                </div>
            <div className="input-group">
                <Input
                    data-cy="rotate-counter-clockwise"
                    Icon={Icons.RotateCounterClockwise}
                    onChange={createRotate(false)}
                    disabled={!selectedItem}
                />
                <Input
                    data-cy="rotate-clockwise"
                    Icon={Icons.RotateClockwise}
                    onChange={createRotate(true)}
                    disabled={!selectedItem}
                />
                <Input
                    data-cy="rotate"
                    labe="Angle"
                    type="number"
                    value={angle}
                    onChange={({ target: { value } }) => setAngle(+value)}
                />
            </div>
        </div>
    );
};
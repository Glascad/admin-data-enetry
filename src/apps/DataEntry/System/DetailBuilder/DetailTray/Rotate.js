import React, { useState } from 'react';
import * as Icons from '../../../../../assets/icons';
import { Input } from '../../../../../components';
import { Matrix } from '../../../../../utils';

export default function Rotate({
    selectedItem,
    dispatch,
    TRANSFORM
}) {

    const [angle, setAngle] = useState(0);


    const createRotate = clockwise => () => dispatch(TRANSFORM, {
        targetItem: selectedItem,
        intermediateTransform: Matrix.createRotation(
            clockwise ?
                -angle
                :
                +angle,
        ),
    });

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
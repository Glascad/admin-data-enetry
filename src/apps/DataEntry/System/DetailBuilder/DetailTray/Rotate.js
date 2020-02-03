import React, { useState } from 'react';
import { getDetailOrConfigurationOrPartExtremities } from '../../../../../app-logic/system';
import * as Icons from '../../../../../assets/icons';
import { Input, Toggle } from '../../../../../components';
import { Matrix } from '../../../../../utils';

export default function Rotate({
    selectedItem,
    dispatch,
    selectedConfigurationPaths,
    systemMap,
    TRANSFORM,
}) {

    const [rotateAroundCenter, setRotateAroundCenter] = useState(false);

    const [angle, setAngle] = useState(0);

    const {
        x: {
            min: xMin,
            max: xMax,
        } = {},
        y: {
            min: yMin,
            max: yMax,
        } = {},
    } = getDetailOrConfigurationOrPartExtremities(selectedItem, selectedConfigurationPaths, systemMap) || {};

    const createRotate = clockwise => () => dispatch(TRANSFORM, {
        targetItem: selectedItem,
        appliedTransform: Matrix.createCenteredRotation(
            clockwise ?
                -angle
                :
                +angle,
            rotateAroundCenter ?
                {
                    x: 0,
                    y: 0,
                }
                :
                {
                    x: (xMax + xMin) / 2,
                    y: (yMax + yMin) / 2,
                }
        ),
    });

    return (
        <div className="tray-section">
            <div className="label">
                Rotate
                </div>
            <Input
                data-cy="rotate-toggle"
                type="switch"
                label="Rotate Around Center"
                checked={rotateAroundCenter}
                onChange={() => setRotateAroundCenter(!rotateAroundCenter)}
            />
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
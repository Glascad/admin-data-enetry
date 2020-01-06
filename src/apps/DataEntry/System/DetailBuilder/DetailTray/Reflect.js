import React from 'react';
import * as Icons from '../../../../../assets/icons';
import { Input } from '../../../../../components';
import { Matrix } from '../../../../../utils';
import { getDetailOrConfigurationOrPartExtremities } from '../../../../../app-logic/system';

export default function Reflect({
    selectedItem,
    selectedConfigurationPaths,
    systemMap,
    dispatch,
    TRANSFORM,
}) {

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

    const createMirror = angle => () => dispatch(TRANSFORM, {
        targetItem: selectedItem,
        appliedTransform: Matrix.createMirrorAcrossAxis(
            angle,
            {
                x: (xMax + xMin) / 2,
                y: (yMax + yMin) / 2
            }),
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
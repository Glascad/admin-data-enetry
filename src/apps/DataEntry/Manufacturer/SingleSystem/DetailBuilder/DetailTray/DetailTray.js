import React, { useState, memo } from 'react';
import * as Icons from '../../../../../../assets/icons';
import { Input, Tray } from '../../../../../../components';
import { Matrix } from '../../../../../../utils';
import UPDATE_ITEM from '../../ducks/actions/update-item';

const initialState = {
    coordinate: {
        x: 0,
        y: 0,
    },
    nudge: 0,
    angle: 0,
};

export default memo(function DetailTray({
    selectedItem,
    selectedItem: {
        path,
        __typename,
        transform,
    } = {},
    dispatch,
}) {
    const [state, setState] = useState(initialState);
    const { coordinate, nudge, angle } = state;
    const setCoordinate = (d, value) => setState(state => ({
        ...state,
        coordinate: {
            ...state.coordinate,
            [d]: +value,
        },
    }));
    const setNudge = value => setState(state => ({
        ...state,
        nudge: +value,
    }));
    const setAngle = angle => setState(state => ({
        ...state,
        angle: +angle,
    }));
    const dispatchTransform = intermediateTransform => {
        const previousTransform = new Matrix(transform);
        const resultingTransform = previousTransform.multiply(intermediateTransform);
        dispatch(UPDATE_ITEM, {
            __typename,
            path,
            update: {
                transform: resultingTransform.toObject(),
            },
        });
    }
    const createNudge = (vertical, first) => () => dispatchTransform(
        Matrix.createTranslation(
            vertical ?
                0
                :
                first ?
                    -nudge
                    :
                    +nudge,
            vertical ?
                first ?
                    -nudge
                    :
                    +nudge
                :
                0,
        ),
    );
    const createRotate = clockwise => () => dispatchTransform(
        Matrix.createRotation(
            clockwise ?
                -angle
                :
                +angle,
        ),
    );
    const createMirror = angle => () => dispatchTransform(Matrix.createMirrorAcrossAxis(angle, { x: 0, y: 0 }));
    console.log(arguments[0]);
    return (
        <Tray>
            <div className="tray-section">
                {['x', 'y'].map(d => (
                    <Input
                        key={d}
                        data-cy={`${d}-coord`}
                        label={`${d} Coord`}
                        type="number"
                        value={coordinate[d]}
                        onChange={({ target: { value } }) => setCoordinate(d, +value)}
                    />
                ))}
            </div>
            <div className="tray-section">
                <Input
                    data-cy="nudge"
                    label="Nudge"
                    type="number"
                    value={nudge}
                    onChange={({ target: { value } }) => setNudge(+value)}
                />
                {['x', 'y'].map(d => (
                    <div
                        key={d}
                        className="input-group"
                    >
                        <Input
                            data-cy={`nudge-${d === 'x' ? 'left' : 'down'}`}
                            Icon={d === 'x' ? Icons.MoveLeft : Icons.MoveDown}
                            onChange={createNudge(d !== 'x', true)}
                            disabled={!selectedItem}
                        />
                        <Input
                            data-cy={`nudge-${d === 'x' ? 'right' : 'up'}`}
                            Icon={d === 'x' ? Icons.MoveRight : Icons.MoveUp}
                            onChange={createNudge(d !== 'x', false)}
                            disabled={!selectedItem}
                        />
                    </div>
                ))}
            </div>
            <div className="tray-section">
                <div className="label">
                    Align
                </div>
                <div className="input-group">
                    <Input
                        Icon={Icons.AlignBottom}
                        disabled={true}
                    />
                    <Input
                        Icon={Icons.AlignMiddle}
                        disabled={true}
                    />
                    <Input
                        Icon={Icons.AlignTop}
                        disabled={true}
                    />
                </div>
                <div className="input-group">
                    <Input
                        Icon={Icons.AlignLeft}
                        disabled={true}
                    />
                    <Input
                        Icon={Icons.AlignCenter}
                        disabled={true}
                    />
                    <Input
                        Icon={Icons.AlignRight}
                        disabled={true}
                    />
                </div>
            </div>
            <div className="tray-section">
                <div className="label">
                    Reflect
                </div>
                <div className="input-group">
                    <Input
                        Icon={Icons.ReflectVertical}
                        onChange={createMirror(0)}
                        disabled={!selectedItem}
                    />
                    <Input
                        Icon={Icons.ReflectHorizontal}
                        onChange={createMirror(90)}
                        disabled={!selectedItem}
                    />
                    <Input
                        Icon={Icons.ReflectAngle}
                        onChange={createMirror(45)}
                        disabled={!selectedItem}
                    />
                    {/* <Input
                        
                    /> */}
                </div>
            </div>
            <div className="tray-section">
                <div className="label">
                    Rotate
                </div>
                <div className="input-group">
                    <Input
                        Icon={Icons.RotateCounterClockwise}
                        onChange={createRotate(false)}
                        disabled={!selectedItem}
                    />
                    <Input
                        Icon={Icons.RotateClockwise}
                        onChange={createRotate(true)}
                        disabled={!selectedItem}
                    />
                    <Input
                        labe="Angle"
                        type="number"
                        value={angle}
                        onChange={({ target: { value } }) => setAngle(+value)}
                    />
                </div>
            </div>
        </Tray>
    );
});

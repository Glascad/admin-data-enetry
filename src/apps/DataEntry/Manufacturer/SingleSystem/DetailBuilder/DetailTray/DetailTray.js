import React, { useState } from 'react';
import { multiply } from 'mathjs';
import { Tray, Input } from '../../../../../../components';
import { Matrix } from '../../../../../../utils';
import UPDATE_ITEM from '../../ducks/actions/update-item';

const initialState = {
    coordinate: {
        x: 0,
        y: 0,
    },
    nudge: {
        x: 0,
        y: 0,
    },
    angle: 0,
};

export default function DetailTray({
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
    const setNudge = (d, value) => setState(state => ({
        ...state,
        nudge: {
            ...state.nudge,
            [d]: +value,
        },
    }));
    const setAngle = angle => setState(state => ({
        ...state,
        angle,
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
                    -nudge.x
                    :
                    +nudge.x,
            vertical ?
                first ?
                    -nudge.y
                    :
                    +nudge.y
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
                    <div
                        className="input-group"
                        key={d}
                    >
                        <Input
                            data-cy={`${d}-coord`}
                            label={`${d} Coord`}
                            type="number"
                            value={coordinate[d]}
                            onChange={({ target: { value } }) => setCoordinate(d, +value)}
                        />
                        <Input
                            data-cy={`${d}-nudge`}
                            label={`${d} Nudge`}
                            type="number"
                            value={nudge[d]}
                            onChange={({ target: { value } }) => setNudge(d, +value)}
                        />
                        <Input
                            data-cy={`nudge-${d === 'x' ? 'left' : 'down'}`}
                            Icon={() => '-'}
                            onChange={createNudge(d !== 'x', true)}
                            disabled={!selectedItem}
                        />
                        <Input
                            data-cy={`nudge-${d === 'x' ? 'right' : 'up'}`}
                            Icon={() => '+'}
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
                        Icon={() => null}
                    />
                    <Input
                        Icon={() => null}
                    />
                    <Input
                        Icon={() => null}
                    />
                </div>
                <div className="input-group">
                    <Input
                        Icon={() => null}
                    />
                    <Input
                        Icon={() => null}
                    />
                    <Input
                        Icon={() => null}
                    />
                </div>
            </div>
            <div className="tray-section">
                <div className="label">
                    Reflect
                </div>
                <div className="input-group">
                    <Input
                        Icon={() => '|'}
                        onChange={createMirror(0)}
                        disabled={!selectedItem}
                    />
                    <Input
                        Icon={() => '--'}
                        onChange={createMirror(90)}
                        disabled={!selectedItem}
                    />
                    <Input
                        Icon={() => '/'}
                        onChange={createMirror(45)}
                        disabled={!selectedItem}
                    />
                    <Input
                        Icon={() => '\\'}
                        onChange={createMirror(-45)}
                        disabled={!selectedItem}
                    />
                </div>
            </div>
            <div className="tray-section">
                <div className="label">
                    Rotate
                </div>
                <div className="input-group">
                    <Input
                        Icon={() => '<'}
                        onChange={createRotate(false)}
                        disabled={!selectedItem}
                    />
                    <Input
                        Icon={() => '>'}
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
}

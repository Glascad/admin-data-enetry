import React, { useState } from 'react';
import { multiply } from 'mathjs';
import { Tray, Input } from '../../../../../../components';
import { matrix } from '../../../../../../utils';
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
    selectedPart,
    selectedPart: {
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
    const previousTransform = matrix.createTransformation(transform);
    const dispatchTransform = intermediateTransform => {
        const resultingTransform = multiply(previousTransform, intermediateTransform);
        dispatch(UPDATE_ITEM, {
            __typename,
            path,
            update: {
                transform: matrix.convertArrayMatrixToObject(resultingTransform),
            },
        });
    }
    const createNudge = (vertical, first) => () => dispatchTransform(
        matrix.createTranslation(
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
        matrix.createRotation(
            clockwise ?
                -angle
                :
                +angle,
        ),
    );
    const createMirror = angle => () => dispatchTransform(matrix.createMirrorAcrossAxis(angle, { x: 0, y: 0 }));
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
                            disabled={!selectedPart}
                        />
                        <Input
                            data-cy={`nudge-${d === 'x' ? 'right' : 'up'}`}
                            Icon={() => '+'}
                            onChange={createNudge(d !== 'x', false)}
                            disabled={!selectedPart}
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
                        disabled={!selectedPart}
                    />
                    <Input
                        Icon={() => '--'}
                        onChange={createMirror(90)}
                        disabled={!selectedPart}
                    />
                    <Input
                        Icon={() => '/'}
                        onChange={createMirror(45)}
                        disabled={!selectedPart}
                    />
                    <Input
                        Icon={() => '\\'}
                        onChange={createMirror(-45)}
                        disabled={!selectedPart}
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
                        disabled={!selectedPart}
                        />
                    <Input
                        Icon={() => '>'}
                        onChange={createRotate(true)}
                        disabled={!selectedPart}
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

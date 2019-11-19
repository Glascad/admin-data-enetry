import React, { useState } from 'react';
import { Tray, Input } from '../../../../../../components';

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
}) {
    const [state, setState] = useState(initialState);
    const { coordinate, nudge, angle } = state;
    const setCoordinate = (d, value) => setState(state => ({
        ...state,
        coordinate: {
            ...state.coordinate,
            [d]: value,
        },
    }));
    const setNudge = (d, value) => setState(state => ({
        ...state,
        nudge: {
            ...state.nudge,
            [d]: value,
        },
    }));
    const setAngle = angle => setState(state => ({
        ...state,
        angle,
    }));
    return (
        <Tray>
            <div className="tray-section">
                {['x', 'y'].map(d => (
                    <div
                        className="input-group"
                        key={d}
                    >
                        <Input
                            label={`${d} Coord`}
                            type="number"
                            value={coordinate[d]}
                            onChange={({ target: { value } }) => setCoordinate(d, value)}
                        />
                        <Input
                            label={`${d} Nudge`}
                            type="number"
                            value={nudge[d]}
                            onChange={({ target: { value } }) => setNudge(d, value)}
                        />
                        <Input
                            Icon={() => '-'}
                            disabled={!selectedPart}
                            />
                        <Input
                            Icon={() => '+'}
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
                    Rotate
                </div>
                <div className="input-group">
                    <Input
                        Icon={() => null}
                    />
                    <Input
                        Icon={() => null}
                    />
                    <Input
                        labe="Angle"
                        type="number"
                        value={angle}
                        onChange={({ target: { value } }) => setAngle(value)}
                    />
                </div>
            </div>
        </Tray>
    );
}

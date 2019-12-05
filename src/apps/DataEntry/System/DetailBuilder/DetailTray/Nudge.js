import React, { useState } from 'react';
import { Input } from '../../../../../components';
import * as Icons from '../../../../../assets/icons';
import { Matrix } from '../../../../../utils';


export default function Nudge({
    selectedItem,
    dispatch,
    TRANSFORM
}) {

    const [nudge, setNudge] = useState(0);

    const createNudge = (vertical, first) => () => dispatch(TRANSFORM, {
        targetItem: selectedItem,
        intermediateTransform: Matrix.createTranslation(
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
    });

    return (
        < div className="tray-section" >
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
    );
};
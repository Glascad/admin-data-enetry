import React, { memo, useState } from 'react';

import {
    TitleBar,
    Input,
    useInitialState,
} from '../../../../../../../../../components';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';
import { ImperialValue } from '../../../../../../../../../utils';

function MoveFrame({
    selection: {
        items,
        items: [
            {
                vertical,
            } = {},
        ],
    },
    ACTIONS: {
        moveFrames,
    },
}) {

    const [initialDistance] = useInitialState(new ImperialValue(6), []);
    const [distance, setDistance] = useState(initialDistance.value);

    const canMoveFalse = items.every(({ canMoveByDistance }) => canMoveByDistance && canMoveByDistance(-distance));
    const canMoveTrue = items.every(({ canMoveByDistance }) => canMoveByDistance && canMoveByDistance(+distance));

    console.log({
        distance,
        canMoveFalse,
        canMoveTrue,
    });

    return (
        <>
            <TitleBar
                title={`Move ${
                    vertical ?
                        'Vertical'
                        :
                        'Horizontal'
                    }`}
            />
            <Input
                label="Distance"
                type="inches"
                autoFocus={true}
                initialValue={initialDistance}
                onChange={({ value }) => setDistance(value)}
            />
            {canMoveFalse ? (
                <button
                    className="sidebar-button empty"
                    onClick={() => moveFrames({ distance: -distance })}
                >
                    Move {vertical ? 'Right' : 'Up'}
                </button>
            ) : null}
            {canMoveTrue ? (
                <button
                    className="sidebar-button empty"
                    onClick={() => moveFrames({ distance })}
                >
                    Move {vertical ? 'Left' : 'Down'}
                </button>
            ) : null}
        </>
    );
}

export default {
    title: "Move Frame",
    component: withSelectionContext(withActionContext(memo(MoveFrame))),
};

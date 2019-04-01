import React from 'react';
import { TitleBar } from '../../../../../../../../../components';
import { MOVE_FRAME } from '../../../ducks/actions';
import { SelectionContext } from '../../../contexts/SelectionContext';

export default {
    name: "Move Frame",
    component: MoveFrame,
};

function MoveFrame({
    elevation,
    updateElevation,
}) {
    return (
        <SelectionContext.Consumer>
            {({
                items: {
                    0: _frame,
                    0: {
                        vertical,
                        canMoveFirst,
                        canMoveSecond,
                    } = {},
                },
            }) => (
                    <>
                        <TitleBar
                            title={`Move ${
                                vertical ?
                                    'Vertical'
                                    :
                                    'Horizontal'
                                }`}
                        />
                        {canMoveSecond ? (
                            <button
                                className="sidebar-button empty"
                                onClick={() => updateElevation(MOVE_FRAME, {
                                    _frame,
                                    distance: -10,
                                })}
                            >
                                {vertical ? 'Right' : 'Up'}
                            </button>
                        ) : null}
                        {canMoveFirst ? (
                            <button
                                className="sidebar-button empty"
                                onClick={() => updateElevation(MOVE_FRAME, {
                                    _frame,
                                    distance: 10,
                                })}
                            >
                                {vertical ? 'Left' : 'Down'}
                            </button>
                        ) : null}
                    </>
                )}
        </SelectionContext.Consumer>
    );
}

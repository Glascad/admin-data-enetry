import React from 'react';
import { TitleBar } from '../../../../../../../../../components';
import { MOVE_FRAME } from '../../../ducks/actions';
import { SelectionContext } from '../../../contexts/SelectionContext';

export default {
    name: "Move Vertical",
    component: MoveVertical,
};

function MoveVertical({
    elevation,
    updateElevation,
}) {
    return (
        <SelectionContext.Consumer>
            {({
                items: [
                    _frame,
                ],
            }) => (
                    <>
                        <TitleBar
                            title="Move Vertical"
                        />
                        <button
                            className="sidebar-button empty"
                            onClick={() => updateElevation(MOVE_FRAME, {
                                _frame,
                                distance: 10,
                            })}
                        >
                            Left
                        </button>
                        <button
                            className="sidebar-button empty"
                            onClick={() => updateElevation(MOVE_FRAME, {
                                _frame,
                                distance: -10,
                            })}
                        >
                            Right
                        </button>
                    </>
                )}
        </SelectionContext.Consumer>
    );
}

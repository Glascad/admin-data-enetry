import React from 'react';
import { TitleBar } from '../../../../../../../../../components';
import { MOVE_FRAME } from '../../../ducks/actions';
import { SelectionContext } from '../../../contexts/SelectionContext';

export default {
    name: "Move Horizontal",
    component: MoveHorizontal,
};

function MoveHorizontal({
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
                            title="Move Horizontal"
                        />
                        <button
                            className="sidebar-button empty"
                            onClick={() => updateElevation(MOVE_FRAME, {
                                _frame,
                                distance: -10,
                            })}
                        >
                            Up
                        </button>
                        <button
                            className="sidebar-button empty"
                            onClick={() => updateElevation(MOVE_FRAME, {
                                _frame,
                                distance: 10,
                            })}
                        >
                            Down
                        </button>
                    </>
                )}
        </SelectionContext.Consumer>
    );
}

import React from 'react';

import { TitleBar } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import { SelectionContext } from '../../../contexts/SelectionContext';

import MoveFrame from '../shared/MoveFrame';
import { DELETE_FRAME } from '../../../ducks/actions';

export default {
    title: "Edit Horizontal",
    component: EditHorizontal,
};

function EditHorizontal({
    elevation,
    updateElevation,
    toggleStackedView
}) {
    return (
        <SelectionContext.Consumer>
            {({
                items: allFrames,
                items: {
                    0: firstFrame,
                    0: {
                        canDelete,
                        canMove,
                    } = {},
                    length,
                },
            }) => (
                    <>
                        <TitleBar
                            title="Edit Horizontal"
                        />
                        {length === 1 && canMove ? (
                            <div className="sidebar-group">
                                <SidebarLink
                                    toggleStackedView={toggleStackedView}
                                    View={MoveFrame}
                                />
                            </div>
                        ) : null}
                        {length === 1 && canDelete ? (
                            <button
                                className="sidebar-button danger"
                                onClick={() => updateElevation(DELETE_FRAME, { _frame: firstFrame })}
                            >
                                Delete Horizontal
                            </button>
                        ) : null}
                    </>
                )}
        </SelectionContext.Consumer>
    );
}

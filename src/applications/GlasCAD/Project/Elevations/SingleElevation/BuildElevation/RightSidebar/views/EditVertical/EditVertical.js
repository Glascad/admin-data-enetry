import React from 'react';

import { TitleBar } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import { SelectionContext } from '../../../contexts/SelectionContext';

import MoveFrame from '../shared/MoveFrame';
import { DELETE_FRAME } from '../../../ducks/actions';

export default {
    name: "Edit Vertical",
    component: EditVertical,
};

function EditVertical({
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
                    length,
                },
            }) => (
                    <>
                        <TitleBar
                            title="Edit Vertical"
                        />
                        <div className="sidebar-group">
                            <SidebarLink
                                toggleStackedView={toggleStackedView}
                                View={MoveFrame}
                            />
                        </div>
                        {length === 1 && firstFrame.canDelete ? (
                            <button
                                className="sidebar-button danger"
                                onClick={() => updateElevation(DELETE_FRAME, { _frame: firstFrame })}
                            >
                                Delete Vertical
                            </button>
                        ) : null}
                    </>
                )}
        </SelectionContext.Consumer>
    );
}

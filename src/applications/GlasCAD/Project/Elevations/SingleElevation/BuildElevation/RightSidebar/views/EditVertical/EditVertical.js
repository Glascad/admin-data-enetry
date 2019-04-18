import React, { PureComponent } from 'react';

import { TitleBar } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';

import MoveFrame from '../shared/MoveFrame';

class EditVertical extends PureComponent {

    render = () => {
        const {
            props: {
                selection: {
                    items: allFrames,
                },
                ACTIONS: {
                    deleteFrames,
                },
                toggleStackedView
            },
        } = this;

        return (
            <>
                <TitleBar
                    title="Edit Vertical"
                />
                {allFrames.every(({ canMove }) => canMove) ? (
                    <div className="sidebar-group">
                        <SidebarLink
                            toggleStackedView={toggleStackedView}
                            View={MoveFrame}
                        />
                    </div>
                ) : null}
                {allFrames.every(({ canDelete }) => canDelete) ? (
                    <button
                        className="sidebar-button danger"
                        onClick={deleteFrames}
                    >
                        Delete Vertical
                    </button>
                ) : null}
            </>
        );
    }
}

export default {
    title: "Edit Vertical",
    component: withSelectionContext(withActionContext(EditVertical)),
};

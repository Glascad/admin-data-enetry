import React, { PureComponent } from 'react';

import { TitleBar } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import MoveFrame from '../shared/MoveFrame';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';

class EditHorizontal extends PureComponent {

    render = () => {
        const {
            props: {
                selection: {
                    items: allFrames,
                },
                ACTIONS: {
                    deleteFrames,
                },
                toggleStackedView,
            },
        } = this;

        return (
            <>
                <TitleBar
                    title="Edit Horizontal"
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
                        Delete Horizontal
                    </button>
                ) : null}
            </>
        );
    }
}

export default {
    title: "Edit Horizontal",
    component: withSelectionContext(withActionContext(EditHorizontal)),
};

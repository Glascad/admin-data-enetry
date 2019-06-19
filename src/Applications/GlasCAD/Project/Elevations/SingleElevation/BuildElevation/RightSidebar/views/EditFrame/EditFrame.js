import React, { PureComponent } from 'react';

import { TitleBar } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import MoveFrame from '../shared/MoveFrame';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';

class EditFrame extends PureComponent {

    render = () => {
        const {
            props: {
                selection: {
                    items: allFrames,
                },
                ACTIONS: {
                    deleteFrames,
                    extendFrames,
                },
                toggleStackedView,
                vertical,
            },
        } = this;

        return (
            <>
                <TitleBar
                    title={`Edit ${
                        vertical ?
                            'Vertical'
                            :
                            'Horizontal'
                        }`}
                />
                {allFrames.every(({ canMove }) => canMove) ? (
                    <div className="sidebar-group">
                        <SidebarLink
                            toggleStackedView={toggleStackedView}
                            View={MoveFrame}
                        />
                    </div>
                ) : null}
                <div className="sidebar-group">
                    {allFrames.every(({ canExtendFirst }) => canExtendFirst) ? (
                        <button
                            className="sidebar-button action"
                            onClick={() => extendFrames(true)}
                        >
                            Extend Frame {vertical ? `Down` : `Left`}
                        </button>
                    ) : null}
                    {allFrames.every(({ canExtendLast }) => canExtendLast) ? (
                        <button
                            className="sidebar-button action"
                            onClick={() => extendFrames(false)}
                        >
                            Extend Frame {vertical ? `Up` : `Right`}
                        </button>
                    ) : null}
                </div>
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

export const EditVertical = {
    title: "Edit Vertical",
    component: withSelectionContext(withActionContext(props => <EditFrame {...props} vertical={true} />)),
};

export const EditHorizontal = {
    title: "Edit Horizontal",
    component: withSelectionContext(withActionContext(props => <EditFrame {...props} vertical={false} />)),
};


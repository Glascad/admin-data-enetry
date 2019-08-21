import React, { PureComponent } from 'react';

import * as Icons from '../../../../../../../../../assets/icons';

import { TitleBar } from '../../../../../../../../../components';

import SidebarLink from '../../../../../../../../../components/ui/RightSidebar/components/SidebarLink';

import MoveFrame from '../shared/MoveFrame';

import { withSelectionContext } from '../../../contexts/SelectionContext';
import { withActionContext } from '../../../contexts/ActionContext';
import { StepHead, RaiseCurb } from '../shared/AlterRoughOpening';

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

        const canMove = allFrames.every(({ canMove }) => canMove);

        const canExtendFirst = allFrames.every(({ canExtendFirst }) => canExtendFirst);

        const canExtendLast = allFrames.every(({ canExtendLast }) => canExtendLast);

        const canDelete = allFrames.every(({ canDelete }) => canDelete);

        const canStepHead = !vertical
            &&
            allFrames.every(_frame => _frame.firstContainers.every(({ canStepHead } = {}) => canStepHead));

        const canRaiseCurb = !vertical
            &&
            allFrames.every(_frame => _frame.secondContainers.every(({ canRaiseCurb } = {}) => canRaiseCurb));

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
                {canMove ? (
                    <div className="sidebar-group">
                        <SidebarLink
                            toggleStackedView={toggleStackedView}
                            View={MoveFrame}
                        />
                    </div>
                ) : null}
                {canExtendFirst || canExtendLast ? (
                    <div className="sidebar-group">
                        {canExtendLast ? (
                            <button
                                data-cy="extend-up-right"
                                className="sidebar-button empty"
                                onClick={() => extendFrames(false)}
                            >
                                {vertical ? (
                                    <>
                                        <Icons.ExtendMullionUp />
                                        <span>
                                            Extend Up
                                        </span>
                                    </>
                                ) : (
                                        <>
                                            <Icons.DuplicateHorizontalRight />
                                            <span>
                                                Duplicate Right
                                            </span>
                                        </>
                                    )}
                            </button>
                        ) : null}
                        {canExtendFirst ? (
                            <button
                                data-cy="extend-down-left"
                                className="sidebar-button empty"
                                onClick={() => extendFrames(true)}
                            >
                                {vertical ? (
                                    <>
                                        <Icons.ExtendMullionDown />
                                        <span>
                                            Extend Down
                                        </span>
                                    </>
                                ) : (
                                        <>
                                            <Icons.DuplicateHorizontalLeft />
                                            <span>
                                                Duplicate Left
                                            </span>
                                        </>
                                    )}
                            </button>
                        ) : null}
                    </div>
                ) : null}
                {canStepHead ? (
                    <div className="sidebar-group">
                        <SidebarLink
                            toggleStackedView={toggleStackedView}
                            View={StepHead}
                            Icon={Icons.StepHead}
                        />
                    </div>
                ) : null}
                {canRaiseCurb ? (
                    <div className="sidebar-group">
                        <SidebarLink
                            toggleStackedView={toggleStackedView}
                            View={RaiseCurb}
                            Icon={Icons.RaiseCurb}
                        />
                    </div>
                ) : null}
                {canDelete ? (
                    <button
                        className="sidebar-button danger"
                        onClick={deleteFrames}
                    >
                        Delete {vertical ? 'Vertical' : 'Horizontal'}
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


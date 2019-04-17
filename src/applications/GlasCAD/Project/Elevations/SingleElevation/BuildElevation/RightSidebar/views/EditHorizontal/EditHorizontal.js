import React, { PureComponent } from 'react';

import { TitleBar, withContext } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import { SelectionContext } from '../../../contexts/SelectionContext';

import MoveFrame from '../shared/MoveFrame';
import { DELETE_FRAME } from '../../../ducks/actions';

class EditHorizontal extends PureComponent {

    deleteFrames = () => {
        const {
            props: {
                context: {
                    itemsByRefId,
                },
                updateElevation,
            },
        } = this;

        const allRefIds = Object.keys(itemsByRefId);

        // const mergeContainersByRefIdAndDirection = (refId, direction) => {
        //     const {
        //         props: {
        //             elevation: {
        //                 getItemByRefId,
        //             },
        //         },
        //     } = this;

            
        // }

        const deleteFrameByRefId = refId => {

            // MUST ACCESS NEW ELEVATION OFF OF PROPS INSIDE TIMEOUT
            const {
                props: {
                    elevation: {
                        getItemByRefId,
                    },
                },
            } = this;

            const nextRefId = allRefIds[allRefIds.indexOf(refId) + 1];

            const _frame = getItemByRefId(refId);

            if (_frame) {
                // timeout allows rerendering between each deletion
                updateElevation(DELETE_FRAME, { _frame }, () => setTimeout(() => deleteFrameByRefId(nextRefId)));
            }
        };

        deleteFrameByRefId(allRefIds[0]);
    }

    render = () => {
        const {
            props: {
                context: {
                    items: allFrames,
                },
                toggleStackedView
            },
            deleteFrames,
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
    component: withContext(SelectionContext, undefined, { pure: true })(EditHorizontal),
};

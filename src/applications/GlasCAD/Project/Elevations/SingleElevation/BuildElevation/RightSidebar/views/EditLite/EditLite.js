import React, { PureComponent } from 'react';

import { SelectionContext } from '../../../contexts/SelectionContext';

import * as Icons from '../../../../../../../../../assets/icons';

import {
    TitleBar, withContext,
} from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import {
    MERGE_CONTAINERS,
    DELETE_CONTAINER,
} from '../../../ducks/actions';

import { DIRECTIONS } from '../../../../utils/recursive-elevation/directions';

// import EditInfill from './EditInfill';
// import AddVertical from '../add/AddVertical';
// import AddHorizontal from '../add/AddHorizontal';

class EditLite extends PureComponent {

    deleteContainers = () => {

        const {
            props: {
                context: {
                    itemsByRefId,
                },
                updateElevation,
            },
        } = this;

        const allRefIds = Object.keys(itemsByRefId);

        const deleteContainerByRefId = refId => {

            // MUST ACCESS NEW ELEVATION OFF OF PROPS INSIDE TIMEOUT
            const {
                props: {
                    elevation: {
                        getItemByRefId,
                    },
                },
            } = this;

            const nextRefId = allRefIds[allRefIds.indexOf(refId) + 1];

            const container = getItemByRefId(refId);

            if (container) {
                // timeout allows rerendering between each deletion
                updateElevation(DELETE_CONTAINER, { container }, () => setTimeout(() => deleteContainerByRefId(nextRefId)));
            }
        };

        deleteContainerByRefId(allRefIds[0]);
    }

    render = () => {
        const {
            props: {
                context: {
                    items: allContainers,
                    items: {
                        0: firstContainer,
                        length,
                    },
                },
                elevation,
                updateElevation,
                toggleStackedView,
            },
            deleteContainers,
        } = this;

        return (
            <>
                <div className="sidebar-group">
                    <TitleBar
                        title="Edit Lite"
                    />
                    <div className="sidebar-group">
                        <SidebarLink
                            toggleStackedView={toggleStackedView}
                            View={{ title: "Edit Infill", component: () => null }}
                            Icon={Icons.EditLite}
                        />
                    </div>
                    {length === 1 ?
                        Object.entries(DIRECTIONS)
                            .map(([key, direction]) => firstContainer.canMergeByDirection(...direction) ? (
                                <button
                                    key={direction.join('-')}
                                    className="sidebar-button empty"
                                    onClick={() => updateElevation(MERGE_CONTAINERS, {
                                        container: firstContainer,
                                        direction,
                                    })}
                                >
                                    {key === "UP" ? (
                                        <Icons.MergeUp />
                                    )
                                        :
                                        key === "DOWN" ? (
                                            <Icons.MergeDown />
                                        )
                                            :
                                            key === "LEFT" ? (
                                                <Icons.MergeLeft />
                                            )
                                                :
                                                key === "RIGHT" ? (
                                                    <Icons.MergeRight />
                                                ) : null}
                                    <span>
                                        Merge {key.slice(0, 1)}{key.slice(1).toLowerCase()}
                                    </span>
                                </button>
                            ) : null)
                        :
                        (
                            <>
                                {/* <button
                                    // key={vertical}
                                    className="sidebar-button empty"
                                    onClick={() => null}
                                >
                                    Merge
                                            {
                                        // vertical ? 'vertically' : 'horizontally'
                                    }
                                </button> */}

                            </>
                        )}
                </div>
                <div className="sidebar-group">
                    <SidebarLink
                        toggleStackedView={toggleStackedView}
                        View={{ title: "Add Vertical", component: () => null }}
                        Icon={Icons.AddVertical}
                    />
                    <SidebarLink
                        toggleStackedView={toggleStackedView}
                        View={{ title: "Add Horizontal", component: () => null }}
                        Icon={Icons.AddHorizontal}
                    />
                </div>
                {length > 0 && allContainers.every(({ canDelete }) => canDelete) ? (
                    <button
                        className="sidebar-button danger"
                        onClick={deleteContainers}
                    >
                        Delete Lite{length > 1 ? 's' : ''}
                    </button>
                ) : null}
            </>
        );
    }
}

export default {
    title: "Edit Lite",
    component: withContext(SelectionContext)(EditLite),
};

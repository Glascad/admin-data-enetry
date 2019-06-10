import React, { PureComponent } from 'react';

import { withSelectionContext } from '../../../contexts/SelectionContext';

import * as Icons from '../../../../../../../../../assets/icons';

import {
    TitleBar,
} from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import { DIRECTIONS } from '../../../../utils/recursive-elevation/directions';

import { withActionContext } from '../../../contexts/ActionContext';

import { AddVertical, AddHorizontal } from '../shared/AddIntermediate';

// import EditInfill from './EditInfill';
// import AddVertical from '../add/AddVertical';
// import AddHorizontal from '../add/AddHorizontal';

class EditLite extends PureComponent {

    render = () => {
        const {
            props: {
                selection: {
                    items: allContainers,
                    items: {
                        0: firstContainer,
                        length,
                    },
                },
                ACTIONS: {
                    deleteContainers,
                    mergeContainers,
                },
                elevation,
                updateElevation,
                toggleStackedView,
            },
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
                                    onClick={() => mergeContainers({
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
                        View={AddVertical}
                        Icon={Icons.AddVertical}
                    />
                    <SidebarLink
                        toggleStackedView={toggleStackedView}
                        View={AddHorizontal}
                        Icon={Icons.AddHorizontal}
                    />
                </div>
                {allContainers.every(({ canDelete }) => canDelete) ? (
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
    component: withSelectionContext(withActionContext(EditLite)),
};

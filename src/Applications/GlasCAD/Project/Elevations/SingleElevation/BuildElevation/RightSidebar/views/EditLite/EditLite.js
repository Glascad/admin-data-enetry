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

        const mergableDirections = Object.entries(DIRECTIONS)
            .filter(([key, direction]) => firstContainer.canMergeByDirection(...direction));

        return (
            <>
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
                    mergableDirections.length ? (
                        <div className="sidebar-group">
                            {
                                mergableDirections.map(([key, direction]) => (
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
                                ))
                            }
                        </div>
                    ) : null : (
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
                <div className="sidebar-group">
                    {allContainers.every(({ canAddVertical }) => canAddVertical) ? (
                        <SidebarLink
                            toggleStackedView={toggleStackedView}
                            View={AddVertical}
                            Icon={Icons.AddVertical}
                        />
                    ) : null}
                    {allContainers.every(({ canAddHorizontal }) => canAddHorizontal) ? (
                        <SidebarLink
                            toggleStackedView={toggleStackedView}
                            View={AddHorizontal}
                            Icon={Icons.AddHorizontal}
                        />
                    ) : null}
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

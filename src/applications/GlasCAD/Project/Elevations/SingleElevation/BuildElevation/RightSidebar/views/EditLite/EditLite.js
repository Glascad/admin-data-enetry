import React from 'react';

import { SelectionContext } from '../../../contexts/SelectionContext';

import * as Icons from '../../../../../../../../../assets/icons';

import {
    TitleBar,
} from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import { MERGE_CONTAINERS } from '../../../ducks/actions';
import { DIRECTIONS } from '../../../../utils/recursive-elevation/directions';

// import EditInfill from './EditInfill';
// import AddVertical from '../add/AddVertical';
// import AddHorizontal from '../add/AddHorizontal';

export default {
    name: "Edit Lite",
    component: EditLite,
};

function EditLite({
    elevation,
    updateElevation,
    toggleStackedView,
}) {
    return (
        <SelectionContext.Consumer>
            {({
                items: allContainers,
                items: {
                    0: firstContainer,
                    length,
                },
            }) => (
                    <>
                        <div className="sidebar-group">
                            <TitleBar
                                title="Edit Lite"
                            />
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
                                                    key === "LEFT" ?
                                                        <Icons.MergeLeft />
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
                                        <button
                                            // key={vertical}
                                            className="sidebar-button empty"
                                            onClick={() => null}
                                        >
                                            Merge
                                            {/* {vertical ? 'vertically' : 'horizontally'} */}
                                        </button>

                                    </>
                                )}
                        </div>
                        <div className="sidebar-group">
                            <SidebarLink
                                toggleStackedView={toggleStackedView}
                                View={{ name: "Add Vertical", component: () => null }}
                                Icon={Icons.AddVertical}
                            />
                            <SidebarLink
                                toggleStackedView={toggleStackedView}
                                View={{ name: "Add Horizontal", component: () => null }}
                                Icon={Icons.AddHorizontal}
                            />
                        </div>
                        <div className="sidebar-group">
                            <SidebarLink
                                toggleStackedView={toggleStackedView}
                                View={{ name: "Edit Infill", component: () => null }}
                                Icon={Icons.EditInfill}
                            />
                        </div>
                    </>
                )}
        </SelectionContext.Consumer>
    );
}

import React from 'react';

import { SelectionContext } from '../../../contexts/SelectionContext';

import {
    TitleBar,
} from '../../../../../../../../../components';

import { MERGE_CONTAINERS } from '../../../ducks/actions';
import { DIRECTIONS } from '../../../../utils/recursive-elevation/directions';
import SidebarLink from '../../components/SidebarLink';

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
                                            Merge {key.slice(0, 1)}{key.slice(1).toLowerCase()}
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
                            />
                            <SidebarLink
                                toggleStackedView={toggleStackedView}
                                View={{ name: "Add Horizontal", component: () => null }}
                            />
                        </div>
                        <div className="sidebar-group">
                            <SidebarLink
                                toggleStackedView={toggleStackedView}
                                View={{ name: "Edit Infill", component: () => null }}
                            />
                        </div>
                    </>
                )}
        </SelectionContext.Consumer>
    );
}

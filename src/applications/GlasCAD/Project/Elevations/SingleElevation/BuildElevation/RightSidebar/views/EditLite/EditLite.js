import React from 'react';

import { SelectionContext } from '../../../contexts/SelectionContext';

import {
    TitleBar, DoubleArrow,
} from '../../../../../../../../../components';

import { MERGE_CONTAINERS } from '../../../ducks/actions';
import RecursiveElevation from '../../../../utils/recursive-elevation/elevation';
import { DIRECTIONS } from '../../../../utils/recursive-elevation/directions';
import SidebarLink from '../../components/SidebarLink';

// import EditInfill from './EditInfill';
// import AddVertical from '../add/AddVertical';
// import AddHorizontal from '../add/AddHorizontal';

export default {
    name: "Edit Lite",
    component: EditLite,
};

const groups = [
    {

    },
    {

    }
]

function EditLite({
    elevation,
    updateElevation,
    toggleStackedView,
}) {
    return (
        <SelectionContext.Consumer>
            {({
                items: [container],
            }) => {
                if (!(container instanceof RecursiveElevation.RecursiveContainer)) return null;
                else return (
                    <>
                        <div className="sidebar-group">
                            <TitleBar
                                title="Edit Lite"
                            />
                            {Object.entries(DIRECTIONS)
                                .map(([key, direction]) => container.canMergeByDirection(...direction) ? (
                                    <button
                                        key={direction.join('-')}
                                        className="sidebar-button empty"
                                        onClick={() => updateElevation(MERGE_CONTAINERS, {
                                            container,
                                            direction,
                                        })}
                                    >
                                        Merge {key.slice(0, 1)}{key.slice(1).toLowerCase()}
                                    </button>
                                ) : null)}
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
                );
            }}
        </SelectionContext.Consumer>
    );
}

import React from 'react';

import { SelectionContext } from '../../../contexts/SelectionContext';

import {
    TitleBar,
} from '../../../../../../../../../components';

import { MERGE_CONTAINERS } from '../../../ducks/actions';
import RecursiveElevation from '../../../../utils/recursive-elevation/elevation';
import { DIRECTIONS } from '../../../../utils/recursive-elevation/directions';

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
    toggleView,
}) {
    return (
        <SelectionContext.Consumer>
            {({
                selection: {
                    items: [container],
                },
            }) => {
                if (!(container instanceof RecursiveElevation.RecursiveContainer)) return null;
                else return (
                    <>
                        <div className="sidebar-group">
                            <TitleBar
                                title="Edit Lite"
                            />
                            <div className="sidebar-group">
                                <button
                                    className="sidebar-button empty"
                                    onClick={() => toggleView({ name: "Edit Infill", component: () => null })}
                                >
                                    Edit Infill
                                </button>
                            </div>
                            {Object.entries(DIRECTIONS)
                                .map(([key, direction]) => {
                                    const canMerge = container.canMergeByDirection(...direction);
                                    return (
                                        <button
                                            key={direction.join('-')}
                                            className={`sidebar-button empty ${canMerge ? '' : 'disabled'}`}
                                            onClick={canMerge ?
                                                () => updateElevation(MERGE_CONTAINERS, {
                                                    container,
                                                    direction,
                                                })
                                                :
                                                undefined}
                                        >
                                            Merge {key.slice(0, 1)}{key.slice(1).toLowerCase()}
                                        </button>
                                    );
                                })}
                        </div>
                        <div className="sidebar-group">
                            <button
                                className="sidebar-button empty"
                                onClick={() => toggleView({ name: "Add Vertical", component: () => null })}
                                >
                                Add Vertical
                            </button>
                            <button
                                className="sidebar-button empty"
                                onClick={() => toggleView({ name: "Add Horizontal", component: () => null })}
                            >
                                Add Horizontal
                            </button>
                        </div>
                    </>
                );
            }}
        </SelectionContext.Consumer>
    );
}

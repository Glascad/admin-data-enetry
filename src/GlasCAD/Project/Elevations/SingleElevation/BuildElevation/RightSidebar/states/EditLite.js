import React from 'react';

import { SelectionContext } from '../../SelectionContext';

import {
    TitleBar,
    Input,
} from '../../../../../../../components';

import ACTIONS from '../../../utils/ducks/actions';

import { DIRECTIONS } from '../../../utils/recursive-elevation/directions';

export default {
    name: "Edit Lite",
    component: EditLite,
};

function EditLite({
    elevation,
    updateElevation,
}) {
    return (
        <SelectionContext.Consumer>
            {({
                selection: {
                    items: [
                        refId,
                    ],
                },
            }) => {
                const container = elevation.getItemByRefId(refId);

                if (!container) return null;

                return (
                    <>
                        <div className="sidebar-group">
                            <TitleBar
                                title="Edit Lite"
                            />
                            {Object.entries(DIRECTIONS).map(([key, direction]) => {
                                const canMerge = container._getCanMergeByDirection(...direction);
                                return (
                                    <button
                                        className={`sidebar-button empty ${canMerge ? '' : 'disabled'}`}
                                        onClick={canMerge ?
                                            () => updateElevation(ACTIONS.MERGE_CONTAINERS, {
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
                    </>
                );
            }}
        </SelectionContext.Consumer>
    );
}

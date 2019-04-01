import React from 'react';

import { TitleBar } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import { SelectionContext } from '../../../contexts/SelectionContext';

import MoveHorizontal from './MoveHorizontal';

export default {
    name: "Edit Horizontal",
    component: EditHorizontal,
};

function EditHorizontal({
    elevation,
    updateElevation,
    toggleStackedView
}) {
    return (
        <SelectionContext.Consumer>
            {({ }) => (
                <>
                    <TitleBar
                        title="Edit Horizontal"
                    />
                    <div className="sidebar-group">
                        <SidebarLink
                            toggleStackedView={toggleStackedView}
                            View={MoveHorizontal}
                        />
                    </div>
                    <button
                        className="sidebar-button danger"
                        onClick={() => { }}
                    >
                        Delete Horizontal
                    </button>
                </>
            )}
        </SelectionContext.Consumer>
    );
}

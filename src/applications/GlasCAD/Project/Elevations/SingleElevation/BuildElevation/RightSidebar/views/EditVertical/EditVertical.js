import React from 'react';

import { TitleBar } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import { SelectionContext } from '../../../contexts/SelectionContext';

import MoveVertical from './MoveVertical';

export default {
    name: "Edit Vertical",
    component: EditVertical,
};

function EditVertical({
    elevation,
    updateElevation,
    toggleView
}) {
    return (
        <SelectionContext.Consumer>
            {({ }) => (
                <>
                    <TitleBar
                        title="Edit Vertical"
                    />
                    <div className="sidebar-group">
                        <SidebarLink
                            toggleView={toggleView}
                            View={MoveVertical}
                        />
                    </div>
                    <button
                        className="sidebar-button danger"
                        onClick={() => { }}
                    >
                        Delete Vertical
                    </button>
                </>
            )}
        </SelectionContext.Consumer>
    );
}

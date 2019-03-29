import React from 'react';

import { TitleBar } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';
import ZoomAndPan from './ZoomAndPan';


export default {
    name: "Visibility Settings",
    component: Settings,
};

function Settings({
    elevation,
    updateElevation,
    toggleView,
}) {
    return (
        <div className="sidebar-group">
            <TitleBar
                title="Elevation Settings"
            />
            <SidebarLink
                toggleView={toggleView}
                View={ZoomAndPan}
            />
        </div>
    );
}

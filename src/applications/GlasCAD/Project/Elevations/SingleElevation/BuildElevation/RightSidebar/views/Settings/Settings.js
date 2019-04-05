import React from 'react';

import { TitleBar } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';
import ZoomAndPan from './ZoomAndPan';


export default {
    title: "Visibility Settings",
    component: Settings,
};

function Settings({
    elevation,
    updateElevation,
    toggleStackedView,
}) {
    return (
        <>
            <TitleBar
                title="Elevation Settings"
            />
            <div className="sidebar-group">
                <SidebarLink
                    toggleStackedView={toggleStackedView}
                    View={ZoomAndPan}
                />
            </div>
        </>
    );
}

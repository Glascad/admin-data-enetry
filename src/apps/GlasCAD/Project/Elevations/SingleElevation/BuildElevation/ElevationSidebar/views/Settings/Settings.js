import React from 'react';

import { withRouter, Link } from 'react-router-dom';

import { TitleBar, BugReport } from '../../../../../../../../../components';

import SidebarLink from '../../../../../../../../../components/ui/RightSidebar/SidebarLink';

import ZoomAndPan from './ZoomAndPan';
import AllIcons from './AllIcons';
import SampleElevations from "./SampleElevations";
import ReportBug from "./ReportBug";
import HotKeys from "./HotKeys";

export default {
    title: "Visibility Settings",
    component: withRouter(Settings),
};

function Settings({
    states,
    elevation,
    updateElevation,
    toggleStackedView,
    location: {
        pathname,
        search,
    },
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
                <SidebarLink
                    toggleStackedView={toggleStackedView}
                    View={HotKeys}
                />
                <SidebarLink
                    toggleStackedView={toggleStackedView}
                    View={AllIcons}
                />
                <SidebarLink
                    toggleStackedView={toggleStackedView}
                    View={SampleElevations}
                />
                <SidebarLink
                    className="danger"
                    toggleStackedView={toggleStackedView}
                    View={ReportBug}
                />
            </div>
        </>
    );
}

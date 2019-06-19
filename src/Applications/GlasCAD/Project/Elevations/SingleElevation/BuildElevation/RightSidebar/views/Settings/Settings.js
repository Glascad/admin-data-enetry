import React from 'react';

import { withRouter, Link } from 'react-router-dom';

import { TitleBar, BugReport } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import ZoomAndPan from './ZoomAndPan';
import AllIcons from './AllIcons';
import SampleElevations from "./SampleElevations";
import ReportBug from "./ReportBug";
import { parseSearch } from '../../../../../../../../../utils';

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
    console.log({ states });
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
                    View={AllIcons}
                />
                <SidebarLink
                    toggleStackedView={toggleStackedView}
                    View={SampleElevations}
                />
                <SidebarLink
                    toggleStackedView={toggleStackedView}
                    View={ReportBug}
                />
            </div>
        </>
    );
}

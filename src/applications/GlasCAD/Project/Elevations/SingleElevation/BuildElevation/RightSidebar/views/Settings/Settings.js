import React from 'react';

import { withRouter, Link } from 'react-router-dom';

import { TitleBar } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import ZoomAndPan from './ZoomAndPan';
import AllIcons from './AllIcons';
import { parseSearch } from '../../../../../../../../../utils';

export default {
    title: "Visibility Settings",
    component: withRouter(Settings),
};

function Settings({
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
                    View={AllIcons}
                />
            </div>
            <div className="sidebar-group">
                {['sample1', 'sample2', 'sample3', 'sample3Special'].map(sampleElevation => (
                    <Link
                        key={sampleElevation}
                        to={`${pathname}${parseSearch(search).update({ sampleElevation })}`}
                    >
                        <button
                            className="sidebar-button empty"
                        >
                            {sampleElevation}
                        </button>
                    </Link>
                ))}
            </div>
        </>
    );
}

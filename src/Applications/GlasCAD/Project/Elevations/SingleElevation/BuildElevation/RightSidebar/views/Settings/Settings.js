import React from 'react';

import { withRouter, Link } from 'react-router-dom';

import { TitleBar, BugReport } from '../../../../../../../../../components';

import SidebarLink from '../../components/SidebarLink';

import ZoomAndPan from './ZoomAndPan';
import AllIcons from './AllIcons';
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
            </div>
            <div className="sidebar-group">
                {['sample1', 'sample1Special', 'sample2', 'sample3', 'sample3Special', 'sample4'].map(sampleElevation => (
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
            <div className="sidebar-group">
                <BugReport
                    state={states.map(({ recursiveElevation, ...state }) => state)}
                    inputClassName="sidebar-button"
                    buttonClassName="sidebar-button primary"
                />
            </div>
        </>
    );
}

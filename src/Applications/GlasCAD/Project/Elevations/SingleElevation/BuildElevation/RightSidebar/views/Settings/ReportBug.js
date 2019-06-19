import React from 'react';

import { TitleBar, BugReport } from '../../../../../../../../../components';
import { withRouter, Link } from 'react-router-dom';
import { parseSearch } from '../../../../../../../../../utils';

export default {
    title: "Report Bug",
    component: withRouter(Settings),
};

function Settings({
    states,
}) {
    return (
        <>
            <TitleBar
                title="Report Bug"
            />
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

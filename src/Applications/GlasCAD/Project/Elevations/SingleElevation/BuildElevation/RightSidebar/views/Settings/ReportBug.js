import React, { useState } from 'react';

import { TitleBar, BugReport } from '../../../../../../../../../components';

import './ReportBug.scss';

export default {
    title: "Report Bug",
    component: ReportBug,
};

function ReportBug({
    states,
}) {
    const [complete, setComplete] = useState(false);
    return (
        <>
            <TitleBar
                title="Report Bug"
            />
            <div
                id="ReportBug"
                className="sidebar-group"
            >
                {complete ? (
                    <>
                        <button className="sidebar-button empty">
                            Thank you for your report.
                        </button>
                        <button
                            className="sidebar-button danger"
                            onClick={() => setComplete(false)}
                        >
                            Submit another
                        </button>
                    </>
                ) : (
                        <BugReport
                            state={states.map(({ recursiveElevation, ...state }) => state)}
                            buttonClassName="sidebar-button danger"
                            onComplete={() => setComplete(true)}
                        />
                    )}
            </div>
        </>
    );
}

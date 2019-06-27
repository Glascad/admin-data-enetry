import React, { useState } from 'react';

import { TitleBar, BugReport } from '../../../../../../../../../components';

import './ReportBug.scss';

export default {
    title: "Report Bug",
    component: ReportBug,
};

function ReportBug({
    states,
    currentIndex,
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
                            state={states.slice(0, currentIndex + 1).map(({ recursiveElevation, ...state }) => state)}
                            smallerState={[states[0], states[currentIndex]].map(({ recursiveElevation, ...state }) => state)}
                            smallestState={[states[currentIndex]].map(({ recursiveElevation, ...state }) => state)}
                            buttonClassName="sidebar-button danger"
                            onComplete={() => setComplete(true)}
                        />
                    )}
            </div>
        </>
    );
}

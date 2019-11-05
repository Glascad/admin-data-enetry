import React from 'react';
import { Link } from 'react-router-dom';
import ElevationPreview from '../Elevations/ElevationPreview/ElevationPreview';
import { parseSearch } from '../../../../utils';
import RecursiveElevation from '../Elevations/SingleElevation/utils/recursive-elevation/elevation';
import renderPreview from '../Elevations/ElevationPreview/render-preview';
import { TitleBar } from '../../../../components';

import './ElevationViewer.scss';

export default function ElevationViewer({
    location: {
        search,
    },
    match: {
        path,
    },
    bugReports,
    bugReports: {
        length,
    },
}) {
    // console.log(arguments[0]);

    const { bugId } = parseSearch(search);

    const currentBugReport = bugReports.find(({ id }) => id === +bugId) || {};

    const states = JSON.parse(currentBugReport.state || "[]");

    const currentIndex = bugReports.indexOf(currentBugReport);

    const prevId = (bugReports[(currentIndex - 1 + length) % length] || {}).id;
    const nextId = (bugReports[(currentIndex + 1) % length] || {}).id;

    const {
        username,
        report,
        timestamp,
    } = currentBugReport;

    const time = new Date(timestamp);

    // console.log({ states });

    // console.log({ currentBugReport });

    return (
        <>
            <TitleBar
                title="Elevation Bug"
                snailTrail={[
                    username,
                    timestamp ? (
                        `${
                        time.getMonth() + 1
                        }/${
                        time.getDate()
                        }/${
                        time.getFullYear()
                        } - ${
                        time.getHours()
                        }:${
                        (n => n < 10 ? `0${n}` : n)(time.getMinutes())
                        }`
                    ) : '',
                ]}
                right={(
                    <Link
                        to={`${path.replace(/elevation-viewer/, 'bug-list')}${search}`}
                    >
                        <button>
                            Back
                        </button>
                    </Link>
                )}
            />
            <div id="ElevationViewer" className="card">
                <p>
                    {report}
                </p>
                <div>
                    {states
                        .slice()
                        .reverse()
                        .map(({ mergedElevation }) => (
                            <ElevationPreview
                                preview={renderPreview(
                                    new RecursiveElevation(mergedElevation),
                                    {
                                        renderText: true,
                                        renderCustomRoughOpenings: true,
                                    },
                                )}
                            />
                        ))
                    }
                </div>
                <div className="bottom-buttons">
                    <Link
                        to={`${path}${parseSearch(search).update({ bugId: prevId })}`}
                    >
                        <button>
                            Previous
                        </button>
                    </Link>
                    <Link
                        to={`${path}${parseSearch(search).update({ bugId: nextId })}`}
                    >
                        <button>
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

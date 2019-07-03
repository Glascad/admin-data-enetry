import React from 'react';

import { TitleBar } from '../../../../../../../../../components';
import { withRouter, Link } from 'react-router-dom';
import { parseSearch } from '../../../../../../../../../utils';
import { SAMPLE_ELEVATIONS } from '../../../../SingleElevation';

export default {
    title: "Sample Elevations",
    component: withRouter(sampleElevations),
};

function sampleElevations({
    location: {
        pathname,
        search,
    },
}) {
    return (
        <>
            <TitleBar
                title="Sample Elevations"
            />
            <div className="sidebar-group">
                {Object.keys(SAMPLE_ELEVATIONS).map(sampleElevation => (
                    <Link
                        key={sampleElevation}
                        to={`${
                            pathname
                            }${
                            parseSearch(search)
                                .update({ sampleElevation })
                                .remove("elevationId")
                            }`}
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

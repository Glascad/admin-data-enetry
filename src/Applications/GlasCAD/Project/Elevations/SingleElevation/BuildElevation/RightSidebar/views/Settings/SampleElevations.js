import React from 'react';

import { TitleBar } from '../../../../../../../../../components';
import { withRouter, Link } from 'react-router-dom';
import { parseSearch } from '../../../../../../../../../utils';

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
        </>
    );
}

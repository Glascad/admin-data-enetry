import React from 'react';

import { Link } from 'react-router-dom';

import {
    TitleBar,
} from '../../../../../../components';

import {
    parseSearch,
} from '../../../../../../utils';

export default function EditElevation({
    match: {
        path,
    },
    location: {
        search,
    },
    elevation,
}) {
    return (
        <>
            <TitleBar
                title="Edit Elevation"
                right={(
                    <Link
                        to={`${
                            path.replace(/\/elevation\/edit-elevation/, '')
                            }${
                            parseSearch(search).remove('elevationId')
                            }`}
                    >
                        <button className="action">
                            Change Elevation
                        </button>
                    </Link>
                )}
            />
            <Link
                to={`${path.replace(/edit/, 'build')}${search}`}
            >
                Build
            </Link>
        </>
    );
}

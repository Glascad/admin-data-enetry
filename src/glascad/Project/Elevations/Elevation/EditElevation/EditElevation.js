import React from 'react';

import { Link } from 'react-router-dom';

import {
    TitleBar,
} from '../../../../../components';

import {
    parseSearch,
} from '../../../../../utils';

export default function EditElevation({
    elevation,
    match: {
        path,
    },
    location: {
        search,
    },
}) {
    return (        
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
    );
}

import React from 'react';

import { Link } from 'react-router-dom';

import {
    ListWrapper,
} from '../../../components';

export default function Elevations({
    location: {
        search,
    },
    match: {
        path,
    },
    queryStatus: {
        _project: {
            name = "",
            _elevations = [],
        } = {},
    },
}) {
    return (
        <div className="card">
            <ListWrapper
                titleBar={{
                    title: "Elevations",
                    selections: [name]
                }}
                items={_elevations}
                defaultPillProps={{
                    type: "tile",
                    align: "left",
                }}
                mapPillProps={({ id, name }) => ({
                    title: name,
                    hoverButtons: [
                        {
                            children: (
                                <Link
                                    to={`${path}/elevations${search.replace(/(&{0,1}elevationId=\d+)|$/,
                                        `elevationId=${id}`)}`}
                                >
                                    Edit
                                </Link>
                            ),
                        },
                    ]
                })}
                onDelete={() => { }}
                addButton={{
                    type: "large",
                    otherButtons: [
                        {
                            children: (
                                <Link
                                    to={`${path}/elevation${search.replace(/&{0,1}elevationId=\d+/, '')}`}
                                >
                                    Create
                                </Link>
                            ),
                        },
                        {
                            children: "Copy",
                        },
                    ],
                }}
            />
        </div>
    );
}

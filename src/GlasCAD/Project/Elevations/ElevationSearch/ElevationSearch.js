import React from 'react';

import { Link } from 'react-router-dom';

import {
    ListWrapper,
} from '../../../../components';

import parseSearch from '../../../../utils/parse-search';

export default function ElevationSearch({
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
                                    to={`${path}/elevation/build-elevation${parseSearch(search)
                                        .update({ elevationId: id })}`}
                                >
                                    Build
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
                                    to={`${path}/elevation/create-elevation${parseSearch(search)
                                        .remove("elevationId")}`}
                                >
                                    Create
                                </Link>
                            ),
                        },
                        {
                            text: "Copy",
                        },
                    ],
                }}
            />
        </div>
    );
}

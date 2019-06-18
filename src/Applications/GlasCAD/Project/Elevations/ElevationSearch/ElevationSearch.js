import React from 'react';

import { Link } from 'react-router-dom';

import {
    ListWrapper, ApolloWrapper,
} from '../../../../../components';

import { parseSearch } from '../../../../../utils';

import deleteElevation from './delete-elevation';

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
        <ApolloWrapper
            mutations={{ deleteElevation }}
        >
            {({
                mutations: {
                    deleteElevation,
                },
            }) => (
                    <div className="card">
                        <ListWrapper
                            identifier="id"
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
                            circleButton={{
                                type: "tile",
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
                            onDelete={({ arguments: { id } }) => deleteElevation({ elevationId: id })}
                            deleteModal={{
                                name: "Elevation",
                            }}
                        />
                    </div>
                )}
        </ApolloWrapper>
    );
}
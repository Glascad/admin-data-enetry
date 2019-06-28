import React from 'react';

import { Link } from 'react-router-dom';

import {
    ListWrapper,
    ApolloWrapper,
    Ellipsis,
    useMutation,
} from '../../../../../components';

import { parseSearch } from '../../../../../utils';

import deleteElevationMutation from './delete-elevation';

import ElevationPreview from '../ElevationPreview/ElevationPreview';

export default function ElevationSearch({
    history,
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
    const [deleteElevation, deleteResult, deleting] = useMutation(deleteElevationMutation);

    // console.log({ deleting });

    return (
        <div id="ElevationSearch" className="card">
            <ListWrapper
                identifier="id"
                titleBar={{
                    title: "Elevations",
                    selections: [name || <Ellipsis />]
                }}
                items={_elevations}
                defaultPillProps={{
                    type: "tile",
                    align: "left",
                }}
                mapPillProps={({ id, name, preview }) => ({
                    title: name,
                    hoverButtons: [
                        {
                            children: (
                                <Link
                                    to={`${path}/elevation/build-elevation${parseSearch(search)
                                        .update({ elevationId: id })}`}
                                >
                                    Load
                                </Link>
                            ),
                        },
                    ],
                    children: (
                        
                        <ElevationPreview
                            preview={preview}
                        />
                    )
                })}
                circleButton={{
                    type: "tile",
                    onClick: () => history.push(`${path}/elevation/create-elevation${parseSearch(search)
                        .remove("elevationId")}`),
                    // otherButtons: [
                    //     {
                    //         children: (
                    //             <Link
                    //                 to={`${path}/elevation/create-elevation${parseSearch(search)
                    //                     .remove("elevationId")}`}
                    //             >
                    //                 Create
                    //             </Link>
                    //         ),
                    //     },
                    // {
                    //     text: "Copy",
                    // },
                    // ],
                }}
                onDelete={({ arguments: { id } }) => deleteElevation({ elevationId: id })}
                deleteModal={{
                    name: "Elevation",
                    finishing: deleting,
                }}
            />
        </div>
    );
}

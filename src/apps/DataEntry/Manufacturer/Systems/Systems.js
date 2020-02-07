import gql from 'graphql-tag';
import React from 'react';
import { Link } from 'react-router-dom';
import { ListWrapper, TitleBar, useApolloMutation } from '../../../../components';
import { parseSearch } from '../../../../utils';

const deleteSystemMutation = gql`mutation DeleteSystem($nodeId: ID!) {
    deleteSystem(
        input: {
            nodeId: $nodeId
        }
    ) {
        system {
            nodeId
            id
        }
    }
}`;

export default function Systems({
    history,
    location: {
        search,
    },
    match: {
        path,
    },
    _manufacturer: {
        name: mnfgName,
        _systems = [],
    } = {},
}) {
    const { manufacturerId } = parseSearch(search);
    const variables = { manufacturerId: +manufacturerId };
    const [deleteSystem] = useApolloMutation(deleteSystemMutation);
    return (
        <div className="card">
            <TitleBar
                title="Systems"
                snailTrail={[mnfgName]}
            />
            <ListWrapper
                // title="Search Results"
                items={_systems}
                defaultPillProps={{
                    type: "tile",
                    align: "left",
                    footer: "Last Updated: ...",
                    selectable: false,
                }}
                mapPillProps={({
                    id,
                    name: systemName,
                }) => ({
                    title: systemName || 'Untitled',
                    hoverButtons: [
                        {
                            children: (
                                <Link
                                    data-cy={`load-system-${systemName}`}
                                    to={path.replace(/manufacturer.*/,
                                        `system/build${
                                        parseSearch(search).update({ systemId: id })
                                        }`)}
                                >
                                    Load
                                </Link>
                            ),
                        },
                        {
                            children: (
                                <Link
                                    data-cy={`system-info-${systemName}`}
                                    to={path.replace(/manufacturer.*/,
                                        `system/info${
                                        parseSearch(search).update({ systemId: id })
                                        }`)}
                                >
                                    Info
                                </Link>
                            ),
                        },
                    ],
                })}
                deleteModal={{
                    name: "System",
                }}
                onDelete={({ arguments: { nodeId } }) => deleteSystem({ nodeId })}
                circleButton={{
                    "data-cy": 'new-system',
                    type: "tile",
                    onClick: () => history.push(`${
                        path.replace(/manufacturer.*/, "system/info")
                        }${
                        parseSearch(search).update({ systemId: null })
                        }`),
                }}
            />
        </div>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';
import {
    Input,
    ApolloWrapper,
    ListWrapper,
    StateManager,
    TitleBar,
    useQuery,
    useMutation,
} from '../../../../components';
import F from '../../../../schemas';
import gql from 'graphql-tag';
import { parseSearch } from '../../../../utils';

const deleteSystemMutation = gql`mutation DeleteSystem($nodeId:ID!) {
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

Systems.navigationOptions = {
    name: "Systems",
    path: "/system-search",
};

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
    const [deleteSystem] = useMutation({ mutation: deleteSystemMutation });
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
                                    to={path.replace(/system-search.*/,
                                        `single-system/build${
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
                                    to={path.replace(/system-search.*/,
                                        `single-system/info${
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
                    type: "tile",
                    onClick: () => history.push(`${
                        path.replace(/manufacturer.*/, "system/info")
                        }${
                        search
                        }`),
                }}
            />
        </div>
    );
}

import gql from 'graphql-tag';
import React from 'react';
import { Link } from 'react-router-dom';
import { CollapsibleTitle, ListWrapper, Navigator, useApolloMutation } from '../../../../components';
import { parseSearch } from '../../../../utils';
import SystemSet from './SystemSet/SystemSet';

ProjectSetsRouter.navigationOptions = {
    path: "/sets",
};

const deleteSystemSetMutation = gql`
        mutation DeleteSystemSetById($id: Int!) {
            deleteSystemSetById(
                input: {
                    id: $id
                }
            ) {
               systemSet{
                    id,
                    name,
                    systemId,
                    projectId,
                    nodeId,
                    }
            }
        }
    `;

export default function ProjectSetsRouter(props) {
    return (
        <Navigator
            routes={{
                ProjectSets,
                SystemSet,
            }}
            routeProps={props}
        />
    );
}

ProjectSets.navigationOptions = {
    path: "/all",
};

function ProjectSets({
    queryResult: {
        _project: {
            _systemSets = [],
        } = {},
    },
    history,
    location: {
        search,
    },
    match: {
        path,
    },
}) {
    const [deleteSystemSet, deleteResult] = useApolloMutation(deleteSystemSetMutation);

    console.log(arguments[0]);

    return (
        <div className="card">
            <CollapsibleTitle
                titleBar={{
                    title: "System Sets",
                }}
            >
                <ListWrapper
                    identifier="id"
                    items={_systemSets.map(ss => {
                        const {
                            id,
                            name,
                            _system: {
                                name: systemName,
                                _manufacturer: {
                                    name: manufacturerName,
                                },
                            },
                            _elevations: {
                                totalCount,
                            },
                        } = ss;
                        return {
                            ...ss,
                            title: name,
                            subtitle: manufacturerName,
                            footer: `Applied to ${totalCount} elevation${totalCount === 1 ? '' : 's'}`,
                            type: 'tile',
                            align: 'left',
                            hoverButtons: [
                                {
                                    children: (
                                        <Link
                                            to={`${path}/system-set${parseSearch(search).update({ systemSetId: id })}`}
                                        >
                                            Edit System
                                        </Link>
                                    ),
                                },
                            ],
                        };
                    })}
                    onDelete={({ arguments: { id } }) => deleteSystemSet({
                        id,
                    })}
                    circleButton={{
                        type: 'tile',
                        "data-cy": "new-system-set",
                        onClick: () => history.push(`${path}/system-set${parseSearch(search).remove('systemSetId')}`),
                    }}
                />
            </CollapsibleTitle>
        </div>
    );
}

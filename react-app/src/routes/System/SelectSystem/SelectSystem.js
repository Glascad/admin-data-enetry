import React from 'react';
import { withRouter } from 'react-router-dom';

import ApolloWrapper3 from '../../../components/ApolloWrapper/ApolloWrapper3';
import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';

import query from './-graphql/query';
import mutations from './-graphql/mutations';

export default function SelectSystem({
    history,
}) {
    console.log(arguments[0]);
    return (
        <div className="card">
            <ApolloWrapper3
                query={query}
                mutations={mutations}
            >
                {({
                    queryStatus: {
                        allSystems,
                    },
                    mutations: {
                        createSystem
                    }
                }) => (
                        <ListWrapper3
                            title="Select System"
                            items={allSystems}
                            defaultPillProps={{
                                type: "tile",
                                align: "left",
                                footer: "Last Updated: ...",
                                selectable: false,
                                // onSelect: ({ arguments: { nodeId } }) => history.push(`/system/${nodeId}/system-info`),
                            }}
                            mapPillProps={({
                                nodeId,
                                name: systemName,
                                manufacturerByManufacturerId: {
                                    name: mnfgName,
                                } = {}
                            }) => ({
                                title: mnfgName,
                                subtitle: systemName,
                                hoverButtons: [
                                    {
                                        text: "Edit",
                                        onClick: () => history.push(`/system/${nodeId}/system-info`)
                                    },
                                    {
                                        text: "Build",
                                        onClick: () => history.push(`/system/${nodeId}/svg`)
                                    }
                                ]
                            })}
                            addButton={{
                                type: "large"
                            }}
                            onCreate={({ }, { input }) => createSystem({
                                name: input,
                            })}
                        />
                    )}
            </ApolloWrapper3>
        </div>
    );
}

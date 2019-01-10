import React from 'react';

import ApolloWrapper3 from '../../../components/ApolloWrapper/ApolloWrapper3';
import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';

import query from './-graphql/query';
import mutations from './-graphql/mutations';

export default function SystemSearch({
    history,
}) {
    console.log(arguments[0]);
    return (
        <div className="card">
            <ApolloWrapper3
                query={query}
                // mutations={mutations}
            >
                {({
                    queryStatus: {
                        allSystems,
                    },
                    mutations: {
                        deleteSystem
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
                                        onClick: () => history.push(`/system/database/system-info?systemNID=${nodeId}`)
                                    },
                                    {
                                        text: "Build",
                                        onClick: () => history.push(`/system/details?systemNID=${nodeId}`)
                                    },
                                    {
                                        text: "Delete",
                                        onClick: (...args) => console.log(args),
                                        className: "empty danger"
                                    }
                                ]
                            })}
                        />
                    )}
            </ApolloWrapper3>
        </div>
    );
}

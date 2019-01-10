import React from 'react';

import ApolloWrapper3 from '../../../components/ApolloWrapper/ApolloWrapper3';
import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';
import StateManager from '../../../components/SelectionWrapper/StateManager';

import {
    Input,
    HeadedContainer
} from '../../../components'

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
                mutations={mutations}
            >
                {({
                    queryStatus: {
                        allSystems,
                        allManufacturers,
                        allSystemTypes,
                        allSystemTags,
                    },
                    mutations: {
                        deleteSystem
                    }
                }) => (
                        <StateManager>
                            {({
                                state,
                                update,
                            }) => (
                                    <>
                                        <HeadedContainer
                                            title="Select System"
                                            className="input-wrapper"
                                        >
                                            <Input
                                                label="Search"
                                                value={state.input}
                                                onChange={({ target: { value } }) => update("input")({
                                                    arguments: value
                                                })}
                                            />
                                            <Input
                                                label="Manufacturer"
                                                type="select"
                                                select={{
                                                    options: allManufacturers
                                                        .map(({ nodeId, name }) => ({
                                                            value: nodeId,
                                                            label: name,
                                                        })),
                                                    value: state.manufacturer,
                                                    onChange: selection => update("manufacturer")({
                                                        arguments: selection
                                                    })
                                                }}
                                            />
                                            <div className="input-group">
                                                <Input
                                                    label="System Type"
                                                    type="select"
                                                    select={{
                                                        options: allSystemTypes
                                                            .map(({ nodeId, type }) => ({
                                                                value: nodeId,
                                                                label: type,
                                                            })),
                                                        value: state.systemType,
                                                        onChange: selection => update("systemType")({
                                                            arguments: selection
                                                        })
                                                    }}
                                                />
                                                <Input
                                                    label="System Tags"
                                                    type="select"
                                                    select={{
                                                        options: allSystemTags
                                                            .map(({ nodeId, tag }) => ({
                                                                value: nodeId,
                                                                label: tag,
                                                            })),
                                                        value: state.systemTag,
                                                        onChange: selection => update("systemTag")({
                                                            arguments: selection
                                                        })
                                                    }}
                                                />
                                            </div>
                                            {/* <div className="input-group">
                                                <Input
                                                    label="System Option"
                                                />
                                                <Input
                                                    label="Option Value"
                                                />
                                            </div> */}
                                        </HeadedContainer>
                                        <ListWrapper3
                                            title="Search Results"
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
                                                ],
                                            })}
                                            deleteModal={{
                                                name: "System",
                                                extractName: selectedItem => selectedItem.name
                                            }}
                                            onDelete={({ arguments: { nodeId } }) => deleteSystem({ nodeId })}
                                        />
                                    </>
                                )}
                        </StateManager>
                    )}
            </ApolloWrapper3>
        </div>
    );
}

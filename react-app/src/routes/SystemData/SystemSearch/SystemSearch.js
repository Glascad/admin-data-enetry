import React from 'react';
import {
    Link
} from 'react-router-dom';

import ApolloWrapper3 from '../../../components/ApolloWrapper/ApolloWrapper3';
import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';
import StateManager from '../../../components/SelectionWrapper/StateManager';

import {
    Input,
} from '../../../components'

import query from './-graphql/query';
import mutations from './-graphql/mutations';

export default function SystemSearch({
    history,
    location: {
        search
    }
}) {
    console.log(arguments[0]);
    return (
        <>
            <header>
                <div>Select System</div>
                <div className="buttons-right">
                    <button
                        className="primary"
                    >
                        <Link
                            to={`/system-data/new/create${search}`}
                        >
                            New System
                        </Link>
                    </button>
                </div>
            </header>
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
                                            <div className="input-wrapper">
                                                <Input
                                                    label="Search"
                                                    value={state.name}
                                                    placeholder={"System Name"}
                                                    onChange={({ target: { value } }) => update("name")({
                                                        arguments: value
                                                    })}
                                                />
                                                <div className="input-group">
                                                    <Input
                                                        label="Manufacturer"
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
                                                    <Input
                                                        label="System Type"
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
                                                </div>
                                                <Input
                                                    label="System Tags"
                                                    select={{
                                                        isMulti: true,
                                                        options: allSystemTags
                                                            .map(({ nodeId, tag }) => ({
                                                                value: nodeId,
                                                                label: tag,
                                                            })),
                                                        value: state.systemTags,
                                                        onChange: selection => update("systemTags")({
                                                            arguments: selection
                                                        })
                                                    }}
                                                />
                                                {/* <div className="input-group">
                                                <Input
                                                label="System Option"
                                                />
                                                <Input
                                                label="Option Value"
                                                />
                                            </div> */}
                                            </div>
                                            <ListWrapper3
                                                title="Search Results"
                                                items={allSystems.filter(({
                                                    name,
                                                    manufacturerByManufacturerId: {
                                                        nodeId: manufacturerNID
                                                    } = {},
                                                    systemTypeBySystemTypeId: {
                                                        nodeId: systemTypeNID,
                                                    } = {},
                                                    systemSystemTagsBySystemId: {
                                                        nodes: systemTags,
                                                    },
                                                }) => (
                                                        name.toLowerCase().includes(state.name ?
                                                            state.name.toLowerCase()
                                                            :
                                                            "")
                                                        &&
                                                        (
                                                            !state.manufacturer
                                                            ||
                                                            !state.manufacturer.value
                                                            ||
                                                            state.manufacturer.value === manufacturerNID
                                                        )
                                                        &&
                                                        (
                                                            !state.systemType
                                                            ||
                                                            !state.systemType.value
                                                            ||
                                                            state.systemType.value === systemTypeNID
                                                        )
                                                        &&
                                                        (
                                                            !state.systemTags
                                                            ||
                                                            !state.systemTags.length
                                                            ||
                                                            state.systemTags.every(({ value }) => (
                                                                systemTags.some(({
                                                                    systemTagBySystemTagId: {
                                                                        nodeId
                                                                    }
                                                                }) => value === nodeId)
                                                            ))
                                                        )
                                                    ))}
                                                defaultPillProps={{
                                                    type: "tile",
                                                    align: "left",
                                                    footer: "Last Updated: ...",
                                                    selectable: false,
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
                                                            onClick: () => history.push(`/system-data/database/system-info?systemNID=${nodeId}`)
                                                        },
                                                        {
                                                            text: "Build",
                                                            onClick: () => history.push(`/system-data/details?systemNID=${nodeId}`)
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
        </>
    );
}

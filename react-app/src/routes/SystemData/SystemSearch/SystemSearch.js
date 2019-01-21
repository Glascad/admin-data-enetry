import React from 'react';
import {
    Link
} from 'react-router-dom';

import {
    Input,
    ApolloWrapper,
    ListWrapper,
    StateManager,
} from '../../../components'

import query from './-graphql/query';
import mutations from './-graphql/mutations';
import TitleBar from '../../../components/ui/TitleBar/TitleBar';

export default function SystemSearch({
    history,
    location: {
        search
    }
}) {
    return (
        <>
            <TitleBar
                title="Select System"
                right={(
                    <Link
                        to={`/system-data/new/create${search}`}
                    >
                        <button
                            className="primary"
                        >
                            New System
                        </button>
                    </Link>
                )}
            />
            <div className="card">
                <ApolloWrapper
                    query={query}
                    mutations={mutations}
                >
                    {({
                        queryStatus: {
                            allSystems = [],
                            allManufacturers = [],
                            allSystemTypes = [],
                            allSystemTags = [],
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
                                            <div className="unfinished">
                                                <div className="input-group">
                                                    <Input
                                                        label="System Option"
                                                    />
                                                    <Input
                                                        label="Option Value"
                                                    />
                                                </div>
                                            </div>
                                            <ListWrapper
                                                title="Search Results"
                                                items={allSystems.filter(({
                                                    name,
                                                    manufacturer: {
                                                        nodeId: manufacturerNID
                                                    } = {},
                                                    systemType: {
                                                        nodeId: systemTypeNID,
                                                    } = {},
                                                    systemSystemTags,
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
                                                            !state.systemSystemTags
                                                            ||
                                                            !state.systemSystemTags.length
                                                            ||
                                                            state.systemSystemTags.every(({ value }) => (
                                                                systemSystemTags.some(({
                                                                    systemTag: {
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
                                                    manufacturer: {
                                                        name: mnfgName,
                                                    } = {}
                                                }) => ({
                                                    title: mnfgName,
                                                    subtitle: systemName,
                                                    hoverButtons: [
                                                        {
                                                            text: "Edit Database",
                                                            onClick: () => history.push(`/system-data/info/database/system-info?systemNID=${nodeId}`)
                                                        },
                                                        {
                                                            text: "Edit Details",
                                                            onClick: () => history.push(`/system-data/info/details?systemNID=${nodeId}`)
                                                        },
                                                    ],
                                                })}
                                                deleteModal={{
                                                    name: "System",
                                                }}
                                                onDelete={({ arguments: { nodeId } }) => deleteSystem({ nodeId })}
                                            />
                                        </>
                                    )}
                            </StateManager>
                        )}
                </ApolloWrapper>
            </div>
        </>
    );
}

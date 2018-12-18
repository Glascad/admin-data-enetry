import React from 'react';

import { ApolloInputWrapper } from '../../../components';

import * as apolloProps from './system-info-graphql';
import * as systemTagApolloProps from './system-tags-graphql';

export default function SystemInfo({ match: { params: { systemNID } } }) {
    return (
        <div className="card">
            <ApolloInputWrapper
                apolloProps={{
                    ...apolloProps,
                    queryVariables: { nodeId: systemNID }
                }}
                title="System Info"
                mapUpdateVariables={({
                    "Name": name,
                    "System Type": {
                        value: systemTypeId,
                    },
                    "System Depth": depth,
                    "System Sightline": defaultSightline,
                    "Caulk Joint Size": shimSize,
                }) => ({
                    nodeId: systemNID,
                    name,
                    systemTypeId,
                    depth,
                    defaultSightline,
                    shimSize,
                })}
                inputs={[
                    {
                        label: "Name",
                        extractValue: ({
                            system: {
                                name = ""
                            } = {}
                        }) => name,
                    },
                    {
                        label: "System Type",
                        type: "select",
                        extractValue: ({
                            system: {
                                systemTypeBySystemTypeId: {
                                    id = 0,
                                    type = ""
                                } = {}
                            } = {}
                        }) => ({
                            value: id,
                            label: type,
                        }),
                        extractOptions: ({
                            allSystemTypes: {
                                nodes = []
                            } = {}
                        }) => nodes.map(({ id, type }) => ({
                            value: id,
                            label: type,
                        }))
                    },
                    {
                        label: "System Tags",
                        multiSelectList: {
                            apolloProps: systemTagApolloProps,
                            mapCreateVariables: ({ id: systemTagId }, { system: { id: systemId } }) => ({
                                systemId,
                                systemTagId,
                            }),
                            mapDeleteVariables: ({ systemSystemTagNID, ...arg }) => ({
                                nodeId: systemSystemTagNID,
                            }),
                            extractItems: ({
                                system: {
                                    systemSystemTagsBySystemId: {
                                        nodes = []
                                    } = {}
                                } = {}
                            }) => nodes.map(({
                                nodeId: systemSystemTagNID,
                                systemTagBySystemTagId: systemTag,
                            }) => ({
                                systemSystemTagNID,
                                ...systemTag,
                            })),
                            extractAllItems: ({
                                allSystemTags: {
                                    nodes = []
                                } = {}
                            }) => nodes,
                            mapListPillProps: ({ tag }) => ({
                                title: tag,
                            }),
                            mapModalPillProps: ({ tag }) => ({
                                title: tag,
                            }),
                        }
                    },
                    {
                        label: "System Depth",
                        type: "number",
                        extractValue: ({
                            system: {
                                depth = 0
                            } = {}
                        }) => depth,
                    },
                    {
                        label: "System Sightline",
                        type: "number",
                        extractValue: ({
                            system: {
                                defaultSightline = 0
                            } = {}
                        }) => defaultSightline,
                    },
                    {
                        label: "Caulk Joint Size",
                        type: "number",
                        extractValue: ({
                            system: {
                                shimSize = 0,
                            } = {}
                        }) => shimSize,
                    }
                ]}
            />
        </div>
    );
}

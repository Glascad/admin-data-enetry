import React from 'react';

import {
    ApolloInputWrapper,
    Wizard,
    HeadedContainer,
    Input,
} from '../../../components';

import { query, mutations } from './system-info-graphql';

import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';

// import * as apolloProps from './system-info-graphql';
// import * as systemTagApolloProps from './system-tags-graphql';

export default function SystemInfo({ match: { params: { systemNID } } }) {
    return (
        <Wizard
            query={{
                query,
                variables: {
                    nodeId: systemNID
                },
                mapProps: ({
                    data: {
                        system: {
                            manufacturerByManufacturerId: manufacturer,
                            systemTypeBySystemTypeId: systemType,
                            systemSystemTagsBySystemId: {
                                nodes: systemSystemTags = []
                            } = {},
                            ...system
                        } = {},
                        allSystemTypes: {
                            nodes: systemTypes = []
                        } = {},
                        allSystemTags: {
                            nodes: systemTags = []
                        } = {},
                    } = {},
                }) => ({
                    system,
                    manufacturer,
                    systemType,
                    systemSystemTags,
                    systemTypes,
                    systemTags,
                })
            }}
            mutations={mutations}
        >
            {({
                queryStatus: {
                    system: {
                        nodeId: systemNID,
                        id: systemId,
                        name,
                        depth,
                        defaultSightline,
                        shimSize,
                    } = {},
                    manufacturer,
                    systemType: {
                        id: systemTypeId,
                        type: systemTypeName,
                    } = {},
                    systemSystemTags,
                    systemTypes,
                    systemTags,
                },
                mutations: {
                    updateSystem,
                    createSystemSystemTag,
                    deleteSystemSystemTag,
                },
            }) => (
                    <HeadedContainer
                        title="System Info"
                        className="input-wrapper"
                    >
                        <Input
                            label="Name"
                            value={name}
                            onChange={({ target: { value } }) => updateSystem({
                                nodeId: systemNID,
                                name: value,
                            })}
                        />
                        <Input
                            label="System Type"
                            type="select"
                            select={{
                                value: {
                                    value: systemTypeId,
                                    label: systemTypeName,
                                },
                                options: systemTypes.map(({ id, type }) => ({
                                    value: id,
                                    label: type,
                                })),
                                onChange: ({ value }) => updateSystem({
                                    nodeId: systemNID,
                                    systemTypeId: value,
                                }),
                            }}
                        />
                        <ListWrapper3
                            label="System Tags"
                            items={systemSystemTags.map(({
                                nodeId: systemSystemTagNID,
                                systemTagBySystemTagId: systemTag,
                            }) => ({
                                systemSystemTagNID,
                                ...systemTag,
                            }))}
                            mapPillProps={({ tag }) => ({
                                title: tag,
                            })}
                            onCreate={systemTag => createSystemSystemTag({
                                systemTagId: systemTag.id,
                                systemId,
                                systemTagBySystemTagId:systemTag,
                            })}
                            onDelete={({ systemSystemTagNID, ...systemTag }) => deleteSystemSystemTag({
                                nodeId: systemSystemTagNID,
                                systemTagId: systemTag.id,
                                systemId,
                                systemTagBySystemTagId: systemTag,
                            })}
                            multiSelect={{
                                allItems: systemTags,
                                mapPillProps: ({ tag }) => ({
                                    title: tag,
                                })
                            }}
                        />
                        <div className="input-group">
                            <Input
                                label="System Depth"
                                type="number"
                                value={depth}
                                onChange={({ target: { value } }) => updateSystem({
                                    nodeId: systemNID,
                                    depth: value
                                })}
                            />
                            <Input
                                label="System Sightline"
                                type="number"
                                value={defaultSightline}
                                onChange={({ target: { value } }) => updateSystem({
                                    nodeId: systemNID,
                                    defaultSightline: value,
                                })}
                            />
                        </div>
                        <Input
                            label="Caulk Joint Size"
                            type="number"
                            value={shimSize}
                            onChange={({ target: { value } }) => updateSystem({
                                nodeId: systemNID,
                                shimSize: value,
                            })}
                        />
                    </HeadedContainer>
                )}
        </Wizard>
    );
}

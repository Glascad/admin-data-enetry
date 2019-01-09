import React from 'react';

import ApolloWrapper3 from '../../../components/ApolloWrapper/ApolloWrapper3';

import query from '../-graphql/query';
import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';
import HeadedContainer from '../../../components/HeadedContainer/HeadedContainer';
import StateManager from '../../../components/SelectionWrapper/StateManager';
import HeadedListContainer from '../../../components/HeadedListContainer/HeadedListContainer';
import { parseSearch } from '../../../utils';

export default function SystemSVG({
    location: {
        search
    }
}) {
    const { systemNID } = parseSearch(search);
    return (
        <div className="card">
            <ApolloWrapper3
                query={{
                    ...query,
                    variables: {
                        nodeId: systemNID,
                    },
                }}
            >
                {({
                    queryStatus: {
                        system,
                        systemOptions,
                        systemTypeDetailTypes,
                        systemTypeDetailTypeConfigurationTypes,
                        ...data
                    }
                }) => {
                    console.log({
                        system,
                        systemOptions,
                        systemTypeDetailTypes,
                        systemTypeDetailTypeConfigurationTypes,
                        data,
                    })

                    return (
                        <StateManager>
                            {managerProps => (
                                <HeadedContainer
                                    title="System Level Options"
                                >
                                    {systemOptions
                                        .filter(({ presentationLevel }) => presentationLevel === 1)
                                        .map(({
                                            nodeId,
                                            name,
                                            optionValuesBySystemOptionId: {
                                                nodes: values,
                                            }
                                        }) => (
                                                <ListWrapper3
                                                    key={nodeId}
                                                    stateManager={{
                                                        id: nodeId,
                                                        props: managerProps
                                                    }}
                                                    // selection={{
                                                    //     selectedNID: state[nodeId],
                                                    //     handleSelect: select(nodeId),
                                                    // }}
                                                    label={name}
                                                    items={values}
                                                    mapPillProps={({ name }) => ({
                                                        title: name
                                                    })}
                                                />
                                            ))}
                                    <ListWrapper3
                                        title="Detail Types"
                                        stateManager={{
                                            id: "detailTypeNID",
                                            props: managerProps
                                        }}
                                        items={systemTypeDetailTypes}
                                        mapPillProps={({
                                            detailTypeByDetailTypeId: {
                                                type
                                            }
                                        }) => ({
                                            title: type,
                                        })}
                                    >
                                        {({
                                            detailTypeByDetailTypeId: {
                                                nodeId: selectedDetailTypeNID = "",
                                                type = "",
                                            } = {},
                                        }) => (
                                                <HeadedListContainer
                                                    title={`Detail Level Options - ${type}`}
                                                    list={{
                                                        items: systemOptions,
                                                        filter: ({
                                                            presentationLevel,
                                                            systemOptionConfigurationTypesBySystemOptionId: {
                                                                nodes: configurationTypes,
                                                            }
                                                        }) => (
                                                                presentationLevel >= 2
                                                                &&
                                                                configurationTypes.some(({
                                                                    configurationTypeByConfigurationTypeId: {
                                                                        nodeId
                                                                    }
                                                                }) => systemTypeDetailTypeConfigurationTypes.some(({
                                                                    detailTypeByDetailTypeId: {
                                                                        nodeId: detailTypeNID,
                                                                    },
                                                                    configurationTypeByConfigurationTypeId: {
                                                                        nodeId: configurationTypeNID,
                                                                    }
                                                                }) => (
                                                                        detailTypeNID === selectedDetailTypeNID
                                                                        &&
                                                                        configurationTypeNID === nodeId
                                                                    )
                                                                ))
                                                            ),
                                                        renderItem: ({
                                                            nodeId,
                                                            name,
                                                            optionValuesBySystemOptionId: {
                                                                nodes: values,
                                                            }
                                                        }) => (
                                                                <ListWrapper3
                                                                    key={nodeId}
                                                                    stateManager={{
                                                                        id: nodeId,
                                                                        props: managerProps
                                                                    }}
                                                                    label={name}
                                                                    items={values}
                                                                    mapPillProps={({ name }) => ({
                                                                        title: name
                                                                    })}
                                                                />
                                                            )
                                                    }}
                                                >
                                                </HeadedListContainer>
                                            )}
                                    </ListWrapper3>
                                    <div className="configuration-display">
                                        EMPTY
                                    </div>
                                </HeadedContainer>
                            )}
                        </StateManager>
                    );
                }}
            </ApolloWrapper3>
        </div >
    );
}

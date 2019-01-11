import React from 'react';

import ListWrapper3 from '../../../../components/ApolloListWrapper/ListWrapper3';
import HeadedContainer from '../../../../components/HeadedContainer/HeadedContainer';
import StateManager from '../../../../components/SelectionWrapper/StateManager';
import HeadedListContainer from '../../../../components/HeadedListContainer/HeadedListContainer';

export default function SystemSVG({
    queryStatus: {
        system,
        systemOptions,
        systemTypeDetailTypes,
        systemTypeDetailTypeConfigurationTypes,
    }
}) {
    return (
        <div className="card">
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
        </div >
    );
}

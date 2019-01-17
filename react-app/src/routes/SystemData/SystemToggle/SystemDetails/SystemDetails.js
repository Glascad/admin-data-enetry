import React from 'react';

import {
    ListWrapper,
    HeadedContainer,
    StateManager,
    HeadedListContainer,
} from '../../../../components';

/**
 * THINGS NEEDED TO SELECT CONFIGURATIONS IN A DETAIL
 * 
 *  - System
 *      - System Type
 *          - System Type Detail Types
 *          - System Type Detail Type Configuration Types
 *              - Required
 *              - Mirrorable
 *      - Invalid Configuration Types
 *      - Option Values
 *          - Affecting certain Configuration Types
 *      - ? Infill Pocket Types ?
 *          - ? Infill Pocket Type Detail Types ?
 *      - Configuration Overrides
 *          - required
 *          - optional
 *          - ...
 *      - Configuration (Name) Overrides
 *      - Invalid Combinations
 */

export default function SystemDetails({
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
                                    <ListWrapper
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
                        <ListWrapper
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
                                                    <ListWrapper
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
                        </ListWrapper>
                        <div className="configuration-display">
                            EMPTY
                                        </div>
                    </HeadedContainer>
                )}
            </StateManager>
        </div >
    );
}

import React from 'react';

import {
    ListWrapper,
    StateManager,
    TitleBar,
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

SystemDetails.navigationOptions = {
    name: "Details",
    path: "/details",
};

export default function SystemDetails({
    queryStatus: {
        system: {
            systemOptions = [],
            systemType: {
                systemTypeDetailTypes = [],
                systemTypeDetailTypeConfigurationTypes = [],
            } = {}
        } = {},
    }
}) {
    return (
        <div className="card">
            <StateManager>
                {managerProps => (
                    <>
                        <TitleBar
                            title="System Level Options"
                        />
                        {systemOptions
                            .filter(({ presentationLevel }) => presentationLevel === 1)
                            .map(({
                                nodeId,
                                name,
                                optionValues
                            }) => (
                                    <ListWrapper
                                        key={nodeId}
                                        stateManager={{
                                            id: nodeId,
                                            props: managerProps
                                        }}
                                        label={name}
                                        items={optionValues}
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
                                detailType: {
                                    type
                                }
                            }) => ({
                                title: type,
                            })}
                        >
                            {({
                                detailType: {
                                    nodeId: selectedDetailTypeNID = "",
                                    type = "",
                                } = {},
                            }) => (
                                    <>
                                        <TitleBar
                                            title="Detail Level Options"
                                            selections={[type]}
                                        />
                                        {systemOptions
                                            .filter(({
                                                presentationLevel,
                                                systemOptionConfigurationTypes = []
                                            }) => (
                                                    presentationLevel >= 2
                                                    &&
                                                    systemOptionConfigurationTypes.some(({
                                                        configurationType: {
                                                            nodeId
                                                        }
                                                    }) => systemTypeDetailTypeConfigurationTypes.some(({
                                                        detailType: {
                                                            nodeId: detailTypeNID,
                                                        },
                                                        configurationType: {
                                                            nodeId: configurationTypeNID,
                                                        }
                                                    }) => (
                                                            detailTypeNID === selectedDetailTypeNID
                                                            &&
                                                            configurationTypeNID === nodeId
                                                        )
                                                    ))
                                                )
                                            )
                                            .map(({
                                                nodeId,
                                                name,
                                                optionValues = [],
                                            }) => (
                                                    <ListWrapper
                                                        key={nodeId}
                                                        stateManager={{
                                                            id: nodeId,
                                                            props: managerProps
                                                        }}
                                                        label={name}
                                                        items={optionValues}
                                                        mapPillProps={({ name }) => ({
                                                            title: name
                                                        })}
                                                    />
                                                )
                                            )}
                                    </>
                                )}
                        </ListWrapper>
                        <div className="configuration-display">
                            EMPTY
                        </div>
                    </>
                )}
            </StateManager>
        </div >
    );
}

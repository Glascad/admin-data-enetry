import React from 'react';

import {
    HeadedContainer,
    Input,
    ListWrapper,
} from '../../../../../components';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';

export default function ValidTypes({
    queryStatus: {
        system: {
            id: systemId,
            systemType: {
                id: systemTypeId,
                systemTypeDetailTypeConfigurationTypes = [],
            } = {},
            invalidSystemConfigurationTypes = [],
        } = {},
    },
    mutations: {
        createInvalidSystemConfigurationType,
        deleteInvalidSystemConfigurationType,
        updateSystemConfigurationOverride,
        createSystemConfigurationOverride,
    },
}) {
    console.log(arguments[0]);
    return (
        <ListWrapper
            titleBar={{
                title: "Valid Detail Types"
            }}
            items={systemTypeDetailTypeConfigurationTypes
                //find only the detail types
                .filter(({ configurationType }) => !configurationType)}
            mapPillProps={({
                detailType: {
                    type
                }
            }) => ({
                title: type
            })}
        >
            {({
                detailType: {
                    type: detailTypeName = '',
                    id: detailTypeId,
                } = {}
            }) => (
                    <ListWrapper
                        titleBar={{
                            title: "Valid Configuration Types",
                            selections: [detailTypeName]
                        }}
                        items={systemTypeDetailTypeConfigurationTypes
                            .filter(({
                                detailTypeId: id,
                                configurationType,
                                // find only the configuration types
                            }) => configurationType && id === detailTypeId)
                            .map(({
                                configurationTypeId,
                                systemConfigurationOverrides,
                                ...systemTypeDetailTypeConfigurationType
                            }) => {

                                // find if the configuration has been marked invalid in the system
                                const invalidSystemConfigurationType = invalidSystemConfigurationTypes
                                    .find(({
                                        invalidConfigurationTypeId,
                                    }) => invalidConfigurationTypeId === configurationTypeId);

                                const systemConfigurationOverride = systemConfigurationOverrides
                                    .find(({
                                        systemId: id
                                    }) => id === systemId);

                                return ({
                                    configurationTypeId,
                                    ...systemTypeDetailTypeConfigurationType,
                                    invalidSystemConfigurationType,
                                    systemConfigurationOverride,
                                });
                            })
                            .map(item => { console.log(item); return item; })}
                        mapPillProps={({
                            invalidSystemConfigurationType,
                            configurationType: {
                                type
                            }
                        }) => ({
                            title: type,
                            disabled: !!invalidSystemConfigurationType,
                        })}
                    >
                        {({
                            nodeId,
                            invalidSystemConfigurationType: {
                                invalid = true,
                                nodeId: invalidSystemConfigurationTypeNID
                            } = {
                                invalid: false,
                            },
                            required,
                            mirrorable,
                            presentationLevel,
                            overrideLevel,
                            configurationType: {
                                id: configurationTypeId,
                                type: configurationTypeName = '',
                            } = {},
                            detailType: {
                                id: detailTypeId,
                                type: detailTypeName = '',
                            } = {},
                            systemConfigurationOverride: {
                                nodeId: systemConfigurationOverrideNID,
                                requiredOverride,
                                mirrorableOverride,
                                presentationLevelOverride,
                                overrideLevelOverride,
                            } = {},
                            systemConfigurationOverrides,
                            invalidSystemConfigurationType,
                            ...data
                        }) => (
                                <>
                                    {console.log({
                                        required,
                                        mirrorable,
                                        presentationLevel,
                                        overrideLevel,
                                        systemConfigurationOverrides,
                                        invalidSystemConfigurationType,
                                        ...data,
                                    })}
                                    <TitleBar
                                        title="System Configuration Type"
                                        selections={[
                                            detailTypeName,
                                            configurationTypeName,
                                        ]}
                                    />
                                    {/**
                                        This item is dependent on the presence of an entry in the invalidSystemConfigurationTypes table linking the selected system to the selected configuration type.
                                    */}
                                    <Input
                                        label="Invalid"
                                        type="checkbox"
                                        checked={invalid}
                                        onChange={({ target: { checked } }) => checked ?
                                            createInvalidSystemConfigurationType({
                                                nodeId: invalidSystemConfigurationTypeNID,
                                                systemId,
                                                invalidConfigurationTypeId: configurationTypeId,
                                            })
                                            :
                                            deleteInvalidSystemConfigurationType({
                                                nodeId: invalidSystemConfigurationTypeNID,
                                                systemId,
                                                invalidConfigurationTypeId: configurationTypeId,
                                            })}
                                    />
                                    <div
                                        className={`nested ${invalid ? "disabled" : ""}`}
                                        style={{ marginTop: "1.25rem" }}
                                    >
                                        {/**
                                            The following items depend upon entries in both the systemTypeDetailTypeConfigurationTypes table and the systemConfigurationOverrides table.

                                            If there is an entry in the overrides table, it will override whatever value is in the stdtct table, and any changes made will update the overrides table. However, if the changes made to the overrides table make it identical to the stdtct table, the entry will simply be deleted since it is unnecessary.

                                            If there is no entry in the overrides table, any change will create an entry.
                                        */}
                                        <Input
                                            label="Mirrorable"
                                            type="checkbox"
                                            checked={mirrorableOverride ?
                                                mirrorableOverride
                                                :
                                                mirrorable}
                                            onChange={({ target: { checked } }) => (
                                                typeof systemConfigurationOverrideNID === "string" ?
                                                    updateSystemConfigurationOverride({
                                                        systemId,
                                                        systemTypeId,
                                                        detailTypeId,
                                                        configurationTypeId,
                                                        nodeId: systemConfigurationOverrideNID,
                                                        mirrorableOverride: checked === mirrorable ?
                                                            undefined
                                                            :
                                                            checked,
                                                    })
                                                    :
                                                    createSystemConfigurationOverride({
                                                        systemId,
                                                        systemTypeId,
                                                        detailTypeId,
                                                        configurationTypeId,
                                                        nodeId: systemConfigurationOverrideNID,
                                                        mirrorableOverride: checked,
                                                    })
                                            )}
                                        />
                                        <Input
                                            label="Required"
                                            type="checkbox"
                                            checked={requiredOverride ?
                                                requiredOverride
                                                :
                                                required}
                                            onChange={({ target: { checked } }) => (
                                                typeof systemConfigurationOverrideNID === "string" ?
                                                    updateSystemConfigurationOverride({
                                                        systemId,
                                                        systemTypeId,
                                                        detailTypeId,
                                                        configurationTypeId,
                                                        nodeId: systemConfigurationOverrideNID,
                                                        requiredOverride: checked === required ?
                                                            undefined
                                                            :
                                                            checked,
                                                    })
                                                    :
                                                    createSystemConfigurationOverride({
                                                        systemId,
                                                        systemTypeId,
                                                        detailTypeId,
                                                        configurationTypeId,
                                                        nodeId: systemConfigurationOverrideNID,
                                                        requiredOverride: checked,
                                                    })
                                            )}
                                        />
                                        <div
                                            className={`nested ${
                                                (
                                                    requiredOverride === undefined ?
                                                        required
                                                        :
                                                        requiredOverride
                                                ) ?
                                                    "disabled"
                                                    :
                                                    ""
                                                }`}
                                            style={{ marginTop: "1.25rem" }}
                                        >
                                            <Input
                                                label="Presentation Level"
                                                type="number"
                                                value={presentationLevelOverride ?
                                                    presentationLevelOverride
                                                    :
                                                    presentationLevel}
                                                onChange={({ target: { value } }) => (
                                                    typeof systemConfigurationOverrideNID === "string" ?
                                                        updateSystemConfigurationOverride({
                                                            systemId,
                                                            systemTypeId,
                                                            detailTypeId,
                                                            configurationTypeId,
                                                            nodeId: systemConfigurationOverrideNID,
                                                            presentationLevelOverride: value === presentationLevel ?
                                                                undefined
                                                                :
                                                                value,
                                                        })
                                                        :
                                                        createSystemConfigurationOverride({
                                                            systemId,
                                                            systemTypeId,
                                                            detailTypeId,
                                                            configurationTypeId,
                                                            nodeId: systemConfigurationOverrideNID,
                                                            presentationLevelOverride: value,
                                                        })
                                                )}
                                            />
                                            <Input
                                                label="Override Level"
                                                type="number"
                                                value={overrideLevelOverride ?
                                                    overrideLevelOverride
                                                    :
                                                    overrideLevel}
                                                onChange={({ target: { value } }) => (
                                                    typeof systemConfigurationOverrideNID === "string" ?
                                                        updateSystemConfigurationOverride({
                                                            systemId,
                                                            systemTypeId,
                                                            detailTypeId,
                                                            configurationTypeId,
                                                            nodeId: systemConfigurationOverrideNID,
                                                            overrideLevelOverride: value === overrideLevel ?
                                                                undefined
                                                                :
                                                                value,
                                                        })
                                                        :
                                                        createSystemConfigurationOverride({
                                                            systemId,
                                                            systemTypeId,
                                                            detailTypeId,
                                                            configurationTypeId,
                                                            nodeId: systemConfigurationOverrideNID,
                                                            overrideLevelOverride: value,
                                                        })
                                                )}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                    </ListWrapper>
                )}
        </ListWrapper>
    );
}

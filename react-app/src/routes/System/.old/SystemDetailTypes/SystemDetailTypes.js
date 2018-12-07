import React, { Component } from 'react';
import {
    HeadedListContainer,
    Pill,
    Input,
} from '../../../components';
import HeadedContainer from '../../../components/HeadedContainer/HeadedContainer';

export default class SystemDetailTypes extends Component {

    state = {
        selectedDetailTypeNID: "nodeId",
        selectedConfigurationTypeNID: "nodeId",
    };

    selectDetailType = ({ nodeId }) => this.setState({
        selectedDetailTypeNID: nodeId
    });

    selectConfigurationType = ({ nodeId }) => this.setState({
        selectedConfigurationTypeNID: nodeId
    });

    render = () => {
        const {
            state: {
                selectedDetailTypeNID,
                selectedConfigurationTypeNID,
            },
            props: {
                systemType: {
                    nodeId: systemTypeNID,
                    type: systemTypeName = '',
                    systemTypeDetailTypesByDetailTypeId: {
                        nodes: detailTypes = [],
                    } = {},
                } = {},
                invalidConfigurationTypes: {
                    nodes: invalidConfigurationTypes = []
                } = {},
                configurationOverrides: {
                    nodes: configurationOverrides = []
                } = {},
            },
            selectDetailType,
            selectConfigurationType,
        } = this;

        const {
            detailTypeByDetailTypeId: {
                id: selectedDetailTypeId,
                type: selectedDetailTypeName = '',
                systemTypeDetailTypeConfigurationTypesByDetailTypeId: {
                    nodes: configurationTypes = []
                } = {}
            } = {},
        } = detailTypes
            .find(({
                detailTypeByDetailTypeId: {
                    nodeId
                }
            }) => nodeId === selectedDetailTypeNID) || {};

        const {
            id: selectedConfigurationTypeId,
            type: selectedConfigurationTypeName = '',
        } = configurationTypes
            .find(({
                configurationTypeByConfigurationTypeId: {
                    nodeId
                }
            }) => nodeId === selectedConfigurationTypeNID) || {};

        const {
            requiredOverride,
            mirrorableOverride,
        } = configurationOverrides
            .find(({
                detailTypeId,
                configurationTypeId,
            }) => (
                    detailTypeId === selectedDetailTypeId
                    &&
                    configurationTypeId === selectedConfigurationTypeId
                )) || {};

        return (
            <div>
                <HeadedListContainer
                    title={`Detail Types - ${systemTypeName}`}
                    list={{
                        items: detailTypes,
                        renderItem: ({
                            detailTypeByDetailTypeId: {
                                nodeId,
                                type,
                            }
                        }) => (
                                <Pill
                                    key={nodeId}
                                    nodeId={nodeId}
                                    title={type}
                                    selected={nodeId === selectedDetailTypeNID}
                                    onSelect={selectDetailType}
                                />
                            )
                    }}
                />
                <HeadedListContainer
                    title={`Configuration Types - ${selectedDetailTypeName}`}
                    list={{
                        items: configurationTypes,
                        renderItem: ({
                            nodeId,
                            id,
                            type
                        }) => (
                                <Pill
                                    key={nodeId}
                                    nodeId={nodeId}
                                    title={type}
                                    selected={nodeId === selectedConfigurationTypeNID}
                                    onSelect={selectConfigurationType}
                                    invalid={invalidConfigurationTypes.some(({
                                        invalidConfigurationTypeId
                                    }) => invalidConfigurationTypeId === id)}
                                />
                            )
                    }}
                />
                <HeadedContainer
                    title={`System Configuration Information - ${
                        systemTypeName
                        } ${
                        selectedDetailTypeName
                        } > ${
                        selectedConfigurationTypeName
                        }`}
                >
                    <Input
                        label="Required"
                        type="checkbox"
                        checked={requiredOverride}
                    />
                    <Input
                        label="Mirror Configuration With Detail"
                        type="checkbox"
                        checked={mirrorableOverride}
                    />
                </HeadedContainer>
            </div>
        );
    }
}

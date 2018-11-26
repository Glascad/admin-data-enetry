import React, { Component } from 'react';
import {
    HeadedListContainer,
    Pill
} from '../../../../../components';
import HeadedContainer from '../../../../../components/HeadedContainer/HeadedContainer';
import ConfTypes from '../../SystemConfigurations/ConfigurationTypes/ConfTypes';

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
                    <input type="checkbox" checked={requiredOverride} />
                    <h6>Required</h6>
                    <input type="checkbox" checked={mirrorableOverride} />
                    <h6>Mirror Configuration With Detail</h6>
                </HeadedContainer>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { Query } from 'react-apollo';

import CONFIGURATION_TYPES_QUERY from './configuration-types-query';

import { HeadedListContainer, Pill } from '../../../../../components';

export default class ConfigurationTypes extends Component {

    state = {
        selectedConfigurationTypeNID: "nodeId",
        selectedPartTypeNID: "nodeid"
    }

    selectConfigurationType = ({ nodeId }) => this.setState({
        selectedConfigurationTypeNID: nodeId
    });

    selectPartType = ({ nodeId }) => this.setState({
        selectedPartTypeNID: nodeId
    });

    render = () => {
        const {
            state: {
                selectedConfigurationTypeNID,
                selectedPartTypeNID,
            },
            selectConfigurationType,
            selectPartType,
        } = this;

        return (
            <Query
                query={CONFIGURATION_TYPES_QUERY}
            >
                {({
                    loading,
                    error,
                    data: {
                        allConfigurationTypes: {
                            nodes: configurationTypes = [],
                        } = {},
                    } = {},
                }) => {
                    const {
                        type: selectedConfigurationTypeName = '',
                        configurationTypePartTypesByConfigurationTypeId: {
                            nodes: partTypes = [],
                        } = {},
                        configurationNameOverridesByConfigurationTypeId: {
                            nodes: configurationTypeNameOverrides = [],
                        } = {},
                    } = configurationTypes.find(({ nodeId }) => nodeId === selectedConfigurationTypeNID) || {};

                    return (
                        <div>
                            <HeadedListContainer
                                title="Configuration Types"
                                listItems={configurationTypes}
                                renderListItem={({
                                    nodeId,
                                    type,
                                }) => (
                                        <Pill
                                            key={nodeId}
                                            nodeId={nodeId}
                                            tagname="li"
                                            title={type}
                                            selected={nodeId === selectedConfigurationTypeNID}
                                            onSelect={selectConfigurationType}
                                        />
                                    )}
                            />
                            {selectedConfigurationTypeName ? (
                                <HeadedListContainer
                                    title={`Part Types - ${selectedConfigurationTypeName}`}
                                    listItems={partTypes}
                                    renderListItem={({
                                        partTypeByPartTypeId: {
                                            nodeId,
                                            type,
                                        }
                                    }) => (
                                            <Pill
                                                key={nodeId}
                                                nodeId={nodeId}
                                                tagname="li"
                                                title={type}
                                                selected={nodeId === selectedPartTypeNID}
                                                onSelect={selectPartType}
                                            />
                                        )}
                                />
                            ) : null}
                            {selectedConfigurationTypeName ? (
                                <HeadedListContainer
                                    title={`Configuration Type Name Override - ${selectedConfigurationTypeName}`}
                                    listItems={configurationTypeNameOverrides}
                                    renderListItem={({
                                        nodeId,
                                        nameOverride,
                                        manufacturerByManufacturerId: {
                                            name: mnfgName,
                                        }
                                    }) => (
                                            <Pill
                                                key={nodeId}
                                                tagname="li"
                                                type="tile"
                                                align="left"
                                                title={mnfgName}
                                                subtitle={nameOverride}
                                                footer={selectedConfigurationTypeName}
                                            />
                                        )}
                                />
                            ) : null}
                        </div>
                    );
                }}
            </Query>
        );
    }
}
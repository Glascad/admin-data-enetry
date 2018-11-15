import React, { Component } from 'react';
import { Query } from 'react-apollo';

import CONFIGURATION_TYPES_QUERY from './configuration-types-query';

import { HeadedListContainer, Pill } from '../../../../../components';

export default class PartTypes extends Component {

    state = {
        selectedConfigurationTypeNID: "nodeId",
        selectedPartTypeNID: "nodeid"
    }

    selectConfigurationType = ({ nodeId }) => this.setState({ selectedConfigurationTypeNID: nodeId });

    selectPartType = ({ nodeId }) => this.setState({ selectedPartTypeNID: nodeId });

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
                            nodes: configurationTypes = []
                        } = {},
                    } = {}
                }) => {
                    const {
                        type: selectedConfigurationTypeName,
                        configurationTypePartTypesByConfigurationTypeId: {
                            nodes: partTypes
                        }
                    } = configurationTypes.find(({ nodeId }) => nodeId === selectedConfigurationTypeNID) || {
                        configurationTypePartTypesByConfigurationTypeId: {
                            nodes: []
                        }
                    };
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
                        </div>
                    );
                }}
            </Query>
        );
    }
}
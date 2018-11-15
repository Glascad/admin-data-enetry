import React, { Component } from 'react';
import { Query } from 'react-apollo';

import SYSTEM_TYPES_QUERY from './system-types-query';

import { HeadedContainer, HeadedListContainer, Pill } from '../../../../../components';

export default class SystemTypes extends Component {

    state = {
        selectedSystemTypeNID: "nodeId",
        selectedDetailTypeNID: "nodeId",
        selectedConfigurationTypeNID: "nodeId",
    }

    selectSystemType = ({ nodeId }) => this.setState({
        selectedSystemTypeNID: nodeId
    });

    selectDetailType = ({ nodeId }) => this.setState({
        selectedDetailTypeNID: nodeId
    });

    selectConfigurationType = ({ nodeId }) => this.setState({
        selectedConfigurationTypeNID: nodeId
    });

    render = () => {
        const {
            state: {
                selectedSystemTypeNID,
                selectedDetailTypeNID,
                selectedConfigurationTypeNID,
            },
            selectSystemType,
            selectDetailType,
            selectConfigurationType,
        } = this;

        return (
            <Query
                query={SYSTEM_TYPES_QUERY}
            >
                {({
                    loading,
                    error,
                    data: {
                        allSystemTypes: {
                            nodes: systemTypes = [],
                        } = {},
                        allSystemTags: {
                            nodes: systemTags = []
                        } = {}
                    } = {},
                }) => {
                    const {
                        type: selectedSystemTypeName,
                        systemTypeDetailTypesBySystemTypeId: {
                            nodes: detailTypes = [],
                        } = {},
                        systemTypeDetailTypeConfigurationTypesBySystemTypeId: {
                            nodes: systemTypeDetailTypeConfigurationTypes = []
                        } = {},
                    } = systemTypes.find(({ nodeId }) => nodeId === selectedSystemTypeNID) || {};

                    const {
                        detailTypeByDetailTypeId: {
                            type: selectedDetailTypeName,
                        } = {},
                    } = detailTypes.find(({ detailTypeByDetailTypeId: { nodeId } }) => nodeId === selectedDetailTypeNID) || {};

                    const configurationTypes = systemTypeDetailTypeConfigurationTypes.filter(({ detailTypeByDetailTypeId: { nodeId } }) => nodeId === selectedDetailTypeNID);

                    const {
                        type: selectedConfigurationTypeName,
                    } = systemTypeDetailTypeConfigurationTypes.find(({ configurationTypeByConfigurationTypeId: { nodeId } }) => nodeId === selectedConfigurationTypeNID) || {};

                    return (
                        <div>
                            <HeadedListContainer
                                title="System Types"
                                listItems={systemTypes}
                                renderListItem={({
                                    nodeId,
                                    type,
                                }) => (
                                        <Pill
                                            key={nodeId}
                                            nodeId={nodeId}
                                            tagname="li"
                                            title={type}
                                            selected={nodeId === selectedSystemTypeNID}
                                            onSelect={selectSystemType}
                                        />
                                    )}
                            />
                            <HeadedListContainer
                                title={`Detail Types - ${selectedSystemTypeName}`}
                                listItems={detailTypes}
                                renderListItem={({
                                    detailTypeByDetailTypeId: {
                                        nodeId,
                                        type,
                                    }
                                }) => (
                                        <Pill
                                            key={nodeId}
                                            nodeId={nodeId}
                                            tagname="li"
                                            title={type}
                                            selected={nodeId === selectedDetailTypeNID}
                                            onSelect={selectDetailType}
                                        />
                                    )}
                            />
                            <HeadedListContainer
                                title={`Configuration Types - ${selectedSystemTypeName} > ${selectedDetailTypeName}`}
                                listItems={configurationTypes}
                                renderListItem={({
                                    configurationTypeByConfigurationTypeId: {
                                        nodeId,
                                        type
                                    }
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
                            <HeadedContainer
                                title={`Configuration Type Information - ${selectedSystemTypeName} > ${selectedDetailTypeName} > ${selectedConfigurationTypeName}`}
                            >
                                <input type="checkbox" />
                                <h6>Required</h6>
                                <input type="checkbox" />
                                <h6>Mirror {selectedConfigurationTypeName} Configuration with {selectedDetailTypeName} Detail</h6>
                            </HeadedContainer>
                            <HeadedListContainer
                                title="System Tags"
                                listItems={systemTags}
                                renderListItem={({
                                    nodeId,
                                    type
                                }) => (
                                        <Pill
                                            key={nodeId}
                                            tagname="li"
                                            title={type}
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
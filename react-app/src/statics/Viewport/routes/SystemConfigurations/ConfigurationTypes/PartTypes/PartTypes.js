import React, { Component } from 'react';
import propTypes from 'prop-types';

import {
    update_configuration_type_part_type,
} from './configuration-part-types-graphql';

import {
    HeadedListContainer,
    Pill,
    AsyncModal,
    ListContainer,
} from '../../../../../components';

const initialState = {
    status: "closed",
    addedPartTypes: [],
    deletedPartTypes: []
};

export default class PartTypes extends Component {

    state = initialState;

    handleCancelClick = () => this.setState(initialState);

    handleAddClick = () => this.setState({
        status: "updating",
    });

    handleModalAddClick = ({ nodeId, id, title }) => this.setState(({ addedPartTypes }) => ({
        addedPartTypes: addedPartTypes.concat({ nodeId, id, type: title })
    }));

    handleModalDeleteClick = ({ nodeId }) => {
        if (this.state.deletedPartTypes.includes(nodeId)) {
            this.setState({
                deletedPartTypes: this.state.deletedPartTypes.filter(NID => NID !== nodeId)
            });
        }
        else if (this.props.partTypes.some(({
            partTypeByPartTypeId: {
                nodeId: appliedNID
            }
        }) => nodeId === appliedNID)) {
            this.setState({
                deletedPartTypes: this.state.deletedPartTypes.concat(nodeId)
            });
        }
        else {
            this.setState({
                addedPartTypes: this.state.addedPartTypes.filter(({ nodeId: NID }) => NID !== nodeId)
            });
        }
    }

    render = () => {

        const {
            state: {
                status,
                addedPartTypes,
                deletedPartTypes,
            },
            props: {
                selectedConfigurationTypeId,
                selectedConfigurationTypeName,
                allPartTypes,
                partTypes,
                selectedNID,
                selectPartType,
            },
            handleAddClick,
            handleCancelClick,
            handleModalAddClick,
            handleModalDeleteClick,
            // handleDeleteClick,
        } = this;

        const appliedPartTypes = [
            ...partTypes.map(({ partTypeByPartTypeId, }) => partTypeByPartTypeId),
            ...addedPartTypes
        ];

        const availablePartTypes = allPartTypes
            .filter(({ id }) => !appliedPartTypes
                .some(({ id: appliedId }) => id === appliedId));

        return (
            <HeadedListContainer
                title={`Part Types - ${selectedConfigurationTypeName}`}
                list={{
                    items: partTypes,
                    addButton: {
                        onAdd: handleAddClick
                    },
                    renderItem: ({
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
                                selected={nodeId === selectedNID}
                                onSelect={selectPartType}
                            />
                        )
                }}
                afterList={(
                    <AsyncModal
                        title="Configuration Type Part Types"
                        status={status}
                        onCancel={handleCancelClick}
                        onFinish={handleCancelClick}
                        update={{
                            ...update_configuration_type_part_type,
                            customMutation({ mutate }) {
                                addedPartTypes.forEach(({ id: partTypeId }) => mutate({
                                    variables: {
                                        configurationTypeId: selectedConfigurationTypeId,
                                        partTypeId,
                                        deletePartTypeNID: "",
                                    }
                                }));
                                deletedPartTypes.forEach(NID => mutate({
                                    variables: {
                                        configurationTypeId: -1,
                                        partTypeId: -1,
                                        deletePartTypeNID: NID,
                                    }
                                }));
                            }
                        }}
                    >
                        <ListContainer
                            items={appliedPartTypes}
                            renderItem={({
                                nodeId,
                                id,
                                type,
                                ...partType
                            }) => (
                                    console.log({ nodeId, id, type, ...partType }) ||
                                    <Pill
                                        key={nodeId}
                                        id={id}
                                        nodeId={nodeId}
                                        title={type}
                                        selected={true}
                                        danger={deletedPartTypes.includes(nodeId)}
                                        onDelete={handleModalDeleteClick}
                                    />
                                )}
                        />
                        <HeadedListContainer
                            title={(
                                <div>
                                    <h6>Search</h6>
                                    <input />
                                </div>
                            )}
                            list={{
                                items: availablePartTypes,
                                renderItem: ({
                                    nodeId,
                                    id,
                                    type,
                                }) => (
                                        <Pill
                                            key={nodeId}
                                            id={id}
                                            nodeId={nodeId}
                                            title={type}
                                            onSelect={handleModalAddClick}
                                        />
                                    )
                            }}
                        />
                    </AsyncModal>
                )
                }
            />
        );
    }
}

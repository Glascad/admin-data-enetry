import React, { Component } from 'react';

import {
    create_configuration_type,
    update_configuration_type,
    delete_configuration_type,
} from './configuration-types-query';

import {
    HeadedListContainer,
    Pill,
    AsyncModal,
} from '../../../../../components';

const initialState = {
    editingNID: "",
    deletingNID: "",
    status: "closed",
    type: "",
    door: false,
    vertical: false,
    presentationLevel: -1,
    overrideLevel: -1,
};

export default class ConfTypes extends Component {

    state = initialState;

    handleAddClick = () => this.setState({
        status: "creating"
    });

    handleCancelClick = () => this.setState(initialState);

    handleResetClick = () => {
        const {
            state: {
                status
            }
        } = this;
        if (status === 'updating')
            this.handleEditClick({ nodeId: this.state.editingNID });
        if (status === 'creating')
            this.handleAddClick();
    };

    handleEditClick = ({
        nodeId: editingNID,
    }) => {
        const {
            type,
            door,
            vertical,
            presentationLevel,
            overrideLevel,
        } = {
            ...initialState,
            ...(this.props.configurationTypes.find(({ nodeId }) => nodeId === editingNID) || {}),
        };
        this.setState({
            editingNID,
            status: "updating",
            type,
            door,
            vertical,
            presentationLevel,
            overrideLevel,
        });
    };

    handleDeleteClick = ({ nodeId }) => this.setState({
        deletingNID: nodeId,
        status: "deleting"
    });

    handleChange = key => ({ target: { value } }) => this.setState({
        [key]: value
    });

    render = () => {

        const {
            state: {
                editingNID,
                deletingNID,
                status,
                type,
                door,
                vertical,
                presentationLevel,
                overrideLevel,
            },
            props: {
                configurationTypes,
                selectedNID,
                selectConfigurationType,
            },
            handleAddClick,
            handleCancelClick,
            handleResetClick,
            handleEditClick,
            handleDeleteClick,
            handleChange,
        } = this;

        return (
            <HeadedListContainer
                title="Configuration Types"
                listItems={configurationTypes}
                renderListItem={({
                    nodeId,
                    type,
                }, i) => (
                        <Pill
                            key={nodeId}
                            nodeId={nodeId}
                            tagname="li"
                            title={type}
                            selected={nodeId === selectedNID || (!selectedNID && i === 0)}
                            danger={nodeId === deletingNID}
                            onSelect={selectConfigurationType}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    )}
                onAddListItem={handleAddClick}
                afterList={(
                    <AsyncModal
                        title="Configuration Type"
                        status={status}
                        onCancel={handleCancelClick}
                        onFinish={handleCancelClick}
                        create={{
                            ...create_configuration_type,
                            onReset: handleResetClick,
                            variables: {
                                ...this.state,
                            }
                        }}
                        update={{
                            ...update_configuration_type,
                            onReset: handleResetClick,
                            variables: {
                                nodeId: editingNID,
                                ...this.state,
                            }
                        }}
                        delete={{
                            ...delete_configuration_type,
                            variables: {
                                nodeId: deletingNID,
                            },
                            message: "Are you sure you want to delete ..."
                        }}
                    >
                        <h6>Type</h6>
                        <input
                            value={type}
                            onChange={handleChange('type')}
                        />
                        <h6>Door</h6>
                        <input
                            type="checkbox"
                            checked={door}
                            onChange={handleChange('door')}
                        />
                        <h6>Vertical</h6>
                        <input
                            type="checkbox"
                            checked={vertical}
                            onChange={handleChange('vertical')}
                        />
                        <h6>Presentation Level</h6>
                        <input
                            type="number"
                            value={presentationLevel}
                            onChange={handleChange('presentationLevel')}
                        />
                        <h6>Override Level</h6>
                        <input
                            type="number"
                            value={overrideLevel}
                            onChange={handleChange('overrideLevel')}
                        />
                    </AsyncModal>
                )}
            />
        );
    }
}

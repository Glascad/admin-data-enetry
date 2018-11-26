import React, { Component } from 'react';

import {
    HeadedListContainer,
    Pill,
    AsyncModal,
} from '../../../../../components';

import CreateModal from './modals/Create';
import UpdateModal from './modals/Update';
import DeleteModal from './modals/Delete';

import {
    create_configuration_type,
    update_configuration_type,
    delete_configuration_type,
} from './configuration-types-graphql';

const initialState = {
    editingNID: "",
    deletingNID: "",
    modalStatus: "closed",
    type: "",
    door: false,
    vertical: false,
    presentationLevel: -1,
    overrideLevel: -1,
};

export default class ConfTypes extends Component {

    state = initialState;

    handleAddClick = () => this.setState({
        modalStatus: "creating"
    });

    handleCancelClick = () => this.setState(initialState);

    handleResetClick = () => {
        const {
            state: {
                modalStatus
            }
        } = this;
        if (modalStatus === 'updating')
            this.handleEditClick({ nodeId: this.state.editingNID });
        if (modalStatus === 'creating')
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
            modalStatus: "updating",
            type,
            door,
            vertical,
            presentationLevel,
            overrideLevel,
        });
    };

    handleDeleteClick = ({ nodeId }) => this.setState({
        deletingNID: nodeId,
        modalStatus: "deleting"
    });

    handleChange = key => ({ target: { value } }) => this.setState({
        [key]: value
    });

    render = () => {

        const {
            state: {
                editingNID,
                deletingNID,
                modalStatus,
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
            <div>
                <HeadedListContainer
                    title="Configuration Types"
                    list={{
                        items: configurationTypes,
                        addButton: {
                            onAdd: handleAddClick
                        },
                        renderItem: ({
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
                            )
                    }}
                />
                <AsyncModal
                    title="Configuration Type"
                    status={modalStatus}
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
            </div>
        );
    }
}

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

export default class ConfTypes extends Component {

    state = {
        status: "closed",
        type: "",
        door: false,
        vertical: false,
        presentationLevel: -1,
        overrideLevel: -1,
    };

    renderAddModal = () => this.setState({
        status: "creating"
    });

    handleCancelClick = () => this.setState({
        status: "closed"
    });

    handleResetClick = () => this.setState({

    });

    handleChange = key => ({ target: { value } }) => this.setState({
        [key]: value
    });

    render = () => {

        const {
            state: {
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
            renderAddModal,
            handleCancelClick,
            handleResetClick,
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
                            onSelect={selectConfigurationType}
                        />
                    )}
                onAddListItem={renderAddModal}
                afterList={(
                    <AsyncModal
                        title="Configuration Type"
                        status={status}
                        onCancel={handleCancelClick}
                        create={{
                            ...create_configuration_type,
                            onReset: () => { },
                            variables: {
                                ...this.state,
                            }
                        }}
                        update={{
                            ...update_configuration_type,
                            onReset: () => { },
                            variables: {
                                nodeId: selectedNID,
                                ...this.state,
                            }
                        }}
                        delete={{
                            ...delete_configuration_type,
                            onReset: () => { },
                            variables: {
                                nodeId: selectedNID,
                                ...this.state,
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
                        <input type="checkbox"
                            value={door}
                            onChange={handleChange('door')}
                        />
                        <h6>Vertical</h6>
                        <input type="checkbox"
                            value={vertical}
                            onChange={handleChange('vertical')}
                        />
                        <h6>Presentation Level</h6>
                        <input
                            value={presentationLevel}
                            onChange={handleChange('presentationLevel')}
                        />
                        <h6>Override Level</h6>
                        <input
                            value={overrideLevel}
                            onChange={handleChange('overrideLevel')}
                        />
                    </AsyncModal>
                )}
            />
        );
    }
}

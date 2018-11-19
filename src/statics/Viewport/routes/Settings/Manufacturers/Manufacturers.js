import React, { Component } from 'react';
import { Query } from 'react-apollo';

import {
    query,
    create_mnfg,
    update_mnfg,
    delete_mnfg,
} from './mnfg-gql';

import {
    HeadedListContainer,
    Pill,
    OldAsyncModal,
} from '../../../../../components';

export default class Manufacturers extends Component {

    state = {
        selectedMnfgNID: 'nodeId',
        modal: {},
        name: '',
    };

    renderDeleteModal = ({ nodeId, title }) => this.setState({
        selectedMnfgNID: nodeId,
        modal: delete_mnfg,
        name: title,
    })

    renderUpdateModal = ({ nodeId, title }) => this.setState({
        selectedMnfgNID: nodeId,
        modal: update_mnfg,
        name: title,
    });

    renderAddModal = () => this.setState({
        selectedMnfgNID: "nodeId",
        modal: create_mnfg,
        name: ''
    });

    cancelModal = () => this.setState({
        selectedMnfgNID: "nodeId",
        modal: {},
        name: '',
    });

    handleInput = ({ target: { value } }) => this.setState({
        name: value,
    });

    render = () => {
        const {
            state: {
                selectedMnfgNID,
                modal,
                modal: {
                    mutation: selectedMutation,
                    update: selectedUpdate,
                },
                name,
            },
            renderAddModal,
            renderUpdateModal,
            renderDeleteModal,
            cancelModal,
            handleInput,
        } = this;

        console.log(this.state);

        return (
            <Query
                query={query}
            >
                {({
                    loading,
                    error,
                    data: {
                        allManufacturers: {
                            nodes: manufacturers = [],
                        } = {},
                    } = {},
                }) => {
                    const {
                        name: selectedMnfgName
                    } = manufacturers.find(({ nodeId }) => nodeId === selectedMnfgNID) || {};

                    return (
                        <HeadedListContainer
                            id="Manufacturers"
                            title="Manufacturers"
                            sorts={[
                                {
                                    name: "Alphabetical",
                                    callback: () => 0,
                                }
                            ]}
                            listItems={manufacturers}
                            renderListItem={({
                                nodeId,
                                id,
                                name
                            }) => (
                                    <Pill
                                        key={nodeId}
                                        nodeId={nodeId}
                                        type="tile"
                                        align="left"
                                        tagname="li"
                                        title={name}
                                        footer="Last Updated:"
                                        selected={selectedMnfgNID === nodeId}
                                        onSelect={renderUpdateModal}
                                        onDelete={renderDeleteModal}
                                        danger={selectedMnfgNID === nodeId && modal === delete_mnfg}
                                    />
                                )}
                            afterList={[create_mnfg, update_mnfg, delete_mnfg]
                                .map(({ mutation, update, ...props }, i) => (
                                    <OldAsyncModal
                                        key={i}
                                        mutation={mutation}
                                        variables={{ name, nodeId: selectedMnfgNID }}
                                        update={update}
                                        afterUpdate={cancelModal}
                                        display={mutation === selectedMutation}
                                        onCancel={cancelModal}
                                        {...props}
                                    >
                                        {i !== 2 ? (
                                            <div>
                                                <h6>Name</h6>
                                                <input
                                                    value={name}
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        ) : (
                                                <div className="warning">
                                                    Are you sure you want to permanently delete Manufacturer: {selectedMnfgName}?
                                                </div>
                                            )}
                                    </OldAsyncModal>
                                ))}
                            addButtonType="large"
                            onAddListItem={renderAddModal}
                        />
                    )
                }}
            </Query>
        );
    }
}

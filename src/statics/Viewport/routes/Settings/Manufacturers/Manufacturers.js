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
    AsyncModal,
} from '../../../../../components';

export default class Manufacturers extends Component {

    state = {
        selectedMnfgNID: 'nodeId',
        modal: {},
        name: '',
    };

    renderDeleteModal = ({ nodeId, name }) => this.setState({
        selectedMnfgNID: nodeId,
        modal: delete_mnfg,
        name,
    })

    renderUpdateModal = ({ nodeId, name }) => this.setState({
        selectedMnfgNID: nodeId,
        modal: update_mnfg,
        name,
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
                }) => (
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
                                    />
                                )}
                            afterList={[create_mnfg, update_mnfg, delete_mnfg]
                                .map(({ mutation, update, title }, i) => (
                                    <AsyncModal
                                        key={i}
                                        mutation={mutation}
                                        variables={{ name }}
                                        update={update}
                                        display={mutation === selectedMutation}
                                        title={title}
                                        onCancel={cancelModal}
                                    >
                                        <h6>Name</h6>
                                        <input
                                            value={name}
                                            onChange={handleInput}
                                        />
                                    </AsyncModal>
                                ))}
                            addButtonType="large"
                            onAddListItem={renderAddModal}
                        />
                    )}
            </Query>
        );
    }
}

import React, { Component } from 'react';
import {
    Query,
    Mutation,
} from 'react-apollo';

import MNFG_QUERY from './mnfg-query';
import MNFG_MUTATION from './mnfg-mutation';

import {
    HeadedListContainer,
    Pill,
    AsyncModal,
} from '../../../../../components';

export default class Manufacturers extends Component {

    state = {
        modal: false,
        name: ''
    };

    renderModal = () => this.setState({
        modal: true
    });

    cancelModal = () => this.setState({
        modal: false,
        name: ''
    });

    handleInput = ({ target: { value } }) => this.setState({
        name: value
    });

    update = (cache, {
        data: {
            createManufacturer: {
                manufacturer
            }
        }
    }) => {
        const {
            allManufacturers
        } = cache.readQuery({ query: MNFG_QUERY });
        cache.writeQuery({
            query: MNFG_QUERY,
            data: {
                allManufacturers: {
                    ...allManufacturers,
                    nodes: allManufacturers.nodes.concat(manufacturer)
                }
            }
        });
        this.cancelModal();
    }

    render = () => {
        const {
            state: {
                modal,
                name,
            },
            renderModal,
            cancelModal,
            handleInput,
            update
        } = this;

        return (
            <Query
                query={MNFG_QUERY}
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
                                        type="tile"
                                        align="left"
                                        tagname="li"
                                        title={name}
                                        footer="Last Updated:"
                                    />
                                )}
                            afterList={(
                                <AsyncModal
                                    mutation={MNFG_MUTATION}
                                    variables={{ name }}
                                    update={update}
                                    display={modal}
                                    title="New Manufacturer"
                                    onCancel={cancelModal}
                                >
                                    <h6>Name</h6>
                                    <input
                                        value={name}
                                        onChange={handleInput}
                                    />
                                </AsyncModal>
                            )}
                            addButtonType="large"
                            onAddListItem={renderModal}
                        />
                    )}
            </Query>
        );
    }
}

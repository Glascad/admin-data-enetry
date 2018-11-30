import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import Manufacturers from './Manufacturers';

import {
    query,
    create,
    update,
    _delete,
} from './manufacturers-graphql';

export default class ManufacturersApollo extends Component {

    createUpdate = (...args) => {
        create.update(...args);
        this.updateAfterCreate(...args);
    }

    deleteUpdate = (...args) => {
        _delete.update(...args);
        this.updateAfterDelete(...args);
    }

    updateAfterCreate = () => { }
    updateAfterDelete = () => { }

    onCreateUpdate = cb => {
        this.updateAfterCreate = cb;
    }

    onDeleteUpdate = cb => {
        this.updateAfterDelete = cb;
    }

    render = () => {
        const {
            createUpdate,
            deleteUpdate,
            onCreateUpdate,
            onDeleteUpdate,
        } = this;

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
                        <Mutation
                            mutation={create.mutation}
                            update={createUpdate}
                        >
                            {createManufacturer => (
                                <Mutation
                                    mutation={update.mutation}
                                >
                                    {updateManufacturer => (
                                        <Mutation
                                            mutation={_delete.mutation}
                                            update={deleteUpdate}
                                        >
                                            {deleteManufacturer => (
                                                <Manufacturers
                                                    {...{
                                                        manufacturers,
                                                        createManufacturer,
                                                        updateManufacturer,
                                                        deleteManufacturer,
                                                        onCreateUpdate,
                                                        onDeleteUpdate,
                                                    }}
                                                />
                                            )}
                                        </Mutation>
                                    )}
                                </Mutation>
                            )}
                        </Mutation>
                    )}
            </Query>
        );
    }
}
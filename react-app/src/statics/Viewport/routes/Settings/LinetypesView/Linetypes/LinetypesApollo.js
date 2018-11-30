import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import Linetypes from './Linetypes';

import {
    query,
    create,
    update,
    _delete,
} from './linetypes-graphql';

export default class LinetypesApollo extends Component {

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
                        allLinetypes: {
                            nodes: linetypes = [],
                        } = {},
                        allLineWeights: {
                            nodes: lineWeights = [],
                        } = {},
                    } = {},
                }) => (
                        <Mutation
                            mutation={create.mutation}
                            update={createUpdate}
                        >
                            {createLinetype => (
                                <Mutation
                                    mutation={update.mutation}
                                >
                                    {updateLinetype => (
                                        <Mutation
                                            mutation={_delete.mutation}
                                            update={deleteUpdate}
                                        >
                                            {deleteLinetype => (
                                                <Linetypes
                                                    {...{
                                                        linetypes,
                                                        lineWeights,
                                                        createLinetype,
                                                        updateLinetype,
                                                        deleteLinetype,
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
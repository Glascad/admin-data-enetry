import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import LineWeights from './LineWeights';

import {
    query,
    create,
    update,
    _delete,
} from './lineWeights-graphql';

export default class LineWeightsApollo extends Component {

    createUpdate = (...args) => {
        create.update(...args);
        this.updateAfterCreate();
    }

    deleteUpdate = (...args) => {
        _delete.update(...args);
        this.updateAfterDelete();
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
                        allLineWeights: {
                            nodes: lineWeights = []
                        } = {},
                    } = {},
                }) => (
                        <Mutation
                            mutation={create.mutation}
                            update={createUpdate}
                        >
                            {createLineWeight => (
                                <Mutation
                                    mutation={update.mutation}
                                >
                                    {updateLineWeight => (
                                        <Mutation
                                            mutation={_delete.mutation}
                                            update={deleteUpdate}
                                        >
                                            {deleteLineWeight => (
                                                <LineWeights
                                                    {...{
                                                        lineWeights,
                                                        createLineWeight,
                                                        updateLineWeight,
                                                        deleteLineWeight,
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
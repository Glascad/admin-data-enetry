import React, { Component } from 'react';
import ApolloWrapper from '../ApolloWrapper';

class Batcher extends Component {

    mutations = [];

    createItem = (...args) => this.mutations.push(() => {
        this.props.apollo.createItem(...args);
    });

    updateItem = (...args) => this.mutations.push(() => {
        this.props.apollo.updateItem(...args);
    });

    deleteItem = (...args) => this.mutations.push(() => {
        this.props.apollo.deleteItem(...args);
    });

    batchMutation = mutation => this.mutations.push(mutation);

    reset = () => this.mutations = [];

    save = () => {
        this.mutations.forEach(mutation => mutation());
        this.mutations = [];
    }

    render = () => {
        const {
            props: {
                children
            }
        } = this;

        return children();
    }
}

export default function ApolloBatcher({
    apolloProps,
    apolloProps: {
        create: {
            mutation: createMutation = false,
        } = {},
        update: {
            mutation: updateMutation = false,
        } = {},
        _delete: {
            mutation: deleteMutation = false,
        } = {},
    },
    ...props
}) {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {apollo => (
                <SelectionWrapper>
                    {selection => (
                        <Batcher
                            canCreate={!!createMutation}
                            canUpdate={!!updateMutation}
                            canDelete={!!deleteMutation}
                            selection={selection}
                            apollo={apollo}
                            {...props}
                        />
                    )}
                </SelectionWrapper>
            )}
        </ApolloWrapper>
    );
}

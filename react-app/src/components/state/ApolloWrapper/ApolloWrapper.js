import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

export default class ApolloWrapper extends Component {

    static propTypes = {
        children: PropTypes.func.isRequired,
        batchMutations: PropTypes.bool,
        query: PropTypes.object,
        queryVariables: PropTypes.object,
        create: PropTypes.object,
        update: PropTypes.object,
        _delete: PropTypes.object,
    };

    // REFACTOR BATCHING OUT when done converting all components

    mutations = [];

    batchMutation = mutation => this.mutations.push(mutation);

    resetMutations = () => this.mutations = [];

    // Array.prototype.replace is in `public/index.html`
    replaceMutation = (index, newMutation) => this.mutations.replace(index, newMutation);

    completeMutations = () => {
        this.mutations.forEach(mutation => mutation());
        this.resetMutations();
    }

    createUpdate = (...args) => {
        if (this.props.create && this.props.create.update)
            this.props.create.update(...args);
        this.updateAfterCreate(...args);
    }

    updateUpdate = (...args) => {
        if (this.props.update && this.props.update.update)
            this.props.update.update(...args);
        this.updateAfterUpdate(...args);
    }

    deleteUpdate = (...args) => {
        if (this.props._delete && this.props._delete.update)
            this.props._delete.update(...args);
        this.updateAfterDelete(...args);
    }

    updateAfterCreate = () => { }
    updateAfterUpdate = () => { }
    updateAfterDelete = () => { }

    onCreate = cb => this.updateAfterCreate = cb;

    onUpdate = cb => this.updateAfterUpdate = cb;

    onDelete = cb => this.updateAfterDelete = cb;

    static RenderChildren = message => ({ children }) => children(() => {
        throw new Error(message);
    });

    Read = this.props.query ?
        Query
        :
        ApolloWrapper.RenderChildren("No QUERY specified");

    Create = this.props.create && this.props.create.mutation ?
        Mutation
        :
        ApolloWrapper.RenderChildren("No CREATE specified");

    Update = this.props.update && this.props.update.mutation ?
        Mutation
        :
        ApolloWrapper.RenderChildren("No UPDATE specified");

    Delete = this.props._delete && this.props._delete.mutation ?
        Mutation
        :
        ApolloWrapper.RenderChildren("No DELETE specified");

    // for the sake of destructuring in child components
    removeNullValues = (prev = []) => obj => (obj === null ?
        undefined
        :
        typeof obj !== 'object' || prev.includes(obj) ?
            obj
            :
            Array.isArray(obj) ?
                obj.map(this.removeNullValues([...prev, obj]))
                :
                Object.keys(obj)
                    .reduce((filteredObj, key) => {
                        const value = this.removeNullValues([...prev, obj])(obj[key]);
                        return value === undefined ?
                            // console.log(`REMOVED KEY: \n "${key}" \n from object: \n`, obj)
                            // ||
                            filteredObj
                            :
                            {
                                ...filteredObj,
                                [key]: value
                            }
                    }, {})
    );

    filterData = obj => this.removeNullValues()(obj);

    render = () => {
        const {
            props: {
                children = () => null,
                batchMutations,
                query,
                queryVariables,
                create,
                update,
                _delete,
                batcher,
                batcher: {
                    propsBatchMutation,
                    propsResetMutations,
                    propsReplaceMutation,
                    propsCompleteMutations,
                } = {}
            },
            // data filtering
            filterData,
            // components
            Read,
            Create,
            Update,
            Delete,
            // methods
            createUpdate,
            updateUpdate,
            deleteUpdate,
            onCreate,
            onUpdate,
            onDelete,
            // abstraction methods
            batchMutation,
            resetMutations,
            replaceMutation,
            completeMutations,
        } = this;

        return (
            <Read
                query={query}
                variables={queryVariables}
            >
                {queryStatus => (
                    <Create
                        {...create}
                        update={createUpdate}
                    >
                        {(createItem, createStatus) => (
                            <Update
                                {...update}
                                update={updateUpdate}
                            >
                                {(updateItem, updateStatus) => (
                                    <Delete
                                        {..._delete}
                                        update={deleteUpdate}
                                    >
                                        {(deleteItem, deleteStatus) => (
                                            children({
                                                queryStatus: {
                                                    ...queryStatus,
                                                    data: filterData(
                                                        queryStatus
                                                        &&
                                                        queryStatus.data
                                                    )
                                                },
                                                createStatus: {
                                                    ...createStatus,
                                                    data: filterData(
                                                        createStatus
                                                        &&
                                                        createStatus.data
                                                    )
                                                },
                                                updateStatus: {
                                                    ...updateStatus,
                                                    data: filterData(
                                                        updateStatus
                                                        &&
                                                        updateStatus.data
                                                    )
                                                },
                                                deleteStatus: {
                                                    ...deleteStatus,
                                                    data: filterData(
                                                        deleteStatus
                                                        &&
                                                        deleteStatus.data
                                                    )
                                                },
                                                createItem: batchMutations ?
                                                    (...args) => batchMutation(() => {
                                                        createItem(...args)
                                                    })
                                                    :
                                                    batcher ?
                                                        (...args) => propsBatchMutation(() => {
                                                            createItem(...args)
                                                        })
                                                        :
                                                        createItem,
                                                updateItem: batchMutations ?
                                                    (...args) => batchMutation(() => {
                                                        updateItem(...args)
                                                    })
                                                    :
                                                    batcher ?
                                                        (...args) => propsBatchMutation(() => {
                                                            updateItem(...args)
                                                        })
                                                        :
                                                        updateItem,
                                                deleteItem: batchMutations ?
                                                    (...args) => batchMutation(() => {
                                                        deleteItem(...args)
                                                    })
                                                    :
                                                    batcher ?
                                                        (...args) => propsBatchMutation(() => {
                                                            deleteItem(...args)
                                                        })
                                                        :
                                                        deleteItem,
                                                onCreate,
                                                onUpdate,
                                                onDelete,
                                                batchMutation,
                                                resetMutations,
                                                replaceMutation,
                                                completeMutations,
                                            })
                                        )}
                                    </Delete>
                                )}
                            </Update>
                        )}
                    </Create>
                )}
            </Read>
        );
    }
}

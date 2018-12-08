import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

export default class CRUDWrapper extends Component {

    static propTypes = {
        children: PropTypes.func.isRequired,
        query: PropTypes.object,
        queryVariables: PropTypes.object,
        create: PropTypes.object,
        update: PropTypes.object,
        _delete: PropTypes.object,
    };

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
        CRUDWrapper.RenderChildren("No QUERY specified");

    Create = this.props.create && this.props.create.mutation ?
        Mutation
        :
        CRUDWrapper.RenderChildren("No CREATE specified");

    Update = this.props.update && this.props.update.mutation ?
        Mutation
        :
        CRUDWrapper.RenderChildren("No UPDATE specified");

    Delete = this.props._delete && this.props._delete.mutation ?
        Mutation
        :
        CRUDWrapper.RenderChildren("No DELETE specified");

    // for the sake of destructuring in child components
    removeNullValues = ({ data } = {}) => data === null ?
        undefined
        :
        typeof data !== 'object' ?
            {
                data
            }
            :
            {
                data: Object
                    .keys(data)
                    .reduce((filteredData, key) => data[key] !== null ?
                        {
                            ...filteredData,
                            [key]: data[key]
                        }
                        :
                        filteredData,
                        {})
            };

    render = () => {
        const {
            props: {
                children,
                query,
                queryVariables,
                create,
                update,
                _delete,
            },
            // data filtering
            removeNullValues,
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
                                                queryStatus: removeNullValues(queryStatus),
                                                createStatus: removeNullValues(createStatus),
                                                updateStatus: removeNullValues(updateStatus),
                                                deleteStatus: removeNullValues(deleteStatus),
                                                createItem,
                                                updateItem,
                                                deleteItem,
                                                onCreate,
                                                onUpdate,
                                                onDelete,
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

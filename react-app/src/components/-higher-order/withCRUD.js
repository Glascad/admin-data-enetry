import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';

export default ({
    query,
    create,
    update,
    _delete,
},
    mapProps = (
        CRUD => ({ CRUD })
    )
) => (
    WrappedComponent
) => (
            class WithCRUD extends Component {

                createUpdate = (...args) => {
                    create.update(...args);
                    this.updateAfterCreate(...args);
                }

                updateUpdate = (...args) => {
                    update.update(...args);
                    this.updateAfterUpdate(...args);
                }

                deleteUpdate = (...args) => {
                    _delete.update(...args);
                    this.updateAfterDelete(...args);
                }

                updateAfterCreate = () => { }
                updateAfterUpdate = () => { }
                updateAfterDelete = () => { }

                onCreate = cb => this.updateAfterCreate = cb;

                onUpdate = cb => this.updateAfterUpdate = cb;

                onDelete = cb => this.updateAfterDelete = cb;

                render = () => {
                    const {
                        props,
                        createUpdate,
                        deleteUpdate,
                        onCreate,
                        onUpdate,
                        onDelete,
                    } = this;

                    const RenderChildren = message => ({ children }) => children(() => new Error(message));

                    const Read = query ? Query : RenderChildren("No QUERY specified");

                    const Create = create ? Mutation : RenderChildren("No CREATE specified");

                    const Update = update ? Mutation : RenderChildren("No UPDATE specified");

                    const Delete = _delete ? Mutation : RenderChildren("No DELETE specified");

                    return (
                        <Read
                            query={query}
                        >
                            {queryStatus => (
                                <Create
                                    mutation={create.mutation}
                                    update={createUpdate}
                                >
                                    {(createItem, createStatus) => (
                                        <Update
                                            mutation={update.mutation}
                                            update={update.update}
                                        >
                                            {(updateItem, updateStatus) => (
                                                <Delete
                                                    mutation={_delete.mutation}
                                                    update={deleteUpdate}
                                                >
                                                    {(deleteItem, deleteStatus) => (
                                                        <WrappedComponent
                                                            {...props}
                                                            {...mapProps({
                                                                queryStatus,
                                                                createStatus,
                                                                updateStatus,
                                                                deleteStatus,
                                                                createItem,
                                                                updateItem,
                                                                deleteItem,
                                                                onCreate,
                                                                onUpdate,
                                                                onDelete,
                                                            })}
                                                        />
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
        );
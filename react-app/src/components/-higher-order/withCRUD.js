import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import CRUDWrapper from './CRUDWrapper';

export default ({
    query,
    create = {},
    update = {},
    _delete = {},
},
    mapProps = (
        CRUD => ({ CRUD })
    )
) => (
    WrappedComponent
) => (
            props => (
                <CRUDWrapper
                    {...{
                        ...props,
                        query,
                        create,
                        update,
                        _delete,
                        mapProps,
                        Component: WrappedComponent
                    }}
                />
            )
            // class WithCRUD extends Component {

            //     createUpdate = (...args) => {
            //         if (create.update)
            //             create.update(...args);
            //         this.updateAfterCreate(...args);
            //     }

            //     updateUpdate = (...args) => {
            //         if (update.update)
            //             update.update(...args);
            //         this.updateAfterUpdate(...args);
            //     }

            //     deleteUpdate = (...args) => {
            //         if (_delete.update)
            //             _delete.update(...args);
            //         this.updateAfterDelete(...args);
            //     }

            //     updateAfterCreate = () => { }
            //     updateAfterUpdate = () => { }
            //     updateAfterDelete = () => { }

            //     onCreate = cb => this.updateAfterCreate = cb;

            //     onUpdate = cb => this.updateAfterUpdate = cb;

            //     onDelete = cb => this.updateAfterDelete = cb;

            //     render = () => {
            //         const {
            //             props,
            //             createUpdate,
            //             updateUpdate,
            //             deleteUpdate,
            //             onCreate,
            //             onUpdate,
            //             onDelete,
            //         } = this;

            //         const RenderChildren = message => ({ children }) => children(() => {
            //             throw new Error(message);
            //         });

            //         const Read = query ? Query : RenderChildren("No QUERY specified");

            //         const Create = create.mutation ? Mutation : RenderChildren("No CREATE specified");

            //         const Update = update.mutation ? Mutation : RenderChildren("No UPDATE specified");

            //         const Delete = _delete.mutation ? Mutation : RenderChildren("No DELETE specified");

            //         return (
            //             <Read
            //                 query={query}
            //             >
            //                 {queryStatus => (
            //                     <Create
            //                         {...create}
            //                         update={createUpdate}
            //                     >
            //                         {(createItem, createStatus) => (
            //                             <Update
            //                                 {...update}
            //                                 update={updateUpdate}
            //                             >
            //                                 {(updateItem, updateStatus) => (
            //                                     <Delete
            //                                         {..._delete}
            //                                         update={deleteUpdate}
            //                                     >
            //                                         {(deleteItem, deleteStatus) => (
            //                                             <WrappedComponent
            //                                                 {...props}
            //                                                 {...mapProps({
            //                                                     queryStatus,
            //                                                     createStatus,
            //                                                     updateStatus,
            //                                                     deleteStatus,
            //                                                     createItem,
            //                                                     updateItem,
            //                                                     deleteItem,
            //                                                     onCreate,
            //                                                     onUpdate,
            //                                                     onDelete,
            //                                                 })}
            //                                             />
            //                                         )}
            //                                     </Delete>
            //                                 )}
            //                             </Update>
            //                         )}
            //                     </Create>
            //                 )}
            //             </Read>
            //         );
            //     }
            // }
        );
// import React, { Component } from 'react';

// import {
//     HeadedListContainer,
//     Pill,
//     Modal,
//     withSelect,
//     withCRUD,
// } from '../../../../../components';

import {
    CRUDList,
} from '../../../../../components';

import {
    query,
    create,
    update,
    _delete,
} from './manufacturers-graphql';

export default CRUDList({
    query,
    create,
    update,
    _delete,
}, {
        name: "Manufacturer",
        extractList: ({
            data: {
                allManufacturers: {
                    nodes = []
                } = {}
            } = {}
        }) => nodes,
        defaultPillProps: {
            type: "tile",
            align: "left",
            footer: "Last Updated: ...",
        },
        mapPillProps: ({
            nodeId,
            id,
            name,
        }) => ({
            nodeId,
            key: nodeId,
            title: name,
            arguments: {
                nodeId,
            },
        }),
        mapCreateVariables: ({ }, { input }) => ({ name: input }),
        mapUpdateVariables: ({ arguments: { nodeId } }, { input }) => ({ nodeId, name: input }),
        addButtonProps: {
            type: "large"
        },
        mapModalProps: ({ name }) => ({
            children: `Are you sure you want to delete Manufacturer ${name}?`
        }),
    })();

// class Manufacturers extends Component {

//     handleCreate = ({ }, { input }) => {
//         this.props.CRUD.onCreate(this.props.withSelectProps.cancel);
//         this.props.CRUD.createItem({
//             variables: {
//                 name: input,
//             }
//         });
//     }

//     handleEdit = ({ arguments: { nodeId } }, { input }) => this.props.CRUD.updateItem({
//         variables: {
//             nodeId,
//             name: input,
//         }
//     });

//     handleDelete = () => {
//         this.props.CRUD.onDelete(this.props.withSelectProps.cancel);
//         this.props.CRUD.deleteItem({
//             variables: {
//                 nodeId: this.props.withSelectProps.selectedNID
//             }
//         });
//     }

//     render = () => {
//         const {
//             props: {
//                 CRUD: {
//                     queryStatus: {
//                         data: {
//                             allManufacturers: {
//                                 nodes: manufacturers = [],
//                             } = {},
//                         } = {}
//                     }
//                 },
//                 withSelectProps: {
//                     selectedNID,
//                     creating,
//                     deleting,
//                     cancel,
//                     handleCreateClick,
//                     handleDeleteClick,
//                 }
//             },
//             handleEdit,
//             handleCreate,
//             handleDelete,
//         } = this;

//         const deleteMnfg = manufacturers
//             .find(({ nodeId }) => nodeId === selectedNID)
//             ||
//             manufacturers[0]
//             ||
//             {};

//         return (
//             <div>
//                 <HeadedListContainer
//                     id="Manufacturers"
//                     title="Manufacturers"
//                     list={{
//                         items: manufacturers,
//                         renderItem: ({
//                             nodeId,
//                             name,
//                         }) => (
//                                 // MANUFACTURER PILL
//                                 <Pill
//                                     key={nodeId}
//                                     type="tile"
//                                     align="left"
//                                     tagname="li"
//                                     title={name}
//                                     footer="Last Updated:"
//                                     arguments={{
//                                         nodeId,
//                                     }}
//                                     onEdit={handleEdit}
//                                     danger={deleting && nodeId === selectedNID}
//                                     onDelete={handleDeleteClick}
//                                 />
//                             ),
//                         creating,
//                         createItem: (
//                             // CREATE MANUFACTURER PILL
//                             <Pill
//                                 type="tile"
//                                 align="left"
//                                 tagname="li"
//                                 editing={true}
//                                 onEdit={handleCreate}
//                                 onBlur={cancel}
//                             />
//                         ),
//                         addButton: {
//                             type: "large",
//                             onAdd: handleCreateClick,
//                         }
//                     }}
//                 />
//                 <Modal
//                     title={`Delete Manufacturer`}
//                     display={deleting}
//                     danger={true}
//                     onFinish={handleDelete}
//                     onCancel={cancel}
//                 >
//                     Are you sure you want to delete Manufacturer: {deleteMnfg.name}?
//                 </Modal>
//             </div>
//         );
//     }
// }

// export default withCRUD({
//     query,
//     create,
//     update,
//     _delete,
// })(withSelect()(Manufacturers));

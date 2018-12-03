// import React, { Component } from 'react';

// import {
//     HeadedListContainer,
//     Pill,
//     Modal,
//     withSelect,
//     withCRUD,
// } from '../../../../../components';

import React from 'react';

import {
    CRUDListWrapper,
} from '../../../../../components';

import * as CRUDProps from './manufacturers-graphql';

export default function Manufacturers() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="Manufacturer"
            extractList={({
                allManufacturers: {
                    nodes = [],
                } = {},
            }) => nodes}
            defaultPillProps={{
                type: "tile",
                align: "left",
                footer: "Last Updated: ...",
                selectable: false,
            }}
            mapPillProps={({ name, }) => ({
                title: name,
            })}
            mapCreateVariables={({ }, { input }) => ({
                name: input,
            })}
            extractCreatedNID={({
                createManufacturer: {
                    manufacturer: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                name: input,
            })}
            addButtonProps={{
                type: "large",
            }}
            extractName={({ name }) => name}
        />
    );
}

// export default CRUDList(CRUDOptions, {
//     itemClass: "Manufacturer",
//     extractList: ({
//         data: {
//             allManufacturers: {
//                 nodes = [],
//             } = {},
//         } = {},
//     }) => nodes,
//     defaultPillProps: {
//         type: "tile",
//         align: "left",
//         footer: "Last Updated: ...",
//         selectable: false,
//     },
//     mapPillProps: ({ nodeId, name, }) => ({
//         nodeId,
//         key: nodeId,
//         title: name,
//         arguments: {
//             nodeId,
//         },
//     }),
//     mapCreateVariables: ({ }, { input }) => ({
//         name: input,
//     }),
//     mapUpdateVariables: ({ arguments: { nodeId } }, { input }) => ({
//         nodeId,
//         name: input,
//     }),
//     addButtonProps: {
//         type: "large",
//     },
//     extractName: ({ name }) => name,
// });

// class Manufacturers extends Component {

//     handleCreate = ({ }, { input }) => {
//         this.props.CRUD.onCreate(this.props.selection.cancel);
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
//         this.props.CRUD.onDelete(this.props.selection.cancel);
//         this.props.CRUD.deleteItem({
//             variables: {
//                 nodeId: this.props.selection.selectedNID
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
//                 selection: {
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

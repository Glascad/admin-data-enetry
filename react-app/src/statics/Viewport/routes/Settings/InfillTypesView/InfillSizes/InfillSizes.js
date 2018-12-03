import React from 'react';

import {
    CRUDListWrapper
} from '../../../../../../components';

import * as CRUDProps from './infill-sizes-graphql';

export default function InfillSizes() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="Infill Size"
            extractList={({
                allInfillPocketSizes: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({
                size,
            }) => ({
                title: `${size}"`,
            })}
            mapCreateVariables={({ }, { input }) => ({
                size: input,
            })}
            extractCreatedNID={({
                createInfillPocketSize: {
                    infillPocketSize: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                size: input,
            })}
            extractName={({ size }) => size}
        />
    );
}


// export default CRUDList(CRUDOptions, {
//     itemClass: "Infill Size",
//     extractList: ({
//         data: {
//             allInfillPocketSizes: {
//                 nodes = [],
//             } = {},
//         } = {},
//     }) => nodes,
//     mapPillProps: ({
//         nodeId,
//         size,
//     }) => ({
//         nodeId,
//         key: nodeId,
//         title: `${size}"`,
//         arguments: {
//             nodeId,
//             size,
//         },
//     }),
//     mapCreateVariables: ({ }, { input }) => ({
//         size: input,
//     }),
//     mapUpdateVariables: ({ arguments: { nodeId } }, { input }) => ({
//         nodeId,
//         size: input,
//     }),
//     extractName: ({ size }) => size,
// });



// import React, { Component } from 'react';

// import {
//     query,
//     create,
//     update,
//     _delete,
// } from './infill-sizes-graphql';

// import {
//     HeadedListContainer,
//     Pill,
//     Modal,
//     withCRUD,
//     withSelect,
// } from '../../../../../../components';

// class InfillSizes extends Component {

//     handleCreate = ({ }, { input }) => {
//         this.props.CRUD.onCreate(this.props.withSelectProps.cancel);
//         this.props.CRUD.createItem({
//             variables: {
//                 size: input,
//             },
//         });
//     }

//     handleUpdate = ({ arguments: { nodeId } }, { input }) => this.props.CRUD.updateItem({
//         variables: {
//             nodeId,
//             size: input,
//         },
//     });

//     handleDelete = () => {
//         this.props.CRUD.onDelete(this.props.withSelectProps.cancel);
//         this.props.CRUD.deleteItem({
//             variables: {
//                 nodeId: this.props.withSelectProps.selectedNID,
//             },
//         });
//     }

//     render = () => {

//         const {
//             props: {
//                 CRUD: {
//                     queryStatus: {
//                         data: {
//                             allInfillPocketSizes: {
//                                 nodes: sizes = [],
//                             } = {},
//                         } = {},
//                     },
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
//             handleCreate,
//             handleUpdate,
//             handleDelete,
//         } = this;

//         const selectedSize = sizes.find(({ nodeId }) => nodeId === selectedNID)
//             ||
//             sizes[0]
//             ||
//             {};

//         return (
//             <div>
//                 <HeadedListContainer
//                     title="Infill Pocket Sizes"
//                     list={{
//                         items: sizes,
//                         renderItem: ({
//                             nodeId,
//                             size
//                         }) => (
//                                 <Pill
//                                     key={nodeId}
//                                     tagname="li"
//                                     title={`${size}"`}
//                                     inputValue={size}
//                                     inputType="number"
//                                     arguments={{
//                                         nodeId
//                                     }}
//                                     onEdit={handleUpdate}
//                                     danger={deleting && nodeId === selectedNID}
//                                     onDelete={handleDeleteClick}
//                                 />
//                             ),
//                         creating,
//                         createItem: (
//                             <Pill
//                                 tagname="li"
//                                 editing={creating}
//                                 onEdit={handleCreate}
//                                 onBlur={cancel}
//                             />
//                         ),
//                         addButton: {
//                             onAdd: handleCreateClick
//                         }
//                     }}
//                 />
//                 <Modal
//                     title="Delete Infill Pocket Size"
//                     display={deleting}
//                     danger={true}
//                     onFinish={handleDelete}
//                     onCancel={cancel}
//                 >
//                     Are you sure you want to delete infill pocket size {selectedSize.size}"?
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
// })(withSelect()(InfillSizes));

import React from 'react';

import {
    CRUDListWrapper
} from '../../../../../../components';

import * as CRUDProps from './infill-types-graphql';


export default function InfillTypes() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass={"Infill Pocket Type"}
            extractList={({
                allInfillPocketTypes: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({
                type,
            }) => ({
                title: type,
            })}
            mapCreateVariables={({ }, { input }) => ({
                type: input,
            })}
            extractCreatedNID={({
                createInfillPocketType: {
                    infillPocketType: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                type: input,
            })}
            extractName={({ type }) => type}
        />
    );
}

// export default CRUDList(CRUDProps, {
//     itemClass: "Infill Type",
//     extractList: ({
//         data: {
//             allInfillPocketTypes: {
//                 nodes = [],
//             } = {},
//         } = {},
//     }) => nodes,
//     mapPillProps: ({
//         nodeId,
//         type,
//     }) => ({
//         nodeId,
//         key: nodeId,
//         title: type,
//         arguments: {
//             nodeId,
//             type,
//         },
//     }),
//     mapCreateVariables: ({ }, { input }) => ({
//         type: input,
//     }),
//     mapUpdateVariables: ({ arguments: { nodeId } }, { input }) => ({
//         nodeId,
//         type: input,
//     }),
//     extractName: ({ type }) => type,
// });

/**
 import {
     HeadedListContainer,
     Pill,
     Modal,
    withCRUD,
    withSelect,
} from '../../../../../../components';

class InfillTypes extends Component {
    
    handleCreate = ({ }, { input }) => {
        this.props.CRUD.onCreate(this.props.withSelectProps.cancel);
        console.log("CREATING", { input });
        this.props.CRUD.createItem({
            variables: {
                type: input,
            },
        });
    }
    
    handleUpdate = ({ arguments: { nodeId } }, { input }) => this.props.CRUD.updateItem({
        variables: {
            nodeId,
            type: input,
        },
    });
    
    handleDelete = () => {
        this.props.CRUD.onDelete(this.props.withSelectProps.cancel);
        this.props.CRUD.deleteItem({
            variables: {
                nodeId: this.props.withSelectProps.selectedNID,
            },
        });
    }
    
    render = () => {
        const {
            props: {
                CRUD: {
                    queryStatus: {
                        data: {
                            allInfillPocketTypes: {
                                nodes: types = [],
                            } = {},
                        } = {},
                    },
                },
                withSelectProps: {
                    selectedNID,
                    creating,
                    deleting,
                    cancel,
                    handleSelect,
                    handleCreateClick,
                    handleDeleteClick,
                },
            },
            handleChange,
            handleCreate,
            handleUpdate,
            handleDelete,
        } = this;
        
        
        const selectedType = types.find(({ nodeId }) => nodeId === selectedNID)
        ||
        types[0]
        ||
        {};
        
        console.log(this);
        
        return (
            <div>
            <HeadedListContainer
            title="Infill Pocket Types"
            list={{
                items: types,
                renderItem: ({
                    nodeId,
                    type,
                }) => (
                    <Pill
                    key={nodeId}
                    tagname="li"
                    title={type}
                    arguments={{
                        nodeId
                    }}
                    selected={nodeId === selectedType.nodeId}
                    danger={deleting && nodeId === selectedNID}
                    onSelect={handleSelect}
                    onEdit={handleUpdate}
                    onDelete={handleDeleteClick}
                    />
                    ),
                    creating,
                    createItem: (
                        <Pill
                        tagname="li"
                        editing={creating}
                        onEdit={handleCreate}
                        onBlur={cancel}
                        />
                        ),
                        addButton: {
                            onAdd: handleCreateClick
                        }
                    }}
                    />
                    <Modal
                    title="Delete Infill Pocket Type"
                    display={deleting}
                    danger={true}
                    onFinish={handleDelete}
                    onCancel={cancel}
                    >
                    Are you sure you want to delete infill pocket type {selectedType.type}?
                    </Modal>
                    </div>
                    );
                }
            }
            
            export default withCRUD({
                query,
    create,
    update,
    _delete,
})(withSelect()(InfillTypes));

*/
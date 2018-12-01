
import {
    CRUDList
} from '../../../../../../components';

import LineWeightInfo from './LineWeightInfo';

import * as CRUDOptions from './line-weights-graphql';

export default CRUDList(CRUDOptions, {
    Details: LineWeightInfo,
    mapDetailsProps: ({
        selectedItem: lineWeight,
        CRUD: {
            updateItem,
        },
    }) => ({
        lineWeight,
        updateItem,
    }),
    itemClass: "Line Weight",
    extractList: ({
        data: {
            allLineWeights: {
                nodes = [],
            } = {},
        } = {},
    }) => nodes,
    mapPillProps: ({ nodeId, name, }) => ({
        nodeId,
        key: nodeId,
        title: name,
        arguments: {
            nodeId,
        },
    }),
    mapCreateVariables: ({ }, { input }) => ({
        name: input,
        weight: 0,
    }),
    mapUpdateVariables: ({ arguments: { nodeId } }, { input }) => ({
        nodeId,
        name: input,
    }),
    extractName: ({ name }) => name,
});

/**
 
 import React, { Component } from 'react';
 
 import {
     query,
     create,
     update,
     _delete,
    } from './line-weights-graphql';
    
    import {
        HeadedListContainer,
        Pill,
        Modal,
        withSelect,
        withCRUD,
    } from '../../../../../../components';
    
    import LineWeightInfo from './LineWeightInfo';
    
    class LineWeights extends Component {
        
        handleCreate = ({ }, { input }) => {
            this.props.CRUD.onCreate((cache, {
                data: {
                    createLineWeight: {
                        lineWeight: {
                            nodeId
                        }
                    }
                }
            }) => this.props.withSelectProps.handleSelect({
                arguments: {
                    nodeId,
                }
            }));
            this.props.CRUD.createItem({
                variables: {
                    name: input,
                    weight: 0,
                },
            });
        }
        
        handleEdit = ({ arguments: { nodeId } }, { input }) => this.props.CRUD.updateItem({
            variables: {
                nodeId,
                name: input,
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
                                allLineWeights: {
                                    nodes: lineWeights = [],
                                } = {},
                            } = {},
                        },
                        updateItem,
                    },
                    withSelectProps: {
                        selectedNID,
                        creating,
                        deleting,
                        cancel,
                        handleSelect,
                        handleCreateClick,
                        handleDeleteClick,
                    }
                },
                handleEdit,
                handleCreate,
                handleDelete,
            } = this;
            
            const selectedLineWeight = lineWeights.find(({ nodeId }) => nodeId === selectedNID)
            ||
            !creating && lineWeights[0]
            ||
            {
                name: "",
                weight: 0,
            };
            
            return (
                <div
                id="LineWeights"
                >
                
                <HeadedListContainer
                id="LineWeights"
                title="Line Weights"
                list={{
                    items: lineWeights,
                    renderItem: ({
                        nodeId,
                        name,
                    }) => (
                        <Pill
                        key={nodeId}
                        tagname="li"
                        arguments={{
                            nodeId
                        }}
                        selected={nodeId === selectedLineWeight.nodeId}
                        onSelect={handleSelect}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                        title={name}
                        />
                        ),
                        creating,
                        createItem: (
                            <Pill
                            tagname="li"
                            selected={creating}
                            editing={true}
                            onEdit={handleCreate}
                            />
                            ),
                            addButton: {
                                onAdd: handleCreateClick
                            }
                        }}
                        />
                        <LineWeightInfo
                        {...{
                            updateItem,
                            lineWeight: selectedLineWeight,
                            lineWeights,
                        }}
                        />
                        <Modal
                        title="Delete LineWeight"
                        display={deleting}
                        danger={true}
                        onFinish={handleDelete}
                        onCancel={cancel}
                        >
                        Are you sure you want to delete LineWeight: {selectedLineWeight.name}?
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
})(withSelect()(LineWeights));

*/
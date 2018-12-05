import React from 'react';

import { CRUDListWrapper } from '../../../../../../components';

import LinetypeInfo from './LinetypeInfo';

import * as CRUDProps from './linetypes-graphql';

export default function Linetypes() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="Linetype"
            extractList={({
                allLinetypes: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({ name }) => ({
                title: name,
            })}
            mapCreateVariables={({ }, { input }, { data }) => ({
                name: input,
                lineWeight: data.allLineWeights.nodes[0].weight,
                pattern: "",
            })}
            extractCreatedNID={({
                createLinetype: {
                    linetype: {
                        nodeId,
                    },
                },
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                name: input,
            })}
            extractName={({ name }) => name}
        >
            {({
                selectedItem: linetype,
                data: {
                    allLineWeights: {
                        nodes: lineWeights = [],
                    } = {},
                } = {},
                CRUD: {
                    updateItem,
                },
            }) => (
                    <LinetypeInfo
                        {...{
                            linetype,
                            lineWeights,
                            updateItem,
                        }}
                    />
                )}
        </CRUDListWrapper>
    )
}

// export default CRUDList(CRUDOptions, {
//     Info: LinetypeInfo,
//     mapInfoProps: ({
//         selectedItem: linetype,
//         data: {
//             allLineWeights: {
//                 nodes: lineWeights = [],
//             } = {},
//         } = {},
//         CRUD: {
//             updateItem,
//         },
//     }) => ({
//         linetype,
//         lineWeights,
//         updateItem,
//     }),
//     itemClass: "Linetype",
//     extractList: ({
//         data: {
//             allLinetypes: {
//                 nodes = [],
//             } = {},
//         } = {},
//     }) => nodes,
//     mapPillProps: ({ nodeId, name, lineWeight, pattern, }) => ({
//         nodeId,
//         key: nodeId,
//         title: name,
//         arguments: {
//             nodeId,
//             name,
//             lineWeight,
//             pattern,
//         },
//     }),
//     mapCreateVariables: ({ }, { input }, props) => ({
//         name: input,
//         lineWeight: props.CRUD.queryStatus.data.allLineWeights.nodes[0].weight,
//         pattern: ""
//     }),
//     mapUpdateVariables: ({ arguments: { nodeId } }, { input }) => ({
//         nodeId,
//         name: input,
//     }),
//     extractName: ({ name }) => name,
// });


/**
 import React, { Component } from 'react';
    
    import {
        HeadedListContainer,
        Pill,
        Modal,
        withSelect,
    withCRUD,
} from '../../../../../../components';

import LinetypeInfo from './LinetypeInfo';

class Linetypes extends Component {
    
    handleCreate = ({ }, { input }) => {
        this.props.CRUD.onCreate((cache, {
            data: {
                createLinetype: {
                    linetype: {
                        nodeId
                    }
                }
            }
        }) => this.props.selection.handleSelect({
            arguments: {
                nodeId,
            }
        }));
        this.props.CRUD.createItem({
            variables: {
                name: input,
                lineWeight: this.props.CRUD.queryStatus.data.allLineWeights.nodes[0].weight,
                pattern: ""
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
        this.props.CRUD.onDelete(this.props.selection.cancel);
        this.props.CRUD.deleteItem({
            variables: {
                nodeId: this.props.selection.selectedNID,
                null: console.log(this.props)
            },
        });
    }
    
    render = () => {
        const {
            props: {
                CRUD: {
                    queryStatus: {
                        data: {
                            allLinetypes: {
                                nodes: linetypes = [],
                            } = {},
                            allLineWeights: {
                                nodes: lineWeights = [],
                            } = {},
                        } = {},
                    },
                    updateItem,
                },
                selection: {
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
        
        const selectedLinetype = linetypes.find(({ nodeId }) => nodeId === selectedNID)
        ||
        !creating && linetypes[0]
        ||
        {
            pattern: "",
            name: ""
        };
        
        return (
            <div
            id="Linetypes"
            >
            <HeadedListContainer
            title="Linetypes"
            list={{
                items: linetypes,
                renderItem: ({
                    nodeId,
                    id,
                    name,
                    lineWeight,
                    pattern,
                }) => (
                    <Pill
                    key={nodeId}
                    title={name}
                    tagname="li"
                    arguments={{
                        nodeId,
                        id,
                        name,
                        lineWeight,
                        pattern,
                    }}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                    selected={nodeId === selectedLinetype.nodeId}
                    danger={deleting && nodeId === selectedNID}
                    onSelect={handleSelect}
                    />
                    ),
                    creating,
                    createItem: (
                        <Pill
                        selected={true}
                        editing={true}
                        onEdit={handleCreate}
                        onBlur={cancel}
                        />
                        ),
                        addButton: {
                            onAdd: handleCreateClick,
                        }
                    }}
                    />
                    <LinetypeInfo
                    {...{
                        updateItem,
                        linetype: selectedLinetype,
                        lineWeights,
                    }}
                    />
                    <Modal
                    title="Delete Linetype"
                    display={deleting}
                    danger={true}
                    onFinish={handleDelete}
                    onCancel={cancel}
                    >
                    Are you sure you want to delete Linetype: {selectedLinetype.name}?
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
            })(withSelect()(Linetypes));
            
            */
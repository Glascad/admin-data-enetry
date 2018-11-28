import React, { Component } from 'react';

import {
    HeadedListContainer,
    Pill,
    Modal,
} from '../../../../../components';

export default class Manufacturers extends Component {

    state = {
        deleteMnfg: {},
        creating: false,
        deleting: false,
    };

    cancelModal = () => this.setState({
        deleting: false,
    });

    handleAddClick = () => this.setState({
        creating: true,
    });

    handleAddBlur = () => this.setState({
        creating: false,
    });

    handleCreate = ({ }, { input }) => {
        this.props.onCreateUpdate(this.handleAddBlur);
        this.props.createManufacturer({
            variables: {
                name: input,
            }
        });
    }

    handleEdit = ({ arguments: { nodeId } }, { input }) => this.props.updateManufacturer({
        variables: {
            nodeId,
            name: input,
        }
    });

    handleDeleteClick = ({ arguments: deleteMnfg }) => this.setState({
        deleting: true,
        deleteMnfg,
    });

    handleDelete = () => {
        this.props.onDeleteUpdate(this.cancelModal);
        this.props.deleteManufacturer({
            variables: {
                nodeId: this.state.deleteMnfg.nodeId
            }
        });
    }

    render = () => {
        const {
            state: {
                deleteMnfg,
                creating,
                deleting,
            },
            props: {
                manufacturers,
            },
            handleAddClick,
            handleAddBlur,
            handleEdit,
            handleCreate,
            handleDelete,
            handleDeleteClick,
            cancelModal,
        } = this;

        console.log(this.state);

        return (
            <div>
                <HeadedListContainer
                    id="Manufacturers"
                    title="Manufacturers"
                    list={{
                        items: creating ?
                            manufacturers.concat({ newItem: true })
                            :
                            manufacturers,
                        renderItem: ({
                            nodeId,
                            name,
                            newItem,
                        }) => !newItem ? (
                            // MANUFACTURER PILL
                            <Pill
                                key={nodeId}
                                type="tile"
                                align="left"
                                tagname="li"
                                title={name}
                                footer="Last Updated:"
                                arguments={{
                                    nodeId,
                                    name,
                                }}
                                onEdit={handleEdit}
                                onDelete={handleDeleteClick}
                            />
                        ) : (
                                    // CREATE PILL
                                    <Pill
                                        key="new"
                                        title=""
                                        type="tile"
                                        align="left"
                                        tagname="li"
                                        editing={true}
                                        arguments={{
                                            nodeId,
                                        }}
                                        onEdit={handleCreate}
                                        onBlur={handleAddBlur}
                                    />
                                ),
                        addButton: {
                            type: "large",
                            onAdd: handleAddClick,
                        }
                    }}
                />
                <Modal
                    title={`Delete Manufacturer`}
                    display={deleting}
                    danger={true}
                    onFinish={handleDelete}
                    onCancel={cancelModal}
                >
                    Are you sure you want to delete Manufacturer: {deleteMnfg.name} ?
                </Modal>
            </div>
        );
    }
}

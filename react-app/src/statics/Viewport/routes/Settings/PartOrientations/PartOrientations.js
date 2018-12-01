import React from 'react';

import {
    HeadedListContainer,
    Pill,
    Modal,
    withCRUD,
    withSelect,
} from '../../../../../components';

import {
    query,
    create,
    update,
    _delete,
} from './part-orientations-graphql';

function PartOrientations({
    CRUD: {
        queryStatus: {
            data: {
                allOrientations: {
                    nodes: orientations = [],
                } = {},
            } = {},
        },
        createStatus,
        updateStatus,
        deleteStatus,
        createItem,
        updateItem,
        deleteItem,
        onCreate,
        onUpdate,
        onDelete,
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
}) {

    console.log(arguments);

    const selectedOrientation = orientations.find(({ nodeId }) => nodeId === selectedNID)
        ||
        orientations[0]
        ||
        {};

    const handleCreate = ({ }, { input }) => {
        onCreate(cancel);
        createItem({
            variables: {
                orientation: input,
            }
        });
    }

    const handleUpdate = ({ arguments: { nodeId } }, { input }) => updateItem({
        variables: {
            nodeId,
            orientation: input
        }
    });

    const handleDelete = () => {
        onDelete(cancel);
        deleteItem({
            variables: {
                nodeId: selectedNID
            }
        });
    }

    return (
        <div>
            <HeadedListContainer
                id="PartOrientations"
                title="Part Orientations"
                list={{
                    items: orientations,
                    renderItem: ({
                        nodeId,
                        orientation,
                    }) => (
                            <Pill
                                key={nodeId}
                                tagname="li"
                                title={orientation}
                                arguments={{
                                    nodeId
                                }}
                                onEdit={handleUpdate}
                                danger={deleting && nodeId === selectedNID}
                                onDelete={handleDeleteClick}
                            />
                        ),
                    creating,
                    createItem: (
                        <Pill
                            tagname="li"
                            editing={true}
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
                title="Delete Orientation"
                display={deleting}
                onFinish={handleDelete}
                danger={true}
            >
                Are you sure you want to delete orientation {selectedOrientation.orientation}?
            </Modal>
        </div>
    );
}

export default withCRUD({
    query,
    create,
    update,
    _delete,
})(withSelect()(PartOrientations));

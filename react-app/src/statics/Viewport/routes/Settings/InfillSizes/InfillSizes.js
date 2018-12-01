import React, { Component } from 'react';

import {
    query,
    create,
    update,
    _delete,
} from './infill-sizes-graphql';

import {
    HeadedListContainer,
    Pill,
    Modal,
    withCRUD,
    withSelect,
} from '../../../../../components';

class InfillSizes extends Component {

    state = {
        start: 0,
        end: 0,
        increment: 0,
    }

    handleChange = key => ({ target: { value } }) => this.setState({
        [key]: +value,
    });

    generate = () => {
        let {
            state: {
                start,
                start: input,
                end,
                increment,
            },
            PROTECTION = 30
        } = this;
        if (
            start > end
            ||
            start < 0
            ||
            end <= 0
            ||
            increment <= 0
        ) {
            return;
        }
        else {
            while (PROTECTION && input <= end + 0.00000005) {
                console.log({
                    start,
                    input,
                    end,
                    increment,
                })
                this.handleCreate({}, { input });
                input += increment;
                PROTECTION--;
            }
        }
    }

    handleCreate = ({ }, { input }) => {
        this.props.CRUD.onCreate(this.props.withSelectProps.cancel);
        this.props.CRUD.createItem({
            variables: {
                size: input,
            },
        });
    }

    handleUpdate = ({ arguments: { nodeId } }, { input }) => this.props.CRUD.updateItem({
        variables: {
            nodeId,
            size: input,
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
            state: {
                start,
                end,
                increment,
            },
            props: {
                CRUD: {
                    queryStatus: {
                        data: {
                            allInfillSizes: {
                                nodes: infillSizes = [],
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
                }
            },
            handleChange,
            generate,
            handleCreate,
            handleUpdate,
            handleDelete,
        } = this;

        const selectedInfillSize = infillSizes.find(({ nodeId }) => nodeId === selectedNID)
            ||
            infillSizes[0]
            ||
            {};

        console.log(infillSizes);

        return (
            <div>
                <HeadedListContainer
                    id="InfillSizes"
                    title="Infill Sizes"
                    beforeList={(
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <div>
                                <h6>Starting At</h6>
                                <input
                                    type="number"
                                    value={start}
                                    onChange={handleChange('start')}
                                />
                            </div>
                            <div>
                                <h6>Ending At</h6>
                                <input
                                    type="number"
                                    value={end}
                                    onChange={handleChange('end')}
                                />
                            </div>
                            <div>
                                <h6>In Increments Of</h6>
                                <input
                                    type="number"
                                    value={increment}
                                    onChange={handleChange('increment')}
                                />
                            </div>
                            <button
                                onClick={generate}
                                className="empty"
                            >
                                Generate
                            </button>
                        </div>
                    )}
                    list={{
                        items: infillSizes,
                        sort: ({ size: a }, { size: b }) => (+a - +b),
                        renderItem: ({
                            nodeId,
                            size
                        }) => (
                                <Pill
                                    key={nodeId}
                                    tagname="li"
                                    arguments={{
                                        nodeId
                                    }}
                                    title={`${size}"`}
                                    inputValue={size}
                                    inputType="number"
                                    onEdit={handleUpdate}
                                    onDelete={handleDeleteClick}
                                />
                            ),
                        creating,
                        createItem: (
                            <Pill
                                tagname="li"
                                inputType="number"
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
                    title="Delete Infill Size"
                    danger={true}
                    display={deleting}
                    onFinish={handleDelete}
                    onCancel={cancel}
                >
                    Are you sure you want to delete infill size {selectedInfillSize.size}"?
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
})(withSelect()(InfillSizes));

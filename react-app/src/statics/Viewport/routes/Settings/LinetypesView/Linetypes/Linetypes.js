import React, { Component } from 'react';
import './Linetypes.scss';

import {
    HeadedListContainer,
    Pill,
} from '../../../../../../components';

import LinetypeInfo from './LinetypeInfo';

export default class LineTypes extends Component {

    state = {
        selectedNID: "",
        creating: false,
        deleting: false,
    };

    cancelModal = () => this.setState({
        deleting: false,
    });

    handleSelect = ({ arguments: { nodeId } }) => this.setState({
        selectedNID: nodeId,
    });

    handleAddClick = () => this.setState({
        selectedNID: "",
        creating: true,
    });

    handleAddBlur = () => this.setState({
        creating: false,
    });

    handleCreate = ({ }, { input }) => {
        this.props.onCreateUpdate((cache, {
            data: {
                createLinetype: {
                    linetype: nodeId
                }
            }
        }) => this.setState({
            selectedNID: nodeId
        }));
        this.props.createLinetype({
            variables: {
                name: input,
                lineWeight: this.props.lineWeights[0].weight,
                pattern: ""
            },
        });
    }

    handleEdit = ({ arguments: { nodeId } }, { input }) => this.props.updateLinetype({
        variables: {
            nodeId,
            name: input,
        },
    });

    handleDeleteClick = ({ arguments: { nodeId } }) => this.setState({
        deleting: true,
        selectedNID: nodeId,
    });

    handleDelete = () => {
        this.props.onDeleteUpdate(this.cancelModal);
        this.props.deleteLinetype({
            variables: {
                nodeId: this.state.selectedNID,
            },
        });
    }

    render = () => {
        const {
            state: {
                selectedNID,
                creating,
            },
            props: {
                linetypes,
                lineWeights,
                updateLinetype,
            },
            handleSelect,
            handleEdit,
            handleCreate,
            handleAddClick,
            handleAddBlur,
        } = this;

        const selectedLinetype = linetypes.find(({ nodeId }) => nodeId === selectedNID)
            ||
            !creating && linetypes[0]
            ||
            {
                pattern: ""
            };

        console.log(this.state);

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
                                <li
                                    key={nodeId}
                                    className="linetype"
                                >
                                    <Pill
                                        title={name}
                                        arguments={{
                                            nodeId,
                                            id,
                                            name,
                                            lineWeight,
                                            pattern,
                                        }}
                                        onEdit={handleEdit}
                                        selected={nodeId === selectedLinetype.nodeId}
                                        onSelect={handleSelect}
                                    />
                                    <svg
                                        height={lineWeight}
                                        width="240"
                                    >
                                        <line
                                            x1="0"
                                            y1="0"
                                            x2="240"
                                            y2="0"
                                            stroke="black"
                                            strokeWidth={lineWeight}
                                            strokeDasharray={pattern}
                                        />
                                    </svg>
                                </li>
                            ),
                        creating,
                        createItem: (
                            <Pill
                                selected={true}
                                editing={true}
                                onEdit={handleCreate}
                                onBlur={handleAddBlur}
                            />
                        ),
                        addButton: {
                            onAdd: handleAddClick,
                        }
                    }}
                />
                <LinetypeInfo
                    {...{
                        updateLinetype,
                        linetype: selectedLinetype,
                        lineWeights,
                    }}
                />
            </div>
        );
    }
}

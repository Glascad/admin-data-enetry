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
        creating: true,
    });

    handleAddBlur = () => this.setState({
        creating: false,
    });

    handleCreate = ({ }, { input }) => {
        this.props.onCreateUpdate(this.handleAddBlur);
        this.props.createLinetype({
            variables: {
                name: input,
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
            },
            props: {
                linetypes,
                lineWeights,
                updateLinetype,
            },
            handleSelect,
            handleEdit
        } = this;

        const selectedLinetype = linetypes.find(({ nodeId }) => nodeId === selectedNID) || {};

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
                                        selected={nodeId === selectedNID}
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
                        addButton: {
                            onAdd: console.log
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

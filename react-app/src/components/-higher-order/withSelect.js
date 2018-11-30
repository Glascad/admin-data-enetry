import React, { Component } from 'react';

export default (
    mapProps = (
        withSelectProps => ({ withSelectProps })
    )
) => (
    WrappedComponent
) => (
            class WithSelect extends Component {

                static initialState = {
                    selectedNID: "",
                    creating: false,
                    deleting: false,
                };

                state = WithSelect.initialState

                cancel = () => this.setState(() => WithSelect.initialState);

                handleSelect = ({ arguments: { nodeId } }) => this.setState({
                    selectedNID: nodeId,
                    creating: false,
                    deleting: false,
                });

                handleCreateClick = () => this.setState(() => ({
                    selectedNID: "",
                    creating: true,
                    deleting: false,
                }));

                handleDeleteClick = ({ arguments: { nodeId } }) => this.setState(() => ({
                    selectedNID: nodeId,
                    creating: false,
                    deleting: true,
                }));

                render = () => {
                    const {
                        state: {
                            selectedNID,
                            creating,
                            deleting,
                        },
                        props,
                        handleSelect,
                        handleCreateClick,
                        handleDeleteClick,
                        cancel,
                    } = this;
                    return (
                        <WrappedComponent
                            {...props}
                            {...mapProps({
                                selectedNID,
                                creating,
                                deleting,
                                cancel,
                                handleSelect,
                                handleCreateClick,
                                handleDeleteClick,
                            })}
                        />
                    )
                }
            }
        );

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class SelectionWrapper extends Component {

    static propTypes = {
        children: PropTypes.func.isRequired,
    };

    static initialState = {
        selectedNID: "",
        creating: false,
        deleting: false,
    };

    state = SelectionWrapper.initialState

    cancel = () => this.setState(() => SelectionWrapper.initialState);

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
            props: {
                children: Children,
            },
            handleSelect,
            handleCreateClick,
            handleDeleteClick,
            cancel,
        } = this;

        return children({
            ...props,
            selectedNID,
            creating,
            deleting,
            cancel,
            handleSelect,
            handleCreateClick,
            handleDeleteClick,
        });
    }
}

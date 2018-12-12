import React, { Component } from 'react';

import { Modal } from '../../components';

export default class extends Component {

    state = {
        displayModal: false
    };

    toggleModal = () => this.setState({
        displayModal: !this.state.displayModal
    });

    render = () => {
        
        const {
            state: {
                displayModal,
            },
            toggleModal,
        } = this;

        return (
            <div>
                <button
                    onClick={toggleModal}
                >
                    MODAL
                </button>
                <Modal
                    title="Modal"
                    display={displayModal}
                    onCancel={toggleModal}
                    onFinish={console.log}
                >
                    INSIDE MODAL
                </Modal>
            </div>
        );
    }
}

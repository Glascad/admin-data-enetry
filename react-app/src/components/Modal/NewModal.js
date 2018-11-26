import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';
import HeadedContainer from '../HeadedContainer/HeadedContainer';

export default class Modal extends Component {

    static propTypes = {
        title: PropTypes.any.isRequired,
        display: PropTypes.bool.isRequired,
        children: PropTypes.any.isRequired,
        buttons: PropTypes.exact({
            left: PropTypes.array,
            right: PropTypes.array
        }),
        onCancel: PropTypes.func.isRequired,
    };

    componentDidMount = () => window.addEventListener('keydown', this.cancelOnEsc);

    componentWillUnmount = () => window.removeEventListener('keydown', this.cancelOnEsc);

    componentDidUpdate = ({ display }) => display !== this.props.display
        &&
        this.props.onUpdate
        &&
        this.props.onUpdate(this.props);

    cancelOnEsc = ({ key }) => key === 'Escape' && this.props.onCancel();

    stopPropagation = e => e.stopPropagation();

    render = () => {
        const {
            props: {
                title,
                children,
                display,
                buttons: {
                    left,
                    right
                } = {},
                onCancel,
            },
            stopPropagation,
        } = this;
        return (
            <div
                className={`modal-background ${
                    display ? '' : 'hidden'
                    }`}
                onClick={onCancel}
            >
                <div
                    className="Modal"
                    onClick={stopPropagation}
                >
                    <HeadedContainer
                        title={title}
                    >
                        {children}
                    </HeadedContainer>
                    <div className="modal-buttons">
                        <div className="left-buttons">
                            {left}
                        </div>
                        <div className="right-buttons">
                            {right}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

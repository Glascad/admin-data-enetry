import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';
import HeadedContainer from '../HeadedContainer/HeadedContainer';

export default class Modal extends Component {

    static propTypes = {
        
    };

    componentDidMount = () => window.addEventListener('keydown', this.cancelOnEsc);

    componentWillUnmount = () => window.removeEventListener('keydown', this.cancelOnEsc);

    componentDidUpdate = ({ display }) => display !== this.props.display
        &&
        this.props.onUpdate
        &&
        this.props.onUpdate(this.props);

    cancelOnEsc = ({ key }) => key === 'Escape' && this.cancel();

    stopPropagation = e => e.stopPropagation();

    reset = () => this.props.onReset(this.props);

    cancel = () => this.props.onCancel(this.props);

    finish = () => this.props.onFinish(this.props);

    render = () => {
        const {
            props: {
                title,
                children,
                display,
                danger,
                resetButtonText = 'Reset',
                finishButtonText = 'Finish',
                cancelButtonText = 'Cancel',
                resetButtonClassName = 'empty light',
                cancelButtonClassName = 'empty light',
                finishButtonClassName = 'primary',
            },
            reset,
            cancel,
            finish,
            stopPropagation,
        } = this;
        return (
            <div
                className={`modal-background ${
                    display ? '' : 'hidden'
                    } ${
                    danger ? 'danger' : ''
                    }`}
                onClick={cancel}
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
                        <button
                            className={`reset ${resetButtonClassName}`}
                            onClick={reset}
                        >
                            {resetButtonText}
                        </button>
                        <span>
                            <button
                                className={`cancel ${cancelButtonClassName}`}
                                onClick={cancel}
                            >
                                {cancelButtonText}
                            </button>
                            <button
                                className={`finish ${
                                    danger ? 'danger' : ''
                                    } ${
                                    finishButtonClassName
                                    }`}
                                onClick={finish}
                            >
                                {finishButtonText}
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

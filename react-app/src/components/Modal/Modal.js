import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';
import HeadedContainer from '../HeadedContainer/HeadedContainer';

export default class Modal extends Component {

    static propTypes = {
        title: PropTypes.any.isRequired,
        display: PropTypes.bool.isRequired,
        children: PropTypes.any.isRequired,
        danger: PropTypes.bool,
        onCancel: PropTypes.func.isRequired,
        cancel: PropTypes.object,
        onReset: PropTypes.func,
        reset: PropTypes.object,
        finish: PropTypes.object,
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

    handleResetClick = e => {
        if (this.props.onReset)
            this.props.onReset(this.props);
    }

    handleCancelClick = e => {
        if (this.props.onCancel)
            this.props.onCancel(this.props)
    }

    handleFinishClick = e => {
        if (this.props.onFinish)
            this.props.onFinish(this.props);
    }

    render = () => {
        const {
            props: {
                className,
                title,
                children,
                display,
                onReset,
                reset,
                onCancel,
                cancel,
                onFinish,
                finish = {},
                finishButtonText,
                danger,
            },
            stopPropagation,
            handleResetClick,
            handleCancelClick,
            handleFinishClick,
        } = this;
        return (
            <div
                className={`modal-background ${display ? '' : 'hidden'}`}
                onClick={onCancel}
            >
                <div
                    className={`Modal ${className}`}
                    onClick={stopPropagation}
                >
                    <HeadedContainer
                        title={title}
                    >
                        {children}
                    </HeadedContainer>
                    <div className="modal-buttons">
                        <span>
                            {onReset ? (
                                <button
                                    children="reset"
                                    {...reset}
                                    onClick={handleResetClick}
                                />
                            ) : null}
                        </span>
                        <span>
                            {onCancel ? (
                                <button
                                    children="Cancel"
                                    className="empty"
                                    {...cancel}
                                    onClick={handleCancelClick}
                                />
                            ) : null}
                            {onFinish ? (
                                <button
                                    children="Finish"
                                    className={danger ? "danger" : "primary"}
                                    {...finish}
                                    children={finishButtonText || finish.children || "Finish"}
                                    onClick={handleFinishClick}
                                />
                            ) : null}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

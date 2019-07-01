import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import './Modal.scss';

import TitleBar from '../TitleBar/TitleBar';

import AsyncButton from '../AsyncButton/AsyncButton';

export default class Modal extends PureComponent {

    // static propTypes = {
    //     title: PropTypes.any.isRequired,
    //     display: PropTypes.bool.isRequired,
    //     children: PropTypes.any.isRequired,
    //     danger: PropTypes.bool,
    //     onCancel: PropTypes.func.isRequired,
    //     cancel: PropTypes.object,
    //     onReset: PropTypes.func,
    //     reset: PropTypes.object,
    //     finish: PropTypes.object,
    // };

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
        this.handleCancelClick();
    }

    render = () => {
        const {
            props: {
                className,
                titleBar,
                children,
                display,
                onReset,
                reset,
                onCancel,
                cancel = {},
                cancelButtonText,
                onFinish,
                finish = {},
                finishing = false,
                finishButtonText,
                finishingText,
                danger,
            },
            stopPropagation,
            handleResetClick,
            handleCancelClick,
            handleFinishClick,
        } = this;

        return display ? (
            <div
                className={`modal-background ${display ? '' : 'hidden'}`}
                onClick={onCancel}
            >
                <div
                    className={`Modal ${className}`}
                    onClick={stopPropagation}
                >
                    <TitleBar
                        {...titleBar}
                    />
                    <div className="content">
                        {children}
                    </div>
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
                                    className="empty"
                                    {...cancel}
                                    children={cancelButtonText || cancel.children || "Cancel"}
                                    onClick={handleCancelClick}
                                />
                            ) : null}
                            {onFinish ? (
                                <AsyncButton
                                    className={danger ? "danger" : "action"}
                                    {...finish}
                                    children={finishButtonText || finish.children || finish.text || "Finish"}
                                    loading={finishing}
                                    loadingText={finishingText || finishButtonText || finish.children || finish.text || "Finishing"}
                                    onClick={handleFinishClick}
                                />
                            ) : null}
                        </span>
                    </div>
                </div>
            </div>
        ) : null;
    }
}

import React, { PureComponent, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import './Modal.scss';

import TitleBar from '../TitleBar/TitleBar';

import AsyncButton from '../AsyncButton/AsyncButton';

const Modal = memo(function ({
    className,
    titleBar,
    children,
    display,
    onReset,
    onUpdate,
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
}) {

    const props = arguments[0];

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

    const cancelOnEsc = ({ key }) => key === 'Escape' && onCancel(props);

    const stopPropagation = e => e.stopPropagation();

    const handleResetClick = () => onReset && onReset(props);

    const handleCancelClick = () => onCancel && onCancel(props)

    const handleFinishClick = () => onFinish && onFinish(props);

    useEffect(() => {
        window.addEventListener('keydown', cancelOnEsc);
        return () => window.removeEventListener('keydown', cancelOnEsc);
    }, [])

    useEffect(() => {
        if (onUpdate) onUpdate(props);
    }, [display]);

    if (!display) return null;

    console.log(arguments[0]);

    return (
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
    );
});


/**
 * This avoids the issue of having Modals nested arbitrarily within the component tree.
 * Now a Modal can be used anywhere within the tree, but it will actually be rendered next to the root element in the document.body
 */

const getModalId = (() => {
    var id = 1;
    return () => id++;
})();

export default class AbstractModal extends PureComponent {
    constructor(props) {
        super(props);
        this.element = document.createElement("div");
        this.element.setAttribute("id", `Modal-${getModalId()}`);
        document.body.appendChild(this.element);
    }
    componentWillUnmount = () => {
        document.body.removeChild(this.element);
    }
    render = () => {
        ReactDOM.render(<Modal {...this.props} />, this.element);
        return null;
    }
}

import React, { useEffect, memo } from 'react';
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

    const cancelOnEsc = ({ key }) => key === 'Escape' && onCancel();

    const stopPropagation = e => e.stopPropagation();

    const handleResetClick = e => {
        if (onReset) onReset(props);
    }

    const handleCancelClick = e => {
        if (onCancel) onCancel(props)
    }

    const handleFinishClick = e => {
        if (onFinish) onFinish(props);
        handleCancelClick();
    }

    useEffect(() => {
        window.addEventListener('keydown', cancelOnEsc);
        return () => window.removeEventListener('keydown', cancelOnEsc);
    }, [])

    useEffect(() => {
        if (onUpdate) onUpdate(props);
    }, [display]);

    if (!display) return null;

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

export default function RenderModal(props) {
    useEffect(() => {
        const div = document.createElement("div");
        document.body.appendChild(div);
        
        setTimeout(() => {
            console.log("rendering modal");
            ReactDOM.render(<Modal {...props} />, div);
        });

        return () => {
            document.body.removeChild(div);
        }
    }, [props]);

    return null;
}

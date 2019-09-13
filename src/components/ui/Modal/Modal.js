import React, { useRef, useEffect, useLayoutEffect, memo } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';

import TitleBar from '../TitleBar/TitleBar';

import AsyncButton from '../AsyncButton/AsyncButton';
import customPropTypes from '../../custom-prop-types';

Modal.propTypes = {
    className: PropTypes.string,
    titleBar: PropTypes.shape(TitleBar.propTypes),
    children: customPropTypes.renderable,
    display: PropTypes.bool,
    finishing: PropTypes.bool,
    danger: PropTypes.bool,
    reset: PropTypes.shape({
        children: customPropTypes.renderable,
        text: PropTypes.string,
    }),
    cancel: PropTypes.shape({
        children: customPropTypes.renderable,
        text: PropTypes.string,
    }),
    finish: PropTypes.shape(AsyncButton.propTypes),
    cancelButtonText: PropTypes.string,
    finishButtonText: PropTypes.string,
    finishingText: PropTypes.string,
    onReset: PropTypes.func,
    onUpdate: PropTypes.func,
    onCancel: PropTypes.func,
    onFinish: PropTypes.func,
};

function Modal({
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
            data-cy='modal'
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
                                data-cy="modal-cancel-button"
                                {...cancel}
                                children={cancelButtonText || cancel.children || cancel.text || "Cancel"}
                                onClick={handleCancelClick}
                            />
                        ) : null}
                        {onFinish ? (
                            <AsyncButton
                                className={danger ? "danger" : "action"}
                                data-cy="modal-finish-button"
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
}


/**
 * This avoids the issue of having Modals nested arbitrarily within the component tree.
 * Now a Modal can be used anywhere within the tree, but it will actually be rendered next to the root element in the document.body
 */

const getModalId = (() => {
    var id = 1;
    return () => id++;
})();

export default memo(function AbstractModal(props) {
    const element = useRef();

    useLayoutEffect(() => {
        element.current = document.createElement("div");
        element.current.setAttribute("id", `Modal-${getModalId()}`);
        document.body.appendChild(element.current);
        return () => {
            document.body.removeChild(element.current);
        }
    }, []);

    useLayoutEffect(() => {
        ReactDOM.render(<Modal {...props} />, element.current)
    });

    return null;
});

export function confirmWithModal(onFinish, {
    className,
    titleBar,
    children,
    display,
    onReset,
    onUpdate,
    reset,
    onCancel,
    cancel,
    cancelButtonText,
    finish,
    finishing,
    finishButtonText,
    finishingText,
    danger,
}) {
    if (typeof onFinish !== 'function') throw new Error(`\`onFinish()\` must be a function, received type: ${typeof onFinish}`);
    const element = document.createElement("div");
    element.setAttribute("id", `Modal-${getModalId()}`);
    document.body.appendChild(element);
    const removeModal = () => document.body.removeChild(element);
    const modal = (
        <Modal
            {...arguments[1]}
            display={true}
            onFinish={props => {
                onFinish(props);
                removeModal();
            }}
            onCancel={() => {
                if (onCancel) onCancel(arguments[1]);
                removeModal();
            }}
        />
    );
    ReactDOM.render(modal, element);
}

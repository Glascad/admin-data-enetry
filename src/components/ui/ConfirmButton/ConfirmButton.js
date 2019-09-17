import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import customPropTypes from '../../utils/custom-prop-types';

ConfirmButton.propTypes = {
    onClick: PropTypes.func,
    children: customPropTypes.renderable,
    modalProps: PropTypes.shape(Modal.propTypes),
    doNotConfirmWhen: PropTypes.bool,
}

export default function ConfirmButton({
    onClick,
    children,
    modalProps,
    doNotConfirmWhen: doNotDisplayModal,
    ...props
}) {

    const [display, toggleModal] = useState(false);

    return (
        <>
            <button
                {...props}
                onClick={doNotDisplayModal ?
                    onClick
                    :
                    () => toggleModal(display => !display)}
            >
                {children}
            </button>
            <Modal
                {...modalProps}
                display={!doNotDisplayModal && display}
                onCancel={() => toggleModal(false)}
                onFinish={onClick}
            />
        </>
    );
}

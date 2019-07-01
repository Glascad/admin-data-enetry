import React, { useState } from 'react';
import Modal from '../Modal/Modal';

export default function ConfirmButton({
    onClick,
    children,
    modalProps,
    doNotConfirmWhen: doNotDisplayModal,
    ...props
}) {

    console.log(arguments[0]);

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

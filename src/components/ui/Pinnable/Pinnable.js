import React, { useState } from 'react';

import './Pinnable.scss';

export default function Pinnable({
    pinned = true,
    children,
    onClose,
}) {
    const [{ top, left }, setPosition] = useState({});

    return (
        <div
            className={`Pinnable ${
                pinned ? 'pinned' : ''
                }`}
            style={{
                top,
                left,
            }}
            draggable={true}
            onDrag={e => {
                e.preventDefault();
                const {
                    clientX,
                    clientY,
                    movementX,
                    movementY,
                } = e;
                console.log({
                    clientX,
                    clientY,
                    movementX,
                    movementY,
                    e,
                });
                if (clientX !== 0 || clientY !== 0) {
                    setPosition({
                        top: clientY,
                        left: clientX,
                    });
                }
            }}
        >
            <div
                className="close"
                onClick={onClose}
            />
            {children}
        </div>
    );
}

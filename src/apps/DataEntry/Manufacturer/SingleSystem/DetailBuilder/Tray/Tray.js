import React, { useState } from 'react';

import './Tray.scss';

export default function Tray({

}) {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(open => !open);
    return (
        <div
            className={`Tray card ${
                open ? '' : 'closed'
                }`}
        >
            <div>
                <span>
                    Tray
                </span>
            </div>
            <div
                className="handle"
                onClick={toggleOpen}
            >
                <div className="block-one" />
                <div className="block-two" />
            </div>
        </div>
    );
}

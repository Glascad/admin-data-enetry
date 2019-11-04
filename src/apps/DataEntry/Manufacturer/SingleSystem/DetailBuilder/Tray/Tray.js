import React, { useState } from 'react';

import './Tray.scss';

export default function Tray({

}) {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(open => !open);
    return (
        <div
            className={`Tray ${
                open ? '' : 'closed'
                }`}
        >
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

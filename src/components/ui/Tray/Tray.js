import React, { useState,useEffect } from 'react';
import useInitialState from '../../hooks/use-initial-state';

import './Tray.scss';

export default function Tray({
    children,
    open: propsOpen = true,
}) {
    const [open, setOpen] = useInitialState(propsOpen);
    const toggleOpen = () => setOpen(open => !open);
    useEffect(() => {
        const openOnCtrlTilde = ({ key, ctrlKey, metaKey }) => key === '`' && (ctrlKey || metaKey) && toggleOpen();
        window.addEventListener('keydown', openOnCtrlTilde);
        return () => window.removeEventListener('keydown', openOnCtrlTilde);
    }, []);
    return (
        <div
            className={`Tray card ${
                open ? '' : 'closed'
                }`}
        >
            {children}
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

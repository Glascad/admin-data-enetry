import React from 'react';

import './CheatSheet.scss';

const renderCheats = () => {
    const wcs = "with-cheat-sheet";
    const body = document.querySelector("body");
    const { className } = body;
    if (className.includes(wcs)) {
        // REMOVE CHEATS
        body.className = className.replace(wcs, "");
        window.removeEventListener('keydown', cancelCheatsOnEscape);
    } else {
        // ADD CHEATS
        body.className = `${className} ${wcs}`
        window.addEventListener('keydown', cancelCheatsOnEscape)
    }
}

const cancelCheatsOnEscape = ({ key }) => key === "Escape" && renderCheats();

export default function CheatSheet({
    children,
}) {
    return (
        <>
            {children}
            <button
                className="cheat-sheet-button"
                onClick={renderCheats}
            >
                CHEAT
            </button>
        </>
    );
}

import React from 'react';

import './Toggle.scss';

export default function Toggle({
    buttons,
}) {
    return (
        <div className="Toggle">
            {buttons.map(({
                text,
                selected,
                className = "",
                ...button
            }) => (
                    <button
                        className={`toggle-button ${
                            selected ? "selected" : ""
                            } ${
                            className
                            }`}
                        {...button}
                    >
                        {text}
                    </button>
                ))}
        </div>
    );
}

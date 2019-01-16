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
                        key={text}
                        className={`toggle-button ${
                            selected ? "selected" : "empty"
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

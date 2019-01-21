import React, { isValidElement } from 'react';

import './Toggle.scss';

export default function Toggle({
    buttons,
}) {
    return (
        <div className="Toggle">
            {buttons.map((button, i) => {
                const {
                    text,
                    selected,
                    className = "",
                    ...buttonProps
                } = button;
                return (
                    <button
                        key={text || i}
                        className={`toggle-button ${
                            selected ? "selected" : "empty"
                            } ${
                            className
                            }`}
                        {...buttonProps}
                    >
                        {text}
                    </button>
                )
            })}
        </div>
    );
}

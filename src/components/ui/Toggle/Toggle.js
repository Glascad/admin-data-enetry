import React from 'react';

import './Toggle.scss';

Toggle.defaultProps = {
    className: "",
};

export default function Toggle({
    buttons,
    label,
    title,
    className,
}) {
    return (
        <>
            {title ? (
                <div className="title">
                    {title}
                </div>
            ) : label ? (
                <div className="label">
                    {label}
                </div>
            ) : null}
            <div
                className={`Toggle ${className}`}
            >
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
        </>
    );
}

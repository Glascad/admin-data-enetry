import React from 'react';

import './TitleBar.scss';

export default function TitleBar({
    className = "",
    title = "",
    right,
    selections = [],
}) {
    return (
        <header
            className={`TitleBar ${className}`}
        >
            <div className="title">
                <span>
                    {title}
                </span>
                {selections.map((item, i) => (
                    <span>
                        <span>
                            {i === 0 ? ' - ' : ' > '}
                        </span>
                        <span>
                            {item}
                        </span>
                    </span>
                ))}
            </div>
            <div className="title-bar-right">
                {right}
            </div>
        </header>
    );
}

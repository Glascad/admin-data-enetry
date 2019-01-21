import React from 'react';

import './TitleBar.scss';

export default function TitleBar({
    className = "",
    title = "",
    left,
    right,
    selections = [],
}) {
    return (
        <header
            className={`TitleBar ${className}`}
        >
            <div className="title-bar-left">
                <span className="title">
                    {title}
                </span>
                {selections.map((item, i) => (
                    <span>
                        {i === 0 ?
                            <span>&nbsp;-&nbsp;</span>
                            :
                            <span>&nbsp;>&nbsp;</span>
                        }
                        <span className="title-bar-item">
                            {item}
                        </span>
                    </span>
                ))}
                <span className="left">
                    {left}
                </span>
            </div>
            <div className="title-bar-right">
                {right}
            </div>
        </header>
    );
}

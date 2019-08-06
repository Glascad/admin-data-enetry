import React from 'react';

import './TitleBar.scss';
import { normalCase } from '../../../utils';

TitleBar.defaultProps = {
    className: "",
    title: "",
    selections: [],
};

export default function TitleBar({
    className,
    title,
    left,
    right,
    selections,
    onClick,
}) {
    return (
        <header
            className={`TitleBar ${className}`}
        >
            <div
                className="title-bar-left"
                onClick={onClick}
            >
                <span className="title">
                    {normalCase(title)}
                </span>
                {selections.map((item, i) => item ? (
                    <span
                        key={i}
                    >
                        {i === 0 ?
                            <span>&nbsp;-&nbsp;</span>
                            :
                            <span>&nbsp;>&nbsp;</span>
                        }
                        <span className="title-bar-item">
                            {normalCase(item)}
                        </span>
                    </span>
                ) : null)}
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

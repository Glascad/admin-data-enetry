import React from 'react';
import PropTypes from 'prop-types';
import './HeadedContainer.scss';

HeadedContainer.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    right: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    nestLevel: PropTypes.number,
};

export default function HeadedContainer({
    id,
    className,
    style,
    title,
    right,
    children,
    nestLevel = 0,
}) {
    return (
        <div
            id={id}
            // Number.prototype[Symbol.iterator] is in `public/index.html`
            className={`HeadedContainer ${className} ${[...nestLevel].map(() => "nested").join("-") || ""}`}
            style={style}
        >
            <header>
                <span className="title">{title}</span>
                {right ? (
                    <span className="">{right}</span>
                ) : null}
            </header>
            <div className="content">
                {children}
            </div>
        </div>
    );
}

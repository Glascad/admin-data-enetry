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
};

export default function HeadedContainer({
    id,
    className,
    style,
    title,
    right,
    children,
}) {
    return (
        <div
            id={id}
            className={`HeadedContainer ${className}`}
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

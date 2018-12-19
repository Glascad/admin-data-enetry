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
    label,
    right,
    children,
    ref,
}) {
    return (
        <div
            id={id}
            ref={ref}
            // Number.prototype[Symbol.iterator] is in `public/index.html`
            className={`HeadedContainer ${
                className
                // } ${
                // [...nestLevel]
                //     .map(() => "nested")
                //     .join("-")
                // ||
                // ""
                }`}
            style={style}
        >
            {title ? (
                <header>
                    <span className="title">{title}</span>
                    {right ? (
                        <span className="">{right}</span>
                    ) : null}
                </header>
            ) : label ? (
                <div className="label">{label}</div>
            ) : null}
            <div className="content">
                {children}
            </div>
        </div>
    );
}

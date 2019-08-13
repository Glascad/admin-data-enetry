import React from 'react';
import PropTypes from 'prop-types';
import './Toggle.scss';
import customPropTypes from '../../custom-prop-types';
import { normalCase } from '../../../utils';

Toggle.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        selected: PropTypes.bool,
        className: PropTypes.string,
    })),
    label: PropTypes.string,
    title: customPropTypes.renderable,
    className: PropTypes.string,
};

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
                    {normalCase(title)}
                </div>
            ) : label ? (
                <div className="label">
                    {normalCase(label)}
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
                            {normalCase(text)}
                        </button>
                    )
                })}
            </div>
        </>
    );
}

import React from 'react';
import PropTypes from 'prop-types';
import './GroupingBox.scss';
import Toggle from '../Toggle/Toggle';
import CircleButton from '../CircleButton/CircleButton';
import customPropTypes from '../../custom-prop-types';

GroupingBox.propTypes = {
    title: PropTypes.string,
    toggle: PropTypes.shape(Toggle.propTypes),
    circleButton: PropTypes.shape(CircleButton.propTypes),
    children: customPropTypes.renderable,
    className: PropTypes.string,
};

GroupingBox.defaultProps = {
    className: "",
};

export default function GroupingBox({
    title,
    toggle,
    circleButton,
    children,
    className,
}) {
    return (
        <div
            className={`GroupingBox ${className}`}
        >
            <div className="title">
                {title}
            </div>
            {toggle ? (
                <div className="toggle-background">
                    <Toggle
                        {...toggle}
                    />
                </div>
            ) : circleButton ? (
                <div className="add-button-background">
                    <CircleButton
                        {...circleButton}
                    />
                </div>
            ) : null}
            {children}
        </div>
    );
}

import React from 'react';
import PropTypes from 'prop-types';
import './GroupingBox.scss';
import Toggle from '../Toggle/Toggle';
import CircleButton from '../CircleButton/CircleButton';
import customPropTypes from '../../utils/custom-prop-types';
import { normalCase } from '../../../utils';
import { Input } from '../..';

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
    switch: switchProps,
    toggle,
    circleButton,
    children,
    className,
    "data-cy": dataCy,
}) {
    return (
        <div
            className={`GroupingBox ${className}`}
            data-cy={dataCy}
        >
            <div className="title">
                {normalCase(title)}
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
            ) : switchProps ? (
                <div className="add-button-background">
                    <Input
                        type="switch"
                        {...switchProps}
                    />
                </div>
            ) : null}
            {children}
        </div>
    );
}

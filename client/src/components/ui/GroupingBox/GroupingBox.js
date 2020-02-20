import PropTypes from 'prop-types';
import React from 'react';
import { Input } from '../..';
import { normalCase } from '../../../utils';
import customPropTypes from '../../utils/custom-prop-types';
import CircleButton from '../CircleButton/CircleButton';
import Toggle from '../Toggle/Toggle';
import './GroupingBox.scss';

GroupingBox.propTypes = {
    title: PropTypes.string,
    toggle: PropTypes.shape(Toggle.propTypes),
    circleButton: PropTypes.shape(CircleButton.propTypes),
    children: customPropTypes.renderable,
    className: PropTypes.string,
};

export default function GroupingBox({
    title,
    switch: switchProps,
    toggle,
    circleButton,
    children,
    className = "",
    "data-cy": dataCy,
}) {
    return (
        <div
            className={`GroupingBox ${className}`}
            data-cy={dataCy}
        >
            <div className="title grouping-box-title">
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

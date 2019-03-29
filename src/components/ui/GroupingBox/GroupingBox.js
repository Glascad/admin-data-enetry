import React from 'react';

import './GroupingBox.scss';
import { Toggle } from '../..';
import CircleButton from '../CircleButton/CircleButton';

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

import React from 'react';
import './DoubleArrow.scss';

DoubleArrow.defaultProps = {
    className: "",
};

export default function DoubleArrow({
    className,
    ...props
}) {
    return (
        <button
            className={`DoubleArrow ${className}`}
            {...props}
        >
            <div className="arrow" />
            <div className="arrow" />
        </button>
    );
}

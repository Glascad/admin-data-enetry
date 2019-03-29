import React from 'react';
import './DoubleArrow.scss';

DoubleArrow.defaultProps = {
    className: "",
};

export default function DoubleArrow({
    className = '',
    tagname = "button",
    ...props
}) {
    const tag = {
        name: tagname,
    };
    return (
        <tag.name
            className={`DoubleArrow ${className}`}
            {...props}
        >
            <div className="arrow" />
            <div className="arrow" />
        </tag.name>
    );
}

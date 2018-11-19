import React from 'react';
import PropTypes from 'prop-types';
import './EditButton.scss';

export default function EditButton({
    className = '',
    onClick,
    ...props
}) {
    const handleClick = e => {
        e.stopPropagation();
        onClick(e);
    }
    return (
        <button
            className={`EditButton ${className}`}
            onClick={handleClick}
            {...props}
        >
            <div className="edit-icon" />
        </button>
    );
}

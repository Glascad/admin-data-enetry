import React from 'react';
import PropTypes from 'prop-types';
import './DeleteButton.scss';

export default function DeleteButton({
    className = '',
    onClick,
}) {
    const handleClick = e => {
        e.stopPropagation();
        onClick(e);
    }
    return (
        <button
            className={`DeleteButton ${className}`}
            onClick={handleClick}
        >
            <div className="left-x" />
            <div className="right-x" />
        </button>
    );
}

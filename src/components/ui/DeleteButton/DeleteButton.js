import React from 'react';
// import PropTypes from 'prop-types';
import './DeleteButton.scss';

DeleteButton.defaultProps = {
    className: "",
};

export default function DeleteButton({
    className,
    onClick,
    ...props
}) {
    const handleClick = e => {
        e.stopPropagation();
        onClick(e);
    }
    return (
        <button
            className={`DeleteButton ${className}`}
            onClick={handleClick}
            {...props}
        >
            <div className="left-x text-color" />
            <div className="right-x text-color" />
        </button>
    );
}

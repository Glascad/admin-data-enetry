import React from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';

Dropdown.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
};

export default function Dropdown({ title, content }) {
    return (
        <details className="Dropdown">
            <summary>{title}</summary>
            <div className="content">
                {content}
            </div>
        </details>
    );
}

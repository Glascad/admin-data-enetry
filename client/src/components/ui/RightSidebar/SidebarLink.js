import React from 'react';

import DoubleArrow from '../DoubleArrow/DoubleArrow';

export default function SidebarLink({
    className = 'empty',
    toggleStackedView,
    View,
    View: {
        title,
        dataCy,
    },
    Icon,
}) {
    return (
        <button
            className={`sidebar-button ${className}`}
            onClick={() => toggleStackedView(View)}
            data-cy={dataCy}
        >
            {Icon ? (
                <Icon
                    className="icon"
                />
            ) : null}
            <span>{title}</span>
            <DoubleArrow
                className="icon after"
                tagname="div"
            />
        </button>
    )
}

import React from 'react';

import { DoubleArrow } from '../../../../../../../../components';

export default function SidebarLink({
    className = 'empty',
    toggleStackedView,
    View,
    View: {
        title,
    },
    Icon,
}) {
    return (
        <button
            className={`sidebar-button ${className}`}
            onClick={() => toggleStackedView(View)}
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

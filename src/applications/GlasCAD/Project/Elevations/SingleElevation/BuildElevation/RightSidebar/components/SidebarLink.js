import React from 'react';

import { DoubleArrow } from '../../../../../../../../components';

export default function SidebarLink({
    toggleStackedView,
    View,
    View: {
        name,
    },
    Icon,
}) {
    return (
        <button
            className="sidebar-button empty"
            onClick={() => toggleStackedView(View)}
        >
            {Icon ? (
                <Icon
                    className="icon"
                />
            ) : null}
            <span>{name}</span>
            <DoubleArrow
                className="icon after"
                tagname="div"
            />
        </button>
    )
}

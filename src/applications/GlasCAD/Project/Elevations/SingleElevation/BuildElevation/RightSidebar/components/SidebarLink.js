import React from 'react';

import { DoubleArrow } from '../../../../../../../../components';

export default function SidebarLink({
    toggleView,
    View,
    View: {
        name,
    },
}) {
    return (
        <button
            className="sidebar-button empty"
            onClick={() => toggleView(View)}
        >
            <span>{name}</span>
            <DoubleArrow
                className="icon after"
                tagname="div"
            />
        </button>
    )
}

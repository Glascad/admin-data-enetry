import React from 'react';

import { TitleBar } from '../../../../../../../../../components';

import * as Icons from '../../../../../../../../../assets/icons';

export default {
    title: "All Icons",
    component: AllIcons,
};

function AllIcons({
    elevation,
    updateElevation,
    toggleStackedView,
}) {
    return (
        <>
            <TitleBar
                title="All Icons"
            />
            {Object.entries(Icons)
                .map(([name, Icon]) => (
                    <button
                        className="sidebar-button empty"
                    >
                        <Icon />
                        <span>{name.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </button>
                ))}
        </>
    );
}

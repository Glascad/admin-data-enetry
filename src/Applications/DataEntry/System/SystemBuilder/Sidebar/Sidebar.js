import React from 'react';
import { RightSidebar } from '../../../../../components';

export default function Sidebar({

}) {
    return (
        <RightSidebar
            open={false}
            View={{
                title: "Sidebar",
                component: () => "Sidebar",
            }}
        />
    );
}

import React from 'react';
import TitleBar from '../../components/ui/TitleBar/TitleBar';

function Activity() {
    return (
        <>
            <TitleBar
                title="Activity"
            />
            <div className="card" />
        </>
    );
}

export default {
    name: "Activity",
    exact: true,
    path: "/activity",
    component: Activity,
}

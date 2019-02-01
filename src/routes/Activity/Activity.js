import React from 'react';
import TitleBar from '../../components/ui/TitleBar/TitleBar';

Activity.navigationOptions = {
    exact: true,
};

export default function Activity() {
    return (
        <>
            <TitleBar
                title="Activity"
            />
            <div className="card" />
        </>
    );
}

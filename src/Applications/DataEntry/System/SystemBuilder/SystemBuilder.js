import React from 'react';
import { TitleBar } from "../../../../components";

SystemBuilder.navigationOptions = {
    path: '/build',
};

export default function SystemBuilder({
    
}) {

    return (
        <TitleBar
            title="System Builder"
        />
    );
}

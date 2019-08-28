import React from 'react';
import { TitleBar, TransformProvider } from "../../../../components";
import SystemTree from './SystemTree/SystemTree';

SystemBuilder.navigationOptions = {
    path: '/build',
};

export default function SystemBuilder({
    
}) {

    return (
        <TransformProvider>
            <SystemTree />
        </TransformProvider>
    );
}

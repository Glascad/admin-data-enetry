import React from 'react';

import {
    TabNavigator,
} from '../../../components';

import Linetypes from './Linetypes/Linetypes';
import LineWeights from './LineWeights/LineWeights';

export default function LinetypesView() {
    return (
        <TabNavigator
            routes={[
                {
                    name: "Line Types",
                    path: "/types",
                    component: Linetypes,
                },
                {
                    name: "Line Weights",
                    path: "/weights",
                    component: LineWeights,
                },
            ]}
        />
    )
}
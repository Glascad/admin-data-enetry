import React from 'react';

import SystemTypes from './SystemTypes/SystemTypes';
import DetailTypes from './DetailTypes/DetailTypes';
import ConfigurationTypes from './ConfigurationTypes/ConfigurationTypes';

import {
    TabNavigator,
} from '../../../components';

export default function Types() {
    return (
        <TabNavigator
            routes={[
                {
                    name: "Configuration Types",
                    path: "/configuration",
                    component: ConfigurationTypes
                },
                {
                    name: "Detail Types",
                    path: "/detail",
                    component: DetailTypes
                },
                {
                    name: "System Types",
                    path: "/system",
                    component: SystemTypes
                },
            ]}
            />
    );
}

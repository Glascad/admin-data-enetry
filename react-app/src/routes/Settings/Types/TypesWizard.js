import React from 'react';

import SystemTypes from './SystemTypes/SystemTypes';
import DetailTypes from './DetailTypes/DetailTypes';
import ConfigurationTypes from './ConfigurationTypes/ConfigurationTypes';
import PartTypes from './PartTypes/PartTypes';

import {
    Wizard,
} from '../../../components';

export default function () {
    return (
        <Wizard
            routerProps={arguments[0]}
            navigation="tabs"
            routes={[
                {
                    name: "System Types",
                    path: `/system`,
                    component: SystemTypes
                },
                {
                    name: "Detail Types",
                    path: `/detail`,
                    component: DetailTypes
                },
                {
                    name: "Configuration Types",
                    path: `/configuration`,
                    component: ConfigurationTypes
                },
                {
                    name: "Part Types",
                    path: `/part`,
                    component: PartTypes
                },
            ]}
        />
    );
}

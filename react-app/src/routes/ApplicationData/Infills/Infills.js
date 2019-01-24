import React from 'react';

import InfillSizes from './InfillSizes/InfillSizes';
import InfillPockets from './InfillPockets/InfillPockets';

import {
    TabNavigator,
} from '../../../components';

export default function () {
    return (
        <TabNavigator
            routes={[
                {
                    name: "Infill Sizes",
                    path: "/sizes",
                    component: InfillSizes,
                },
                {
                    name: "Infill Pockets",
                    path: "/pockets",
                    component: InfillPockets,
                },
            ]}
        />
    );
}

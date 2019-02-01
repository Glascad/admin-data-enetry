import React from 'react';

import InfillSizes from './InfillSizes/InfillSizes';
import InfillPockets from './InfillPockets/InfillPockets';

import {
    TabNavigator,
} from '../../../components';

export default function Infills() {
    return (
        <TabNavigator
            routes={[
                InfillSizes,
                InfillPockets,
            ]}
        />
    );
}

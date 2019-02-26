import React from 'react';

import InfillSizes from './InfillSizes/InfillSizes';
import InfillPocketTypes from './InfillPocketTypes/InfillPocketTypes';
import InfillPocketSizes from './InfillPocketSizes/InfillPocketSizes';

import {
    TabNavigator,
} from '../../../components';

export default function Infills() {
    return (
        <TabNavigator
            routes={[
                InfillSizes,
                InfillPocketTypes,
                InfillPocketSizes,
            ]}
        />
    );
}

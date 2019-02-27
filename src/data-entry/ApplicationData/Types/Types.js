import React from 'react';

import SystemTypes from './SystemTypes/SystemTypes';
import DetailTypes from './DetailTypes/DetailTypes';
import ConfigurationTypes from './ConfigurationTypes/ConfigurationTypes';

import {
    TabNavigator,
} from '../../../components';

const subroutes = {
    SystemTypes,
    DetailTypes,
    ConfigurationTypes,
};

Types.navigationOptions = {
    subroutes,
};

export default function Types() {
    return (
        <TabNavigator
            routes={subroutes}
        />
    );
}

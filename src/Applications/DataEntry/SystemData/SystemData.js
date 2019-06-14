import React from 'react';

import {
    Navigator,
} from '../../../components';

import SystemSearch from './SystemSearch/SystemSearch';
import SingleSystem from './SingleSystem/SingleSystem';

const subroutes = {
    SystemSearch,
    SingleSystem,
};

SystemData.navigationOptions = {
    subroutes,
};

export default function SystemData() {
    return (
        <Navigator
            routes={subroutes}
        />
    );
}

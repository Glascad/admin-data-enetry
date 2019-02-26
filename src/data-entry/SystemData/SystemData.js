import React from 'react';

import {
    Navigator,
} from '../../components';

import SystemSearch from './SystemSearch/SystemSearch';
import SystemToggle from './SystemToggle/SystemToggle';

const subroutes = [
    SystemSearch,
    SystemToggle,
];

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

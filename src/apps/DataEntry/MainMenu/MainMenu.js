import React from 'react';

import {
    Navigator,
} from '../../../components';

import ManageSystems from './ManageSystems/ManageSystems';

const subroutes = {
    ManageSystems,
};

MainMenu.navigationOptions = {
    subroutes,
};

export default function MainMenu() {
    return (
        <Navigator
            routes={subroutes}
        />
    );
}

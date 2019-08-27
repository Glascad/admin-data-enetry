import React from 'react';

import {
    Navigator,
} from '../../../components';

import SystemSearch from './SystemSearch/SystemSearch';

const subroutes = {
    SystemSearch,
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

import React from 'react';

import {
    Navigator,
} from '../../../components';

import Manufacturers from './Manufacturers/Manufacturers';

const subroutes = {
    Manufacturers,
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

import React from 'react';

import {
    Navigator,
} from '../../../components';

import SingleSystem from './SingleSystem/SingleSystem';

const subroutes = {
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

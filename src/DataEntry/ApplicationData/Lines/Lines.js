import React from 'react';

import {
    TabNavigator,
} from '../../../components';

import Linetypes from './Linetypes/Linetypes';
import LineWeights from './LineWeights/LineWeights';

const subroutes = {
    Linetypes,
    LineWeights,
};

Lines.navigationOptions = {
    subroutes,
};

export default function Lines() {
    return (
        <TabNavigator
            routes={subroutes}
        />
    )
}
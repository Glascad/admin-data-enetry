import React from 'react';

import {
    TabNavigator,
} from '../../../components';

import PartTypes from './PartTypes/PartTypes';
import Orientations from './Orientations/Orientations';
import PartTags from './PartTags/PartTags';

const subroutes = [
    PartTypes,
    PartTags,
    Orientations,
];

Parts.navigationOptions = {
    subroutes,
};

export default function Parts() {
    return (
        <TabNavigator
            routes={subroutes}
        />
    );
}

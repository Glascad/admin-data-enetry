import React, { Component } from 'react';

import {
    Navigator,
} from '../../../../components';

import NewElevation from './NewElevation/NewElevation';
import EditElevation from './EditElevation/EditElevation';
import BuildElevation from './BuildElevation/BuildElevation';

const subroutes = {
    NewElevation,
    EditElevation,
    BuildElevation,
};

Elevations.navigationOptions = {
    subroutes,
};

export default function Elevations() {
    return (
        <Navigator
            routes={subroutes}
        />
    );
}

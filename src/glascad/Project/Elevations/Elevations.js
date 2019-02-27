import React from 'react';

import { Navigator } from '../../../components';

import AllElevations from './AllElevations/AllElevations';
import Elevation from './Elevation/Elevation';

export default function Elevations(props) {
    return (
        <Navigator
            routeProps={props}
            routes={{
                AllElevations,
                Elevation,
            }}
        />
    );
}

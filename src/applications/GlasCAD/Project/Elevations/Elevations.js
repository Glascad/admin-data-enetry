import React from 'react';

import { Navigator } from '../../../../components';

import ElevationSearch from './ElevationSearch/ElevationSearch';
import SingleElevation from './SingleElevation/SingleElevation';

export default function Elevations(props) {
    return (
        <Navigator
            routeProps={props}
            routes={{
                ElevationSearch,
                SingleElevation,
            }}
        />
    );
}

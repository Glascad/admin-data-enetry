import React from 'react';

import { Navigator } from '../components';

import Authentication from './Authentication/Authentication';
import Glascad from './GlasCAD/GlasCAD';
import DataEntry from './DataEntry/DataEntry';

export default () => (
    <Navigator
        routes={{
            Authentication,
            Glascad,
            DataEntry,
        }}
    />
);

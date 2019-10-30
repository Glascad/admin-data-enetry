import React from 'react';

import Statics from '../Statics/Statics';

import MainMenu from './MainMenu/MainMenu';
import Manufacturer from './Manufacturer/Manufacturer';

export default props => (
    <Statics
        {...props}
        routes={{
            MainMenu,
            Manufacturer,
        }}
    />
);

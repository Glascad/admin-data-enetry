import React from 'react';

import Statics from '../Statics/Statics';

// import Activity from './Activity/Activity';
import MainMenu from './MainMenu/MainMenu';
import Manufacturer from './Manufacturer/Manufacturer';
// import ApplicationData from './ApplicationData/ApplicationData';
import PartData from './PartData/PartData';

export default props => (
    <Statics
        {...props}
        routes={{
            // Activity,
            MainMenu,
            Manufacturer,
            // ApplicationData,
            // PartData,
        }}
    />
);

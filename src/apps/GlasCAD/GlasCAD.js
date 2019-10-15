import React from 'react';

import Statics from '../Statics/Statics';

import MainMenu from './MainMenu/MainMenu';
import Project from './Project/Project';
// import Export from './Export/Export';

export default props => (
    <Statics
        {...props}
        routes={{
            MainMenu,
            Project,
            // Export,
        }}
    />
);

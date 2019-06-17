import React from 'react';

import Statics from '../Statics/Statics';

import MainMenu from './MainMenu/MainMenu';
import Project from './Project/Project';
import Export from './Export/Export';
import { parseSearch } from '../../utils';

export default function GlasCAD({
    location: {
        search,
    },
}) {
    console.log(arguments[0]);
    const projectId = 1;
    return (
        <Statics
            initialRoute={`/project/elevations/elevation-search${parseSearch(search).update({ projectId })}`}
            routes={{
                MainMenu,
                Project,
                Export,
            }}
        />
    );
}

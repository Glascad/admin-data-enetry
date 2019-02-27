import React from 'react';

import {
    TabNavigator,
} from '../../../components';

import ProjectInfo from './ProjectInfo/ProjectInfo';
import Contributors from './Contributors/Contributors';
import Workflow from './Workflow/Workflow';
import ProjectActivity from './ProjectActivity/ProjectActivity';

const subroutes = [
    ProjectInfo,
    Contributors,
    Workflow,
    ProjectActivity,
];

ProjectDetails.navigationOptions = {
    subroutes,
};

export default function ProjectDetails(props) {
    return (
        <TabNavigator
            routeProps={props}
            routes={subroutes}
        />
    );
}
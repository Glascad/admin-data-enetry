import React from 'react';

import {
    Navigator,
} from '../../components';

import Activity from './Activity/Activity';
import ManageProjects from './ManageProjects/ManageProjects';
import ManageContributors from './ManageContributors/ManageContributors';
import ManageWorkflows from './ManageWorkflows/ManageWorkflows';
import Reports from './Reports/Reports';

const subroutes = {
    Activity,
    ManageProjects,
    ManageContributors,
    ManageWorkflows,
    Reports,
};

MainMenu.navigationOptions = {
    subroutes,
}

export default function MainMenu() {
    return (
        <Navigator
            routes={subroutes}
        />
    )
}
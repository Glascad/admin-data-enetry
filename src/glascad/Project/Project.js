import React from 'react';

import {
    ApolloWrapper,
    Navigator,
} from '../../components';

import query from './project-graphql/query';

import ProjectDetails from './ProjectDetails/ProjectDetails';
import Schedules from './Schedules/Schedules';
import Keyplans from './Keyplans/Keyplans';
import Elevations from './Elevations/Elevations';
import Details from './Details/Details';
import Notes from './Notes/Notes';

const subroutes = [
    ProjectDetails,
    Schedules,
    Keyplans,
    Elevations,
    Details,
    Notes,
];

Project.navigationOptions = {
    subroutes,
};

export default function Project() {
    return (
        <ApolloWrapper
            query={{ query }}
        >
            {apollo => (
                <Navigator
                    routeProps={apollo}
                    routes={subroutes}
                />
            )}
        </ApolloWrapper>
    );
}
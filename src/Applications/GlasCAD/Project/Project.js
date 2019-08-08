import React from 'react';

import { Redirect } from 'react-router-dom';

import {
    ApolloWrapper,
    Navigator,
    Ellipsis,
} from '../../../components';

import query from './project-graphql/query';

// import ProjectDetails from './ProjectDetails/ProjectDetails';
import ProjectSets from './ProjectSets/ProjectSets';
// import Keyplans from './Keyplans/Keyplans';
import Elevations from './Elevations/Elevations';
// import ElevationDebugger from './ElevationDebugger/ElevationDebugger';
// import Details from './Details/Details';
// import Schedules from './Schedules/Schedules';
// import Notes from './Notes/Notes';

import { parseSearch } from '../../../utils';

const subroutes = {
    // ProjectDetails,
    ProjectSets,
    // Keyplans,
    Elevations,
    // ElevationDebugger,
    // Details,
    // Schedules,
    // Notes,
};

Project.navigationOptions = ({
    location: {
        search,
    },
}) => ({
    name: (
        <ApolloWrapper
            query={{
                query,
                variables: {
                    id: +parseSearch(search).projectId,
                },
            }}
        >
            {({
                queryStatus: {
                    _project: {
                        name = '',
                    } = {},
                } = {},
            }) => name || <Ellipsis />}
        </ApolloWrapper>
    ),
    shouldRender: !!parseSearch(search).projectId,
    subroutes,
    path: "/project",
});

export default function Project({
    match: {
        path,
    },
    location: {
        search,
    },
}) {
    if (!parseSearch(search).projectId) return (
        <Redirect
            to={path.replace(/project.*/, 'main-menu')}
        />
    )
    // console.log(arguments[0]);
    return (
        <ApolloWrapper
            query={{
                query,
                variables: {
                    id: +parseSearch(search).projectId,
                },
            }}
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

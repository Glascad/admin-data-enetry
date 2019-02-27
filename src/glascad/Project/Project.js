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

import { parseSearch } from '../../utils';

const subroutes = {
    ProjectDetails,
    Schedules,
    Keyplans,
    Elevations,
    Details,
    Notes,
};

Project.navigationOptions = ({
    location: {
        search,
    },
}) => ({
    shouldRender: !!parseSearch(search).projectId,
    subroutes,
});

export default function Project({
    location: {
        search,
    },
}) {
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
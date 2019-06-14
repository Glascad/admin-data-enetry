import React, { lazy } from 'react';

import gql from 'graphql-tag';

import { ApolloWrapper } from '../../../components';

import { parseSearch } from '../../../utils';

// import ProjectDetails from './ProjectDetails/router';
import ProjectSets from './ProjectSets/router';
// import Keyplans from './Keyplans/router';
// import Elevations from './Elevations/router';
// import Details from './Details/router';
// import Schedules from './Schedules/router';
// import Notes from './Notes/router';

export default new LazyRoute(({ location: { search } }) => ({
    component: lazy(() => import('./Project')),
    subroutes: {
        // ProjectDetails,
        ProjectSets,
        // Keyplans,
        // Elevations,
        // Details,
        // Schedules,
        // Notes,
    },
    // shouldRender: !!parseSearch(search).projectId,
    name: (
        <ApolloWrapper
            query={{
                query: gql`
                    query Project($id:Int!){
                        projectById(id:$id){
                            __typename
                            nodeId
                            name
                        }
                    }
                `,
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
            }) => name || '...'}
        </ApolloWrapper>
    ),
}));

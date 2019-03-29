import React from 'react';

import gql from 'graphql-tag';

import {
    ApolloWrapper,
    Navigator,
} from '../../../components';

import query from './project-graphql/query';

import ProjectDetails from './ProjectDetails/ProjectDetails';
import ProjectSets from './ProjectSets/ProjectSets';
import Keyplans from './Keyplans/Keyplans';
import Elevations from './Elevations/Elevations';
import Details from './Details/Details';
import Schedules from './Schedules/Schedules';
import Notes from './Notes/Notes';

import { parseSearch } from '../../../utils';

const subroutes = {
    ProjectDetails,
    ProjectSets,
    Keyplans,
    Elevations,
    Details,
    Schedules,
    Notes,
};

Project.navigationOptions = ({
    location: {
        search,
    },
}) => ({
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
    shouldRender: !!parseSearch(search).projectId,
    subroutes,
    path: "/project",
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
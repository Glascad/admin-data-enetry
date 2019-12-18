import React from 'react';

import { Redirect } from 'react-router-dom';

import {
    ApolloWrapper,
    Navigator,
    Ellipsis,
    useQuery,
} from '../../../components';

import query from './project-graphql/query';

import ProjectSets from './ProjectSets/ProjectSets';
import Elevations from './Elevations/Elevations';

import { parseSearch } from '../../../utils';

const subroutes = {
    ProjectSets,
    Elevations,
};

Project.navigationOptions = ({
    location: {
        search,
    },
}) => ({
    requiredURLParams: ['projectId'],
    subroutes,
    path: "/project",
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
                queryResult: {
                    _project: {
                        name = '',
                    } = {},
                } = {},
            }) => name || (
                <Ellipsis />
            )}
        </ApolloWrapper>
    ),
});

export default function Project({
    match: {
        path,
    },
    location: {
        search,
    },
}) {
    const [fetchQuery, queryResult] = useQuery({
        query,
        variables: {
            id: +parseSearch(search).projectId,
        },
    });

    if (!parseSearch(search).projectId) return (
        <Redirect
            to={path.replace(/project.*/, 'main-menu')}
        />
    );

    return (
        <Navigator
            routeProps={{ queryResult }}
            routes={subroutes}
        />
    );
};

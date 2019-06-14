import React from 'react';

import {
    ApolloWrapper,
    Navigator,
} from '../../../components';

import query from './project-graphql/query';

import { parseSearch } from '../../../utils';

export default ({ subroutes, location: { search } }) => (
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

import React from 'react';

import {
    ApolloWrapper,
    Navigator,
} from '../../components';

import query from './project-graphql/query';

import Elevations from './Elevations/Elevations';

const subroutes = [
    Elevations,
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
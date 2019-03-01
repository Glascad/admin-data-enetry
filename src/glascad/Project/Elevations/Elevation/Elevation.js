import React, { Component } from 'react';

import {
    Navigator,
    ApolloWrapper,
} from '../../../../components';

import NewElevation from './NewElevation/NewElevation';
import EditElevation from './EditElevation/EditElevation';
import BuildElevation from './BuildElevation/BuildElevation';

import query from './elevation-graphql/query';
import mutations from './elevation-graphql/mutations';

import { parseSearch } from '../../../../utils';

const subroutes = {
    NewElevation,
    EditElevation,
    BuildElevation,
};

Elevations.navigationOptions = {
    subroutes,
};

export default function Elevations({
    location: {
        search,
    },
}) {

    const { elevationId } = parseSearch(search);

    return (
        <ApolloWrapper
            query={{
                query,
                variables: {
                    id: +elevationId,
                },
            }}
            mutations={mutations}
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

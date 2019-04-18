import React from 'react';

import {
    Navigator,
    ApolloWrapper,
} from '../../../../../components';

import CreateElevation from './CreateElevation/CreateElevation';
import EditElevation from './EditElevation/EditElevation';
import BuildElevation from './BuildElevation/BuildElevation';

import query from './utils/elevation-graphql/query';
import mutations from './utils/elevation-graphql/mutations';

import { parseSearch } from '../../../../../utils';

const subroutes = {
    CreateElevation,
    EditElevation,
    BuildElevation,
};

SingleElevation.navigationOptions = {
    name: "Elevation",
    subroutes,
};

export default function SingleElevation({
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

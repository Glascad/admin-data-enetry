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

import sample2 from './__test__/sample-elevations/sample2.json';

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
                    routeProps={{
                        ...apollo,
                        queryStatus: {
                            ...apollo.queryStatus,
                            // FOR TESTING PURPOSES - `to inject sample elevation code into elevation builder`
                            // _elevation: sample2,
                        },
                    }}
                    routes={subroutes}
                />
            )}
        </ApolloWrapper>
    );
}

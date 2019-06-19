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

import sample1 from './__test__/sample-elevations/sample1.json';
import sample1Special from './__test__/sample-elevations/sample1-special.json';
import sample2 from './__test__/sample-elevations/sample2.json';
import sample3 from './__test__/sample-elevations/sample3.json';
import sample3Special from './__test__/sample-elevations/sample3-special.json';
import sample4 from './__test__/sample-elevations/sample4.json';

const subroutes = {
    CreateElevation,
    EditElevation,
    BuildElevation,
};

SingleElevation.navigationOptions = {
    name: "Elevation",
    subroutes,
};

const SAMPLE_ELEVATIONS = {
    sample1,
    sample1Special,
    sample2,
    sample3,
    sample3Special,
    sample4,
};

export default function SingleElevation({
    location: {
        search,
    },
}) {

    const { elevationId, sampleElevation } = parseSearch(search);

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
                            ...(sampleElevation ?
                                {
                                    _elevation: SAMPLE_ELEVATIONS[sampleElevation],
                                }
                                :
                                null)
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

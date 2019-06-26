import React, { useEffect } from 'react';

import {
    Navigator,
    ApolloWrapper,
    useQuery,
    useMutation,
} from '../../../../../components';

import CreateElevation from './CreateElevation/CreateElevation';
import EditElevation from './EditElevation/EditElevation';
import BuildElevation from './BuildElevation/BuildElevation';

import query from './utils/elevation-graphql/query';
import updateElevationMutation from './utils/elevation-graphql/mutations';

import { parseSearch } from '../../../../../utils';

import sample1 from './__test__/sample-elevations/sample1.json';
import sample1Special from './__test__/sample-elevations/sample1-special.json';
import sample2 from './__test__/sample-elevations/sample2.json';
import sample3 from './__test__/sample-elevations/sample3.json';
import sample3Special from './__test__/sample-elevations/sample3-special.json';
import sample4 from './__test__/sample-elevations/sample4.json';
import sample5 from './__test__/sample-elevations/sample5.json';
import sample6 from './__test__/sample-elevations/sample6.json';

const subroutes = {
    CreateElevation,
    EditElevation,
    BuildElevation,
};

SingleElevation.navigationOptions = {
    name: "Elevation",
    subroutes,
};

export const SAMPLE_ELEVATIONS = {
    sample1,
    sample1Special,
    sample2,
    sample3,
    sample3Special,
    sample4,
    sample5,
    sample6,
};

export default function SingleElevation({
    location: {
        search,
    },
}) {

    const { elevationId, sampleElevation } = parseSearch(search);

    const variables = { id: +elevationId };

    console.log({ variables });

    const [fetchQuery, queryStatus, fetching] = useQuery({ query, variables }, true);

    useEffect(() => {
        if (elevationId) {
            console.log({ variables });
            fetchQuery();
        }
    }, [elevationId]);

    console.log({ queryStatus });

    const [updateEntireElevation, updatedElevation, updating] = useMutation(updateElevationMutation, fetchQuery);

    const routeProps = sampleElevation ? {
        queryStatus: {
            _elevation: SAMPLE_ELEVATIONS[sampleElevation],
        },
        updateEntireElevation: () => {
            throw new Error("Cannot update sample elevation");
        },
        updating: false,
    } : {
            fetching,
            queryStatus,
            updateEntireElevation,
            updating,
        };

    return (
        <Navigator
            routeProps={routeProps}
            routes={subroutes}
        />
    );
}

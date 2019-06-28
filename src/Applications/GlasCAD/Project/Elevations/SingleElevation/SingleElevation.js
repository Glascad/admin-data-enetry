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

import * as SAMPLE_ELEVATIONS from './__test__/sample-elevations';

const subroutes = {
    CreateElevation,
    EditElevation,
    BuildElevation,
};

SingleElevation.navigationOptions = {
    name: "Elevation",
    subroutes,
};

export {
    SAMPLE_ELEVATIONS,
};

export default function SingleElevation({
    location: {
        search,
    },
    queryStatus: {
        _project: {
            defaultElevation,
        } = {},
    },
}) {

    const { elevationId, sampleElevation } = parseSearch(search);

    const variables = { id: +elevationId };

    // console.log({ variables });

    const [fetchQuery, queryStatus, fetching] = useQuery({ query, variables }, true);

    console.log({ queryStatus });

    const [updateEntireElevation, updatedElevation, updating] = useMutation(updateElevationMutation, fetchQuery);

    useEffect(() => {
        if (elevationId) {
            // console.log({ variables });
            fetchQuery();
        }
    }, [elevationId]);

    const routeProps = sampleElevation ?
        {
            queryStatus: {
                _elevation: SAMPLE_ELEVATIONS[sampleElevation],
            },
            updateEntireElevation: () => {
                throw new Error("Cannot update sample elevation");
            },
            updating: false,
            defaultElevation,
        } : {
            fetching,
            queryStatus,
            updateEntireElevation,
            updating,
            defaultElevation,
        };

    return (
        <Navigator
            routeProps={routeProps}
            routes={subroutes}
        />
    );
}

import React, { useEffect } from 'react';

import {
    Navigator,
    ApolloWrapper,
    useQuery,
    useMutation,
} from '../../../../../components';

import CreateElevation from './CreateElevation/CreateElevation';
import ElevationInfo from './ElevationInfo/ElevationInfo';
import BuildElevation from './BuildElevation/BuildElevation';

import query, { bugReportQuery } from './utils/elevation-graphql/query';
import updateElevationMutation from './utils/elevation-graphql/mutations';

import { parseSearch } from '../../../../../utils';

import * as SAMPLE_ELEVATIONS from './utils/sample-elevations';

const subroutes = {
    CreateElevation,
    ElevationInfo,
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
    queryStatus: projectQueryStatus,
    queryStatus: {
        _project: project,
        _project: {
            defaultElevation,
        } = {},
    },
}) {

    const { elevationId, sampleElevation, bugId } = parseSearch(search);

    const variables = { id: +elevationId || -1 };

    // console.log({ variables });

    // const [fetchElevation, elevationStatus, fetchingElevation] = useQuery({ query, variables }, true);
    const [refetch, queryStatus, fetching] = useQuery({ query, variables }, true);

    // const [fetchBugs, bugStatus, fetchingBugs] = useQuery({ query: bugReportQuery });

    // const fetching = fetchingElevation; // || fetchingBugs;

    // const queryStatus = {
    //     ...bugStatus,
    //     ...elevationStatus,
    // };

    // const refetch = () => {
    //     console.log(variables);
    //     fetchElevation(variables);
    //     fetchBugs();
    // }

    // console.log({ queryStatus });

    const [updateEntireElevation, updatedElevation, updating] = useMutation(
        updateElevationMutation,
        () => {
            if (elevationId) {
                refetch(variables);
            }
        }
    );

    useEffect(() => {
        if (elevationId) {
            // console.log({ elevationId });
            // console.log({ variables });
            refetch(variables);
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
            project,
        } : {
            fetching,
            refetch,
            queryStatus,
            updateEntireElevation,
            updating,
            defaultElevation,
            project,
        };

    // console.log(routeProps);

    return (
        <Navigator
            routeProps={routeProps}
            routes={subroutes}
        />
    );
}

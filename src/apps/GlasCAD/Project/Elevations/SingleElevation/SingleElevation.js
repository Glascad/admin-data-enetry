import React, { useEffect } from 'react';
import { Navigator, useMutation, useQuery } from '../../../../../components';
import { parseSearch } from '../../../../../utils';
import BuildElevation from './BuildElevation/BuildElevation';
import CreateElevation from './CreateElevation/CreateElevation';
import ElevationInfo from './ElevationInfo/ElevationInfo';
import updateElevationMutation from './utils/elevation-graphql/mutations';
import query from './utils/elevation-graphql/query';
import * as SAMPLE_ELEVATIONS from './utils/sample-elevations';
import { SystemMap } from '../../../../../app-logic/system';

const subroutes = {
    CreateElevation,
    ElevationInfo,
    BuildElevation,
};

SingleElevation.navigationOptions = {
    name: "Elevation",
    subroutes,
};

export { SAMPLE_ELEVATIONS, };

export default function SingleElevation({
    location: {
        search,
    },
    queryResult: projectQueryStatus,
    queryResult: {
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
    const [refetch, queryResult, fetching] = useQuery({ query, variables }, true);

    // const [fetchBugs, bugStatus, fetchingBugs] = useQuery({ query: bugReportQuery });

    // const fetching = fetchingElevation; // || fetchingBugs;

    // const queryResult = {
    //     ...bugStatus,
    //     ...elevationStatus,
    // };

    // const refetch = () => {
    //     console.log(variables);
    //     fetchElevation(variables);
    //     fetchBugs();
    // }

    // console.log({ queryResult });

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

    const {
        _elevation: {
            _systemSet: systemSet,
            _systemSet: {
                _system,
            } = {},
        } = {},
    } = queryResult;

    const systemMap = new SystemMap(_system);

    console.log({
        queryResult,
        systemSet,
        systemMap,
    });

    const routeProps = sampleElevation ?
        {
            queryResult: {
                _elevation: SAMPLE_ELEVATIONS[sampleElevation],
            },
            updating: false,
            defaultElevation,
            project,
            systemMap,
            updateEntireElevation: () => {
                throw new Error("Cannot update sample elevation");
            },
        } : {
            fetching,
            refetch,
            queryResult,
            updating,
            defaultElevation,
            project,
            systemMap,
            systemSet,
            updateEntireElevation,
        };

    // console.log(routeProps);

    return (
        <Navigator
            routeProps={routeProps}
            routes={subroutes}
        />
    );
}

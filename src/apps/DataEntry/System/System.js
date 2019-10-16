import React from 'react';

import gql from 'graphql-tag';

import {
    ApolloWrapper,
    ToggleNavigator,
    Ellipsis,
    useMutation,
    useQuery,
    TitleBar,
    Navigator,
    useInitialState,
} from '../../../components';

import query from './system-graphql/query';
// import mutations from './system-graphql/mutations';
import { updateEntireSystem as updateEntireSystemMutation } from './system-graphql/mutations';

import SystemInfo from './SystemInfo/SystemInfo';
import SystemBuilder from './SystemBuilder/SystemBuilder';
// import DetailBuilder from './DetailBuilder/DetailBuilder';

import { parseSearch } from '../../../utils';
import * as SAMPLE_SYSTEMS from '../../../app-logic/__test__/sample-systems';

const subroutes = {
    SystemInfo,
    SystemBuilder,
    // DetailBuilder,
};

// this is for rendering the correct name in the sidebar
System.navigationOptions = ({
    location: {
        search,
    },
}) => ({
    name: (
        <ApolloWrapper
            query={{
                query: gql`
                    query System($id: Int!) {
                        systemById(id: $id) {
                            __typename
                            nodeId
                            name
                        }
                    }
                `,
                variables: {
                    id: +parseSearch(search).systemId,
                },
            }}
        >
            {({
                queryResult: {
                    _system: {
                        name = '',
                    } = {},
                } = {},
                rawQueryStatus: {
                    loading,
                },
            }) => (
                    loading ?
                        <Ellipsis />
                        :
                        name
                )}
        </ApolloWrapper>
    ),
    shouldRender: !!parseSearch(search).systemId,
    path: "/system",
    subroutes,
});

export default function System({
    location: {
        search,
    },
}) {

    const { systemId, sampleSystem } = parseSearch(search);

    const [fetchQuery, queryResult, fetching] = useQuery({ query, variables: { id: +systemId || 0 } });

    const _sampleSystem = SAMPLE_SYSTEMS[sampleSystem];

    console.log({
        SAMPLE_SYSTEMS,
        sampleSystem,
        _sampleSystem,
    });

    const [updateEntireSystem, updateStatus, updating] = useMutation(updateEntireSystemMutation, fetchQuery);

    return (
        <Navigator
            routes={subroutes}
            routeProps={{
                queryResult: {
                    ...queryResult,
                    _system: _sampleSystem || queryResult._system,
                },
                fetching,
                updateEntireSystem,
                updating,
            }}
        />
    );
}

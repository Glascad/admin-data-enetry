import React from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import {
    ApolloWrapper,
    Ellipsis,
    useMutation,
    useQuery,
    Navigator,
    useRedoableState,
} from '../../../../components';
import query from './system-graphql/query';
import { updateEntireSystem as updateEntireSystemMutation } from './system-graphql/mutations';
import SystemInfo from './SystemInfo/SystemInfo';
import SystemBuilder from './SystemBuilder/SystemBuilder';
import DetailBuilder from './DetailBuilder/DetailBuilder';
import { parseSearch } from '../../../../utils';
import * as SAMPLE_SYSTEMS from '../../../../app-logic/__test__/sample-systems';
import { SystemMap } from '../../../../app-logic/system-utils';
import cleanSystemInput from './ducks/clean-system-input';
import merge from './ducks/merge';
import { systemUpdate } from './ducks/schemas';

const subroutes = {
    SystemBuilder,
    DetailBuilder,
    SystemInfo,
};

// this is for rendering the correct name in the sidebar
SingleSystem.navigationOptions = ({
    location: {
        search,
        pathname,
    },
}) => ({
    requiredURLParams: ['systemId'],
    path: "/single-system",
    subroutes,
    name: (
        <ApolloWrapper
            query={{
                query: gql`
                    query System($id: Int!) {
                        systemById(id: $id) {
                            __typename
                            nodeId
                            name
                            manufacturerId
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
                        manufacturerId,
                    } = {},
                } = {},
                rawQueryStatus: {
                    loading,
                },
            }) => (
                    loading ?
                        <Ellipsis />
                        :
                        `${manufacturerId}` === parseSearch(search).manufacturerId ?
                            name
                            :
                            <Redirect
                                to={`${pathname}${parseSearch(search).remove("systemId")}`}
                            />
                )}
        </ApolloWrapper>
    ),
});

export default function SingleSystem({
    location: {
        search,
    },
}) {

    const { systemId, sampleSystem } = parseSearch(search);

    const [fetchQuery, queryResult, fetching] = useQuery({ query, variables: { id: +systemId || 0 } });

    const _sampleSystem = SAMPLE_SYSTEMS[sampleSystem];

    const [updateEntireSystem, updateStatus, updating] = useMutation(updateEntireSystemMutation, fetchQuery);

    const {
        currentState: systemInput,
        pushState,
        replaceState,
    } = useRedoableState(systemUpdate);

    const system = merge(systemInput, queryResult);

    const systemMap = new SystemMap(system);

    const dispatch = (ACTION, payload, { replaceState: shouldReplaceState = false } = {}) => (shouldReplaceState ?
        replaceState
        :
        pushState
    )(systemInput => ({
        ...systemInput,
        ...ACTION(
            systemInput,
            payload,
        ),
    }));

    const save = async () => {
        dispatch(() => systemUpdate);
        try {
            const result = await updateEntireSystem(cleanSystemInput(systemInput, system));
            console.log({ result });
        } catch (err) {
            console.error(err);
            dispatch(() => systemInput);
        }
    };

    console.log({
        system,
        systemMap,
        systemInput,
    });

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
                save,
                dispatch,
                systemMap,
                system,
                systemInput,
            }}
        />
    );
}

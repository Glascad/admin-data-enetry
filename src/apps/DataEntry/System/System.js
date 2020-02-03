import gql from 'graphql-tag';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { SystemMap } from '../../../app-logic/system';
import * as SAMPLE_SYSTEMS from '../../../app-logic/__test__/sample-systems';
import { ApolloWrapper, Ellipsis, Navigator, useMutation, useQuery, useRedoableState, useSaveOnCtrlS } from '../../../components';
import { normalCase, parseSearch } from '../../../utils';
import DetailBuilder from './DetailBuilder/DetailBuilder';
import cleanSystemInput from './ducks/clean-system-input';
import merge from './ducks/merge';
import { systemUpdate } from './ducks/schemas';
import { updateEntireSystem as updateEntireSystemMutation } from './system-graphql/mutations';
import query from './system-graphql/query';
import SystemBuilder from './SystemBuilder/SystemBuilder';
import SystemInfo from './SystemInfo/SystemInfo';

const subroutes = {
    SystemBuilder,
    DetailBuilder,
    SystemInfo,
};

// this is for rendering the correct name in the sidebar
System.navigationOptions = ({
    location: {
        search,
        pathname,
    },
}) => ({
    requiredURLParams: ["manufacturerId", "systemId"],
    subroutes,
    path: "/system",
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
                fetchPolicy: "no-cache",
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
            }) => {
                const { systemId, manufacturerId: mnfgId } = parseSearch(search);
                return (
                    loading ?
                        <Ellipsis />
                        :
                        systemId === 'null' ?
                            "New System"
                            :
                            `${manufacturerId}` === mnfgId ?
                                normalCase(name)
                                :
                                <Redirect
                                    to={`${pathname}${parseSearch(search).update({ manufacturerId })}`}
                                />
                );
            }}
        </ApolloWrapper>
    ),
});

export default function System({
    location: {
        search,
    },
}) {

    const { manufacturerId, systemId, sampleSystem } = parseSearch(search);

    const _sampleSystem = SAMPLE_SYSTEMS[sampleSystem];

    const [fetchQuery, qr, fetching] = useQuery({ query, variables: { id: +systemId || 0 } });

    const { _system } = qr;

    const queryResult = {
        ...qr,
        _system: _sampleSystem || _system,
    };

    const [updateEntireSystem, updateStatus, updating] = useMutation(updateEntireSystemMutation, fetchQuery);

    const {
        currentState: systemInput,
        pushState,
        replaceState,
        resetState,
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

    const save = useSaveOnCtrlS(async () => {
        dispatch(() => systemUpdate);
        try {
            const systemPayload = {
                ...cleanSystemInput(systemInput, system),
                manufacturerId: +manufacturerId,
            };
            console.log({ systemPayload });
            const result = await updateEntireSystem({ system: systemPayload });
            console.log({ result });
            resetState(systemUpdate);
            return result;
        } catch (err) {
            console.error(err);
            dispatch(() => systemInput);
        }
    });

    // console.log({
    //     system,
    //     systemMap,
    //     systemInput,
    // });

    return (
        <Navigator
            routes={subroutes}
            routeProps={{
                queryResult,
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
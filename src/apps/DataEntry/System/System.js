import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { SystemMap } from '../../../app-logic/system-utils';
import * as SAMPLE_SYSTEMS from '../../../app-logic/__test__/sample-systems';
import { ApolloWrapper, Ellipsis, Navigator, useMutation, useQuery, useRedoableState } from '../../../components';
import { parseSearch } from '../../../utils';
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
                                name
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

    const [fetchQuery, queryResult, fetching] = useQuery({ query, variables: { id: +systemId || 0 } });

    const [updateEntireSystem, updateStatus, updating] = useMutation(updateEntireSystemMutation, fetchQuery);

    const {
        currentState: systemInput,
        pushState,
        replaceState,
        resetState,
    } = useRedoableState(systemUpdate);

    const { _system } = queryResult;

    const _sampleSystem = SAMPLE_SYSTEMS[sampleSystem];

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
    };

    useEffect(() => {
        const saveOnCtrlS = e => {
            const { key, ctrlKey, metaKey } = e;
            if (key.match(/^s$/i) && (ctrlKey || metaKey)) {
                e.preventDefault();
                save();
            }
        }
        window.addEventListener('keydown', saveOnCtrlS);
        return () => window.removeEventListener('keydown', saveOnCtrlS);
    }, [save]);

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
                    _system: _sampleSystem || _system,
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

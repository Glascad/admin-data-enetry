import { useState, useEffect, useCallback } from 'react';

import client from '../../apollo-config';

import {
    removeNullValues,
    flattenNodeArrays,
    replaceByKeys,
} from '../../utils';

import useMountTracker from './use-mount-tracker';

const normalizeResponse = ({ data }) => removeNullValues(
    flattenNodeArrays(
        replaceByKeys(
            data,
        ),
    ),
) || {};

export function useMutation(mutation, fetchQuery = () => { }) {

    const tracker = useMountTracker();

    const [mutationResult, setMutationResult] = useState({});
    const [loading, setLoading] = useState(false);

    const mutate = async variables => {

        setLoading(true);

        try {

            const response = await client.mutate({
                variables,
                ...mutation,
            });

            const normalResponse = normalizeResponse(response);

            // tracker.ifStillMounted(() => {
            setLoading(false);

            setMutationResult(normalResponse);

            fetchQuery();
            // });

            return normalResponse;

        } catch (err) {
            console.trace(mutation);
            console.log({ err });
            setLoading(false);
            throw err;
        }
    }

    return [mutate, mutationResult, loading];
}

export function useQuery(query, doNotFetchOnMount = false) {

    const tracker = useMountTracker();

    const [queryResult, setQueryResult] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchQuery = async variables => {

        console.log("FETCHING QUERY");
        console.log({ query, variables });

        setLoading(true);

        try {

            const response = await client.query(variables ? { ...query, variables } : query);

            console.log({
                response,
                variables,
                query,
            });

            const normalResponse = normalizeResponse(response);

            // tracker.ifStillMounted(() => {
            setLoading(false);

            setQueryResult(normalResponse);
            // });

            return normalResponse;

        } catch (err) {
            // console.trace(query);
            console.log({
                err,
                variables,
                query,
            });
            setLoading(false);
            throw err;
        }

    }

    useEffect(() => {
        if (!doNotFetchOnMount) {
            console.log("FETCHING ON MOUNT");
            fetchQuery();
        }
    }, []);

    return [fetchQuery, queryResult, loading];
}

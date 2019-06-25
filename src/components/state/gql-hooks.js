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
        }
    }

    return [mutate, mutationResult, loading];
}

export function useQuery(query, doNotFetchOnMount = false) {

    const tracker = useMountTracker();

    const [queryResult, setQueryResult] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchQuery = useCallback(async () => {

        setLoading(true);

        try {

            console.log(query);

            const response = await client.query(query);

            const normalResponse = normalizeResponse(response);

            // tracker.ifStillMounted(() => {
            setLoading(false);

            setQueryResult(normalResponse);
            // });

            return normalResponse;

        } catch (err) {
            console.trace(query);
            console.log({ err });
        }

    }, [query]);

    useEffect(() => {
        if (!doNotFetchOnMount) {
            fetchQuery();
        }
    }, []);

    return [fetchQuery, queryResult, loading];
}

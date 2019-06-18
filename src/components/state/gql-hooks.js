import { useState, useEffect, useCallback } from 'react';

import client from '../../apollo-config';

import {
    removeNullValues,
    flattenNodeArrays,
    replaceByKeys,
} from '../../utils';

const normalizeResponse = ({ data }) => removeNullValues(
    flattenNodeArrays(
        replaceByKeys(
            data,
        ),
    ),
) || {};

export function useMutation(mutation, fetchQuery = () => { }) {

    const [mutationResult, setMutationResult] = useState({});
    const [loading, setLoading] = useState(false);

    const mutate = async variables => {

        setLoading(true);

        const response = await client.mutate({
            variables,
            ...mutation,
        });

        setLoading(false);

        const normalResponse = normalizeResponse(response);

        setMutationResult(normalResponse);

        fetchQuery();

        return normalResponse;
    }

    return [mutate, mutationResult, loading];
}

export function useQuery(query, doNotFetchOnMount = false) {

    const [queryResult, setQueryResult] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchQuery = useCallback(async () => {

        setLoading(true);

        const response = await client.query(query);

        setLoading(false);

        const normalResponse = normalizeResponse(response);

        setQueryResult(normalResponse);

        return normalResponse;

    }, []);

    useEffect(() => {
        if (!doNotFetchOnMount) {
            fetchQuery();
        }
    }, []);

    return [fetchQuery, queryResult, loading];
}

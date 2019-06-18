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
    const [mutationPromise, setMutationPromise] = useState();

    const mutate = async variables => {

        const mutationPromise = client.mutate({
            variables,
            ...mutation,
        });

        setMutationPromise(mutationPromise);

        const response = await mutationPromise;

        const normalResponse = normalizeResponse(response);

        setMutationResult(normalResponse);

        fetchQuery();

        return normalResponse;
    }

    return [mutate, mutationResult, mutationPromise];
}

export function useQuery(query, doNotFetchOnMount = false) {

    const [queryResult, setQueryResult] = useState({});
    const [queryPromise, setQueryPromise] = useState();

    const fetchQuery = useCallback(async () => {

        const queryPromise = client.query(query);

        setQueryPromise(queryPromise);

        const response = await queryPromise;

        const normalResponse = normalizeResponse(response);

        setQueryResult(normalResponse);

        return normalResponse;

    }, []);

    useEffect(() => {
        if (!doNotFetchOnMount) {
            fetchQuery();
        }
    }, []);

    return [fetchQuery, queryResult, queryPromise];
}

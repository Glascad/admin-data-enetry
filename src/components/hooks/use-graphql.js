import { useState, useEffect, useCallback } from 'react';

import client from '../../apollo-config';

import { normalizeQueryResponse } from '../../utils';

import useMountTracker from './use-mount-tracker';

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

            const normalResponse = normalizeQueryResponse(response);

            // tracker.ifStillMounted(() => {
            setLoading(false);

            setMutationResult(normalResponse);

            fetchQuery();
            // });

            return normalResponse;

        } catch (err) {
            console.log("ERROR in mutation");
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

        // console.log("FETCHING QUERY");
        // console.log({ query, variables });

        setLoading(true);

        try {

            const response = await client.query(variables ? { ...query, variables } : query);

            // console.log({
            //     response,
            //     variables,
            //     query,
            // });

            const normalResponse = normalizeQueryResponse(response);

            // console.log({ normalResponse });

            // tracker.ifStillMounted(() => {
            setLoading(false);

            setQueryResult(normalResponse);
            // });

            return normalResponse;

        } catch (err) {
            // console.trace(query);
            console.log("ERROR in query");
            console.log({
                err,
                variables,
                query,
            });

            const {
                networkError: {
                    result: {
                        errors = [],
                    } = {},
                } = {},
            } = err;

            errors.forEach(({ message }) => console.error(message));

            setLoading(false);
            throw err;
        }

    }

    useEffect(() => {
        if (!doNotFetchOnMount) {
            // console.log("FETCHING ON MOUNT");
            fetchQuery();
        }
    }, []);

    return [fetchQuery, queryResult, loading];
}

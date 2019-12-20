import { useEffect, useState } from 'react';
import client from '../../apollo-config';
import { normalizeQueryResponse, removeNullValues } from '../../utils';

export function useMutation(mutation, fetchQuery = () => { }) {

    const [mutationResult, setMutationResult] = useState({});
    const [loading, setLoading] = useState(false);

    const mutate = async (variables, options) => {

        setLoading(true);

        try {

            const response = await client.mutate({
                variables,
                ...options,
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

            const {
                networkError: {
                    result: {
                        errors = [],
                    } = {},
                } = {},
                graphQLErrors = []
            } = removeNullValues(err);

            errors.concat(graphQLErrors).forEach(({ message }) => console.error(message));

            setLoading(false);
            throw err;
        }
    }

    return [mutate, mutationResult, loading];
}

export function useQuery(query, doNotFetchOnMount = false) {

    const [queryResult, setQueryResult] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchQuery = async (variables, options) => {

        // console.log("FETCHING QUERY");
        // console.log({ query, variables });

        setLoading(true);

        try {

            const response = await client.query({
                ...query,
                ...options,
                variables: variables || query.variables,
            });

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
                graphQLErrors = []
            } = removeNullValues(err);

            errors.concat(graphQLErrors).forEach(({ message }) => console.error(message));

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

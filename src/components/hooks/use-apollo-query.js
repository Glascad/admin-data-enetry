import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { normalizeQueryResponse } from "../../utils";
import { useEffect } from "react";

export default (query, options = {}) => {
    const result = useQuery(query, options);

    const { variables } = options;
    const { refetch } = result;

    useEffect(() => {
        console.log("REFETCHING QUERY", variables);
        refetch({ variables });
    }, [query, JSON.stringify(variables)]);

    return normalizeQueryResponse(result);
}

export const useLazyApolloQuery = (query, options = {}) => {
    const [fetch, result] = useLazyQuery(query, options);
    return [
        async (variables = options.variables) => normalizeQueryResponse(await fetch({ variables })),
        normalizeQueryResponse(result),
    ];
}

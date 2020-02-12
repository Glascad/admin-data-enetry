import { useMutation } from "@apollo/react-hooks";
import { normalizeQueryResponse } from "../../utils";

export default (mutation, options = {}) => {
    const [mutate, result] = useMutation(mutation, options);
    return [
        async (variables = options.variables) => normalizeQueryResponse(await mutate({ variables })),
        normalizeQueryResponse(result),
    ];
}

import { cacheExchange } from '@urql/exchange-graphcache';
import { Client, debugExchange, dedupExchange, fetchExchange } from 'urql';
import { map, pipe } from 'wonka';
import { data as schema } from './gql-schema.json';
import { getAuthorization } from './local-storage';
import { normalizeQueryResponse } from './utils/index.js';

export default new Client({
    url: `${process.env.REACT_APP_BASE_URL}/graphql`,
    schema,
    fetchOptions: () => ({
        headers: {
            authorization: getAuthorization(),
        },
    }),
    exchanges: [
        dedupExchange,
        debugExchange,
        ({ forward }) => ops$ => pipe(
            ops$,
            forward,
            map(operation => ({
                ...operation,
                data: normalizeQueryResponse(operation, console.log(operation)),
            })),
        ),
        cacheExchange({}),
        debugExchange,
        fetchExchange,
    ],
});

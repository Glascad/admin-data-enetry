import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { getAuthorization } from './local-storage';
import { removeNullishValues } from './utils';

export default new ApolloClient({
    link: from([
        setContext(() => ({
            headers: removeNullishValues({
                authorization: getAuthorization(),
            }),
        })),
        onError(({ graphQLErrors, networkError, operation }) => {
            console.error({ graphQLErrors, networkError, operation });
            // send the error to error alert system
        }),
        setContext((request, context) => {
            console.log({ request, context });
            return context;
        }),
        createHttpLink({
            uri: `${process.env.REACT_APP_BASE_URL}/graphql`,
        }),
    ]),
    cache: new InMemoryCache({
        dataIdFromObject: ({ nodeId }) => nodeId || null,
    }),
});

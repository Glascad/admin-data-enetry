import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { removeNullishValues } from '../utils';
import { getAuthorization } from './local-storage';

export default new ApolloClient({
    link: from([
        setContext(() => ({
            headers: removeNullishValues({
                authorization: getAuthorization(),
            }),
        })),
        onError(({ graphQLErrors, networkError }) => {
            console.error({ graphQLErrors, networkError });
            // send the error to error alert system
        }),
        createHttpLink({
            uri: `${process.env.REACT_APP_BASE_URL}/graphql`,
        }),
    ]),
    cache: new InMemoryCache({
        dataIdFromObject: ({ nodeId }) => nodeId || null,
    }),
});

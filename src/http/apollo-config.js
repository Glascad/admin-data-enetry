import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getAuthorization } from './local-storage';


// HTTP LINK

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_BASE_URL}/graphql` });


// MIDDLEWARE

const authMiddleware = new ApolloLink((operation, forward) => {
    const authorization = getAuthorization();
    if (authorization) {
        operation.setContext(({
            headers: {
                authorization,
            },
        }));
    }
    console.log({ operation });
    console.log(operation.getContext());
    return forward(operation);
});


// CACHE

const cache = new InMemoryCache({
    dataIdFromObject: ({ nodeId }) => nodeId || null,
});


// CLIENT

export default new ApolloClient({
    link: ApolloLink.from([
        authMiddleware,
        httpLink,
    ]),
    cache,
});

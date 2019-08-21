import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';


// LOCALSTORAGE

export const STORAGE_KEYS = {
    JWT: "JSON-Web-Token",
    RECENT_ACTIVITY: "Recent-Activity",
};

const getJWT = () => {
    const JWT = localStorage.getItem(STORAGE_KEYS.JWT);
    return JWT ? `Bearer ${JWT}` : "";
}


// HTTP LINK

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_BASE_URL}/graphql` });


// MIDDLEWARE

const authMiddleware = new ApolloLink((operation, forward) => {
    const authorization = getJWT();
    if (authorization) {
        operation.setContext(({
            headers: {
                authorization,
            },
        }));
    }
    return forward(operation);
});


// CACHE

const cache = new InMemoryCache({
    dataIdFromObject: ({ nodeId }) => nodeId || null,
});


// CLIENT

const client = new ApolloClient({
    link: ApolloLink.from([
        authMiddleware,
        httpLink,
    ]),
    cache,
});


// EXPORT

export default client;

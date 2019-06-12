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
  console.log({ JWT });
  return JWT ? `Bearer ${JWT}` : "";
}


// HTTP LINKS / MIDDLEWARES

const httpLink = new HttpLink({ uri: "/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  console.log('auth middleware');
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

const activityMiddleware = new ApolloLink((operation, forward) => {
  console.log('activity middleware');
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'recent-activity': localStorage.getItem(STORAGE_KEYS.RECENT_ACTIVITY) || null,
    },
  }));
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
    activityMiddleware,
    httpLink,
  ]),
  cache,
});

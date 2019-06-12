import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';


/**

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      movie: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Movie', id });
    }
  }
});

const request = async (operation) => {
  const token = await AsyncStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token
    }
  });
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        logoutUser();
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        isConnected: true
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected }});
            return null;
          }
        }
      },
      cache
    }),
    new HttpLink({
      uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
      credentials: 'include'
    })
  ]),
  cache
});

 */


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
    operation.setContext(({
        headers: {
            authorization: getJWT(),
        },
    }));
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
    // link: ApolloLink.from([
    //     authMiddleware,
    //     activityMiddleware,
    //     httpLink,
    // ]),
    link: authMiddleware.concat(httpLink),
    cache,
});

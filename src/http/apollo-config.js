import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getAuthorization } from './local-storage';
import { normalizeQueryResponse } from '../utils';


// HTTP LINK

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_BASE_URL}/graphql` });


// DATA NORMALIZATION

// const normalMiddleware = new ApolloLink((operation, forward) => {
//     const observer = forward(operation).map(response => ({
//         ...response,
//         data: {
//             ...response.data,
//             normalized: normalizeQueryResponse(response),
//         },
//     }));
//     // console.log({ observer, operation, context: operation.getContext() });
//     // observer.subscribe({
//     //     next: result => console.log(result) || normalizeQueryResponse(result),
//     //     error: (...args) => console.log(args),
//     //     complete: (...args) => console.log(args),
//     // });
//     return observer;
// });


// AUTHORIZATION

const authMiddleware = new ApolloLink((operation, forward) => {
    const authorization = getAuthorization();
    if (authorization) {
        operation.setContext(({
            headers: {
                authorization,
            },
        }));
    }
    return forward(operation);
});

/**
(method) Observable<FetchResult<{ [key: string]: any; }, Record<string, any>, Record<string, any>>>
.subscribe(observerOrNext: ((value: FetchResult<{
[key: string]: any;
}, Record<string, any>, Record<string, any>>) => void)
|
ZenObservable.Observer<FetchResult<{
[key: string]: any;
}, Record<string, any>, Record<string, any>>>, error?: (error: any) => void, complete?: () => void): ZenObservable.Subscription
 */


// CACHE

const cache = new InMemoryCache({
    dataIdFromObject: ({ nodeId }) => nodeId || null,
});


// CLIENT

export default new ApolloClient({
    link: ApolloLink.from([
        authMiddleware,
        // normalMiddleware,
        httpLink,
    ]),
    cache,
});

import React from 'react';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

import {
    CheatSheet,
    Navigator,
} from './components';

import './App.scss';

import dataEntryRoutes from './data-entry/routes';
import glascadRoutes from './glascad/routes';

import Statics from './Statics/Statics';

const cache = new InMemoryCache({
    dataIdFromObject: ({ nodeId }) => nodeId || null,
});

const client = new ApolloClient({
    uri: 'http://localhost:5001/graphql',
    cache,
});

export default function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <CheatSheet>
                    <Navigator
                        routes={{
                            DataEntry: () => <Statics baseURL="/data-entry" routes={dataEntryRoutes} />,
                            Glascad: () => <Statics baseURL="/glascad" routes={glascadRoutes} />,
                        }}
                    />
                </CheatSheet>
            </ApolloProvider>
        </Router>
    );
}

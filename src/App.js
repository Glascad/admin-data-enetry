import React from 'react';

import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router } from 'react-router-dom';

import { Navigator } from './components';

import DataEntry from './applications/DataEntry/DataEntry';
import Glascad from './applications/GlasCAD/GlasCAD';

const cache = new InMemoryCache({
    dataIdFromObject: ({ nodeId }) => nodeId || null,
});

const client = new ApolloClient({
    // CANNOT DESTRUCTURE PROCESS
    uri: process.env.REACT_APP_BASE_URL || 'http://localhost:5001/graphql',
    cache,
});

export default function App() {
    return (
        <>
            {navigator && navigator.userAgent && navigator.userAgent.match(/Linux/ig) ? (
                <style>
                    {`input, button { padding-top: 4px }`}
                </style>
            ) : null}
            <Router>
                <ApolloProvider client={client}>
                    <Navigator
                        routes={{
                            DataEntry,
                            Glascad,
                        }}
                    />
                </ApolloProvider>
            </Router>
        </>
    );
}

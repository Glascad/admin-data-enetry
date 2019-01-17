import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

import { CheatSheet } from './components';

import './App.scss';

import Sidebar from './statics/Sidebar/Sidebar';
import Viewport from './statics/Viewport/Viewport';

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
                    <Sidebar />
                    <Viewport />
                </CheatSheet>
            </ApolloProvider>
        </Router>
    );
}

import React from 'react';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

import Header from './statics/Header/Header';
import Sidebar from './statics/Sidebar/Sidebar';
import Viewport from './statics/Viewport/Viewport';

const cache = new InMemoryCache({
    dataIdFromObject: ({ nodeId, id }) => nodeId || id || null,
});

const client = new ApolloClient({
    uri: 'http://localhost:5001/graphql',
    cache,
});

export default function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <div />
                <Header />
                <Sidebar />
                <Viewport />
            </ApolloProvider>
        </Router>
    );
}

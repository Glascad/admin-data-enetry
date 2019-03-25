import React from 'react';

import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router } from 'react-router-dom';

import {
    // CheatSheet,
    Navigator,
} from './components';

import DataEntry from './DataEntry/DataEntry';
import Glascad from './GlasCAD/GlasCAD';

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
                {/* <CheatSheet> */}
                <Navigator
                    routes={{
                        DataEntry,
                        Glascad,
                    }}
                />
                {/* </CheatSheet> */}
            </ApolloProvider>
        </Router>
    );
}

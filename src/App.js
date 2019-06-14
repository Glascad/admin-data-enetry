import React from 'react';

import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router } from 'react-router-dom';

import AppNavigator from './Applications/AppNavigator';

import client from './apollo-config';

export default () => (
    <Router>
        <ApolloProvider client={client}>
            <AppNavigator />
        </ApolloProvider>
    </Router>
);

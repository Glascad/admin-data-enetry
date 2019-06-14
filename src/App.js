import React from 'react';

import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router } from 'react-router-dom';

import AuthenticationProvider from './Applications/Authentication/Authentication';

import AppNavigator from './Applications/AppNavigator';

import client from './apollo-config';

export default () => (
    <Router>
        <ApolloProvider client={client}>
            <AuthenticationProvider>
                <AppNavigator />
            </AuthenticationProvider>
        </ApolloProvider>
    </Router>
);

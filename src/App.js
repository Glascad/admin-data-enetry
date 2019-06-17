import React from 'react';

import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router } from 'react-router-dom';

import AuthenticationProvider from './Applications/Authentication/Authentication';

import AppNavigator from './Applications/AppNavigator';

import client from './apollo-config';

// import { CheatSheet } from './components';

export default function App() {
    return (
        // <CheatSheet>
        <Router>
            <ApolloProvider client={client}>
                <AuthenticationProvider>
                    <AppNavigator />
                </AuthenticationProvider>
            </ApolloProvider>
        </Router>
        // </CheatSheet>
    );
}
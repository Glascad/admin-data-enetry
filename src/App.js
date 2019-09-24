import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './auth-context';
import AppNavigator from './apps/AppNavigator';
import client from './apollo-config';

// import { CheatSheet } from './components';

export default function App() {
    return (
        // <CheatSheet>
        <Router>
            <ApolloProvider client={client}>
                <AuthProvider>
                    <AppNavigator />
                </AuthProvider>
            </ApolloProvider>
        </Router>
        // </CheatSheet>
    );
}
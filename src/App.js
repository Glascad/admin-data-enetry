import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as URQLProvider } from 'urql';
import apolloClient from './apollo-config';
import AppNavigator from './apps/AppNavigator';
import AuthProvider from './AuthContext';
import URQLClient from './urql-config';

// import { CheatSheet } from './components';

export default function App() {
    return (
        // <CheatSheet>
        <Router>
            <ApolloProvider client={apolloClient}>
                <URQLProvider value={URQLClient}>
                    <AuthProvider>
                        <AppNavigator />
                    </AuthProvider>
                </URQLProvider>
            </ApolloProvider>
        </Router>
        // </CheatSheet>
    );
}
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppNavigator from './apps/AppNavigator';
import apolloClient from './http/apollo-client';
import AuthProvider from './http/authentication/AuthContext';

export default function App() {
    return (
        <BrowserRouter>
            <ApolloProvider client={apolloClient}>
                <AuthProvider>
                    <AppNavigator />
                </AuthProvider>
            </ApolloProvider>
        </BrowserRouter>
    );
}

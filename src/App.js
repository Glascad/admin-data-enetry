import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import AppNavigator from './apps/AppNavigator';
import apolloClient from './http/apollo-config';
import AuthProvider from './http/AuthContext';

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

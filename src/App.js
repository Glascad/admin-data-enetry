import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'urql';
import AppNavigator from './apps/AppNavigator';
import apolloClient from './http/apollo-config';
import AuthProvider from './http/AuthContext';
// import URQLClient from './http/urql-config';

export default function App() {
    return (
        <BrowserRouter>
            <ApolloProvider client={apolloClient}>
                {/* <Provider value={URQLClient}> */}
                <AuthProvider>
                    <AppNavigator />
                </AuthProvider>
                {/* </Provider> */}
            </ApolloProvider>
        </BrowserRouter>
    );
}

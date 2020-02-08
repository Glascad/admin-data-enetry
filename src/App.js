import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import apolloClient from './apollo-client';
import Authentication from './apps/Authentication/Authentication';

export default function App() {
    return (
        <BrowserRouter>
            <ApolloProvider client={apolloClient}>
                <Authentication />
            </ApolloProvider>
        </BrowserRouter>
    );
}

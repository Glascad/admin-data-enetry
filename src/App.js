import React from 'react';

import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router } from 'react-router-dom';

import ApplicationNavigator from './Applications/ApplicationNavigator';

import client from './apollo-config';

export default () => (
    <Router>
        <ApolloProvider client={client}>
            <ApplicationNavigator />
        </ApolloProvider>
    </Router>
);

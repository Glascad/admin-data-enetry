import React from 'react';

import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router } from 'react-router-dom';

import { Navigator } from './components';

import Authentication from './applications/Authentication/Authentication';
import DataEntry from './applications/DataEntry/DataEntry';
import Glascad from './applications/GlasCAD/GlasCAD';

import client from './apollo-config';

export default function App() {
    return (
        <>
            {navigator && navigator.userAgent && navigator.userAgent.match(/Linux/ig) ? (
                <style>
                    {`input, button { padding-top: 4px }`}
                </style>
            ) : null}
            <Router>
                <ApolloProvider client={client}>
                    <Navigator
                        routes={{
                            Authentication,
                            DataEntry,
                            Glascad,
                        }}
                    />
                </ApolloProvider>
            </Router>
        </>
    );
}

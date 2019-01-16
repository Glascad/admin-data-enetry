import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

import Sidebar from './statics/Sidebar/Sidebar';
import Viewport from './statics/Viewport/Viewport';

const cache = new InMemoryCache({
    dataIdFromObject: ({ nodeId }) => nodeId || null,
});

const client = new ApolloClient({
    uri: 'http://localhost:5001/graphql',
    cache,
});

export default class App extends Component {
    render = () => {
        return (
            <Router>
                <ApolloProvider client={client}>
                    <Sidebar />
                    <Viewport />
                    <button
                        className="cheat-sheet-button"
                        onClick={() => {
                            const wcs = "with-cheat-sheet";
                            const body = document.querySelector("body");
                            const { className } = body;
                            if (className.includes(wcs)) {
                                body.className = className.replace(wcs, "");
                            } else {
                                body.className = `${className} ${wcs}`
                            }
                        }}
                    >
                        CHEAT
                        </button>
                </ApolloProvider>
            </Router>
        );
    }
}

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

import Header from './statics/Header/Header';
import Sidebar from './statics/Sidebar/Sidebar';
// import Viewport from './statics/Viewport/Viewport';

const client = new ApolloClient({
    uri: 'http://1227.0.0.1:5001/graphql'
});

export default function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <Header />
                <Sidebar />
                {/* <Viewport /> */}
            </ApolloProvider>
        </Router>
    );
}

import React from 'react';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import { graphql, ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://127.0.0.1:5001/graphql'
});

function App({ data }) {
    console.log(data);
    return (
        <div className="App">
            APP
        </div>
    );
}

export default function () {
    const Component = graphql(gql`
        query MnfgQuery{
            allManufacturers{
                nodes{
                    id
                    name
                }
            }
        }
        `,
        {
            options: {},
            props: {},
            skip: false,
            name: 'the name of the graphql query to be used on props'
        })(App);
    return (
        <ApolloProvider client={client}>
            <Component />
        </ApolloProvider>
    );
};

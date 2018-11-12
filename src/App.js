import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
    uri: 'http://127.0.0.1:5001/graphql'
})

export default function App() {
    return (
        <ApolloProvider client={client}>
            <Query query={gql`
                {
                    allManufacturers{
                        nodes{
                            id
                            name
                        }
                    }
                }
            `}>
                {({ loading, error, data }) => (
                    (loading ?
                        <p>...LOADING...</p>
                        :
                        error ?
                            <p>ERROR: {error.toString()}</p>
                            :
                            <p>DATA: {JSON.stringify(data)}</p>
                ))}
            </Query>
        </ApolloProvider>
    );
}

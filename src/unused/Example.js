import React from 'react';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Pill from './components/Pill/Pill';
import Dropdown from './components/Dropdown/Dropdown';

const client = new ApolloClient({
    uri: 'http://127.0.0.1:5001/graphql'
});

let input = '';

export default function Example() {
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
            <Mutation mutation={gql`
                mutation AddMnfg($name: String!){
                    createManufacturer(input: {
                        manufacturer: { name: $name }
                    }){
                        manufacturer{
                            id
                            name
                        }
                    }
                }
            `}>
                {(addMnfg, { loading, error, data }) => (
                    (loading ?
                        <p>...SENDING...</p>
                        :
                        error ?
                            <p>Error: {error.toString()}</p>
                            :
                            <div>
                                <p>Add a Manufacturer</p>
                                <input onChange={({ target: { value } }) => input = value} />
                                <button onClick={() => addMnfg({ variables: { name: input } })}>SUBMIT</button>
                            </div>
                    )
                )}
            </Mutation>
            <Dropdown
                title="DROPDOWN"
                content="YEAH"
            />
            <Pill
                title="PILL"
                editable
                deletable
                onSelect={e => console.log('select', e)}
                onDelete={e => console.error('delete', e)}
                onEdit={e => console.warn('edit', e)}
            />
        </ApolloProvider>
    );
}

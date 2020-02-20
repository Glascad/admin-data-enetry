import { ApolloConsumer } from '@apollo/react-components';
import React from 'react';

export default function withApolloContext(ReactComponent) {
    return function ApolloComponent(props) {
        return (
            <ApolloConsumer>
                {apolloClient => (
                    <ReactComponent
                        {...props}
                        apolloClient={apolloClient}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

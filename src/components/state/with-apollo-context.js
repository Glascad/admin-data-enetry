import React from 'react';

import { ApolloConsumer } from 'react-apollo';

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

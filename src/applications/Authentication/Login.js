import React, { useState } from 'react';

import { ApolloWrapper, Input } from '../../components';
import gql from 'graphql-tag';
import { STORAGE_KEYS } from '../../apollo-config';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ApolloWrapper
            query={{
                query: gql`{ userId: getCurrentUserId }`,
            }}
            mutations={{
                authenticate: {
                    mutation: gql`mutation Authenticate($username: String!, $password: String!) {
                        authenticate(
                            input: {
                                username: $username
                                password: $password
                            }
                        ) {
                            jwt
                        }
                    }`,
                    variables: {
                        username,
                        password,
                    },
                },
            }}
        >
            {({
                rawQueryStatus,
                rawQueryStatus: {
                    data: {
                        userId,
                    } = {},
                    refetch,
                },
                mutations: {
                    authenticate,
                },
            }) => (
                    <div className="card">
                        {console.log({ userId })}
                        <Input
                            label="username"
                            value={username}
                            onChange={({ target: { value } }) => setUsername(value)}
                        />
                        <Input
                            label="password"
                            type="password"
                            value={password}
                            onChange={({ target: { value } }) => setPassword(value)}
                        />
                        <button
                            className="action"
                            onClick={async () => {
                                const {
                                    data: {
                                        authenticate: {
                                            jwt,
                                        },
                                    },
                                } = await authenticate();

                                localStorage.setItem(STORAGE_KEYS.JWT, jwt);

                                console.log({ jwt });

                                const { data: { userId } } = await refetch();

                                console.log({ userId });
                            }}
                        >
                            Login
                        </button>
                    </div>
                )}
        </ApolloWrapper>
    );
}

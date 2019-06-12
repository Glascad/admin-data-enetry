import React, { useState } from 'react';

import { ApolloWrapper, Input, TitleBar } from '../../components';
import gql from 'graphql-tag';
import { STORAGE_KEYS } from '../../apollo-config';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ApolloWrapper
            query={{
                query: gql`{ 
                    currentUser: getCurrentUser {
                        id
                        username
                    }
                }`,
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
                        currentUser,
                    } = {},
                    refetch,
                },
                mutations: {
                    authenticate,
                },
            }) => (
                    <div className="floating card">
                        {console.log({ currentUser })}
                        <TitleBar
                            title="Login"
                        />
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
                        <div className="bottom-buttons">
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

                                    console.log({ jwt });

                                    if (jwt) {
                                        localStorage.setItem(STORAGE_KEYS.JWT, jwt);
                                    }

                                    const { data: { currentUser } } = await refetch();

                                    console.log({ currentUser });
                                }}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}
        </ApolloWrapper>
    );
}

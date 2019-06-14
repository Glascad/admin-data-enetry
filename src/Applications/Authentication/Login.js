import React, {
    useState,
    useEffect,
} from 'react';

import gql from 'graphql-tag';

import {
    ApolloWrapper,
    Input,
    TitleBar,
    withContext,
} from '../../components';

import { StaticContext } from '../Statics/Statics';

import LoginSplash from '../../assets/images/Login Splash.jpeg';

import { STORAGE_KEYS } from '../../apollo-config';

import './Login.scss';

console.log({ LoginSplash });

function Login({
    context,
    context: {
        Viewport,
        sidebar: {
            toggle,
        },
    },
}) {

    console.log({ context });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        toggle(false);
        return () => toggle(true);
    }, []);

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
                queryStatus: {
                    currentUser,
                },
                rawQueryStatus: {
                    refetch,
                },
                mutations: {
                    authenticate,
                },
            }) => (
                    <>
                        <img
                            id="login-splash"
                            src={LoginSplash}
                        />
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
                    </>
                )}
        </ApolloWrapper>
    );
}

export default withContext(StaticContext)(Login);

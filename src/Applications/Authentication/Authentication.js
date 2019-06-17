import React, { createContext, useState } from 'react';

import gql from 'graphql-tag';

import F from '../../schema';

import { STORAGE_KEYS } from '../../apollo-config';

import { ApolloWrapper } from '../../components';

export const AuthenticationContext = createContext();

const query = {
    query: gql`{...CurrentUser} ${F.AUTH.CURRENT_USER}`,
    fetchPolicy: 'no-cache',
};

export default function AuthenticationProvider({ children }) {
    return (
        <ApolloWrapper
            query={query}
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
                },
            }}
        >
            {({
                queryStatus: {
                    currentUser = {},
                    currentUser: {
                        role,
                    } = {},
                },
                rawQueryStatus,
                rawQueryStatus: {
                    loading,
                    refetch,
                    client,
                    client: {
                        cache,
                    },
                },
                mutations: {
                    authenticate,
                    authenticateStatus: {
                        loading: loggingIn,
                    },
                },
            }) => {

                const authenticating = loggingIn || (loading && localStorage.getItem(STORAGE_KEYS.JWT));

                console.log({ rawQueryStatus });
                console.log({ client });

                const login = async ({ username, password }) => {
                    console.log(`logging in: ${username}`);

                    const {
                        data: {
                            authenticate: {
                                jwt,
                            },
                        },
                    } = await authenticate({ username, password });

                    console.log({ jwt });

                    if (jwt) localStorage.setItem(STORAGE_KEYS.JWT, jwt);

                    // const refetchedResult = await client.query(query);

                    // console.log({ refetchedResult });

                    // await client.resetStore();

                    console.log("logged in");
                }

                const logout = async () => {
                    console.log(`logging out: ${currentUser.username}`);

                    localStorage.setItem(STORAGE_KEYS.JWT, '');

                    await refetch();

                    // try {
                    //     client.clearStore();
                    // } catch (err) {
                    //     console.error(`Error clearing store: trying again`);
                    //     try {
                    //         client.clearStore();
                    //     } catch (err) {
                    //         console.error(`Error clearing store: ${err}`);
                    //     }
                    // }
                }

                console.log({ currentUser });

                return (
                    <AuthenticationContext.Provider
                        value={{
                            currentUser,
                            authenticating,
                            authenticate,
                            login,
                            logout,
                        }}
                    >
                        {children}
                    </AuthenticationContext.Provider>
                );
            }}
        </ApolloWrapper>
    );
}

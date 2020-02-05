import gql from 'graphql-tag';
import React, { createContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useApolloMutation, useApolloQuery } from '../components';
import { CURRENT_USER } from '../schemas/authentication';
import client from './apollo-config';
import { STORAGE_KEYS } from './local-storage';

export const AuthContext = createContext();

const query = gql`{ ...CurrentUser } ${CURRENT_USER}`;

const mutation = gql`
    mutation Authenticate($username: String!, $password: String!) {
        authenticate(
            input: {
                username: $username
                password: $password
            }
        ) {
            jwt
        }
    }
`;

function AuthProvider({
    children,
    history,
    location: {
        search,
        pathname,
    },
}) {

    const [originalLocation, setOriginalLocation] = useState(`${pathname}${search}`);
    const queryResult = useApolloQuery(query, { fetchPolicy: 'no-cache' });
    const [authenticate, { loading }] = useApolloMutation(mutation, { fetchPolicy: 'no-cache' });

    const {
        currentUser = {},
        currentUser: {
            id: currentUserId,
        } = {},
        __raw: {
            refetch,
        },
    } = queryResult;

    const getCurrentUser = async () => {
        try {
            const result = await refetch();
            console.log({ result });
            const { currentUser: { id } = {} } = result || {};
            // console.log({ originalLocation });
            if (id) {
                history.push(
                    originalLocation.match(/\/(glascad|data-entry)/) ?
                        originalLocation
                        :
                        `/glascad`
                );
            } else {
                console.log('No Current User');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const authenticating = localStorage.getItem(STORAGE_KEYS.JWT) ?
        !currentUserId
        :
        loading;

    const login = async ({ username, password }) => {
        try {
            const {
                authenticate: {
                    jwt,
                },
            } = await authenticate({ username, password });

            if (jwt) localStorage.setItem(STORAGE_KEYS.JWT, jwt);

        } catch (err) {
            console.error("ERROR AUTHENTICATING");
            console.log({ err });
        }

        return getCurrentUser();
    };

    const logout = async () => {

        localStorage.clear();

        await client.clearStore();

        setOriginalLocation('');

        return getCurrentUser();
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                authenticating,
                authenticate,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default withRouter(AuthProvider);

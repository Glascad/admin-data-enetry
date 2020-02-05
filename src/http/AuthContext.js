import gql from 'graphql-tag';
import React, { createContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import client from './apollo-config';
import { useMutation, useQuery } from '../components';
import { STORAGE_KEYS } from './local-storage';
import F from '../schemas';

export const AuthContext = createContext();

const query = {
    query: gql`{ ...CurrentUser } ${F.AUTH.CURRENT_USER}`,
    fetchPolicy: 'no-cache',
};

const mutation = {
    mutation: gql`
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
    `,
};

function AuthProvider({
    children,
    history,
    location: {
        search,
        pathname,
    },
}) {

    const [originalLocation, setOriginalLocation] = useState(`${pathname}${search}`);
    const [fetchQuery, queryResult] = useQuery(query, true);
    const [authenticate, authResult, authPromise] = useMutation(mutation);

    const getCurrentUser = async () => {
        try {
            const result = await fetchQuery();
            // console.log({ result });
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

    useEffect(() => {
        getCurrentUser();
    }, []);

    const authenticating = localStorage.getItem(STORAGE_KEYS.JWT) ?
        (
            !queryResult
            ||
            !queryResult.currentUser
            ||
            !queryResult.currentUser.id
        )
        :
        authPromise;

    const login = async ({ username, password }) => {
        try {
            const {
                authenticate: {
                    jwt,
                },
            } = await authenticate({ username, password });

            if (jwt) localStorage.setItem(STORAGE_KEYS.JWT, jwt);

        } catch (err) {
            // console.log({ err });
        }

        return getCurrentUser();
    };

    const logout = async () => {

        localStorage.clear();

        await client.clearStore();

        setOriginalLocation('');

        return getCurrentUser();
    };

    const { currentUser = {} } = queryResult;

    console.log({ currentUser });

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

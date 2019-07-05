import React, { createContext, useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';

import gql from 'graphql-tag';

import F from '../../schema';

import client, { STORAGE_KEYS } from '../../apollo-config';

import { useQuery, useMutation } from '../../components';
import { parseSearch } from '../../utils';

export const AuthenticationContext = createContext();

const query = {
    query: gql`{...CurrentUser} ${F.AUTH.CURRENT_USER}`,
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

function AuthenticationProvider({
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
            const { currentUser: { projectId } = {} } = result || {};
            console.log({ originalLocation });
            history.push(
                originalLocation.match(/\/(glascad|data-entry)/) ?
                    originalLocation
                    :
                    `/glascad/project/elevations/elevation-search${parseSearch(search).update({ projectId })}`
            );
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

    const { currentUser = {} } = queryResult;

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
}

export default withRouter(AuthenticationProvider);

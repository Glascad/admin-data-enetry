import React, { createContext, useCallback, useEffect } from 'react';

import { withRouter } from 'react-router-dom';

import gql from 'graphql-tag';

import F from '../../schema';

import { STORAGE_KEYS } from '../../apollo-config';

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
    },
}) {

    const [fetchQuery, queryResult, queryThen] = useQuery(query, false);
    const [authenticate, authResult, authThen] = useMutation(mutation);

    const getCurrentUser = async () => {
        const result = await fetchQuery();
        const { currentUser: { projectId } = {} } = result;
        history.push(`/glascad/project/elevations/elevation-search${parseSearch(search).update({ projectId })}`);
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    const authenticating = authThen || (queryThen && localStorage.getItem(STORAGE_KEYS.JWT));

    const login = async ({ username, password }) => {
        const {
            authenticate: {
                jwt,
            },
        } = await authenticate({ username, password });

        localStorage.setItem(STORAGE_KEYS.JWT, jwt);

        return getCurrentUser()
    };

    const logout = () => {
        localStorage.setItem(STORAGE_KEYS.JWT, '');

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

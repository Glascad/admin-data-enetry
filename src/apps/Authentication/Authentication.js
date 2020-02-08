import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { createContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Navigator, useApolloMutation, useApolloQuery } from '../../components';
import { setJwt, STORAGE_KEYS } from '../../local-storage';
import { CURRENT_USER } from '../../schemas/authentication';
import importAppsByRole from '../import-apps-by-role';
import Login from './Login/Login';

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

export default function Authentication() {

    const { search, pathname } = useLocation();
    const history = useHistory();
    const [originalLocation, setOriginalLocation] = useState(`${pathname}${search}`);
    const queryResult = useApolloQuery(query, { fetchPolicy: 'no-cache' });
    const [authenticate, { __raw: { loading } }] = useApolloMutation(mutation, { fetchPolicy: 'no-cache' });
    const [allowedApplications, setAllowedApps] = useState(null);
    const [loadingApps, setLoadingApps] = useState(false);

    const {
        currentUser = {},
        currentUser: {
            id: currentUserId,
        } = {},
        __raw: {
            refetch,
        },
    } = queryResult;

    const client = useApolloClient();

    const authenticating = loadingApps || (
        localStorage.getItem(STORAGE_KEYS.JWT) ?
            !currentUserId
            :
            loading
    );

    const getCurrentUser = async () => {
        setLoadingApps(true);
        return refetch()
            .then(({ currentUser: { role = '', id } = {} } = {}) => importAppsByRole(role)
                .then(setAllowedApps)
                .then(() => setLoadingApps(false))
                .then(() => id ?
                    history.push(originalLocation.match(/\/(glascad|data-entry)/) ?
                        originalLocation
                        :
                        `/glascad`
                    ) : console.log('No current user'))
            );
    }

    const login = ({ username, password }) => authenticate({ username, password })
        .then(({ authenticate: { jwt } }) => setJwt(jwt))
        .then(() => getCurrentUser());

    const logout = () => client.clearStore()
        .then(() => localStorage.clear())
        .then(() => setOriginalLocation(''))
        .then(() => getCurrentUser());

    useEffect(() => {
        getCurrentUser();
    }, []);

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
            {allowedApplications ? (
                <Navigator
                    routeProps={{ allowedApplications }}
                    routes={allowedApplications}
                />
            ) : (
                    <Login />
                )}
        </AuthContext.Provider>
    );
}

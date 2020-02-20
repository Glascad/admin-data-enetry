import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import importAllowedApps from '../apps/import-allowed-apps';
import { Navigator, useApolloMutation, useApolloQuery } from '../components';
import { getAuthorization, setJwt } from '../local-storage';
import { CURRENT_USER } from '../schemas/authentication';
import { asyncPipe, tap } from '../utils';
import Login from './Login/Login';

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

    const {
        currentUser,
        currentUser: {
            role,
        } = {},
        __raw: {
            refetch,
        }
    } = useApolloQuery(query, { fetchPolicy: 'no-cache' });

    const [authenticate] = useApolloMutation(mutation, { fetchPolicy: 'no-cache' });

    const [authenticating, setAuthenticating] = useState(!!getAuthorization());

    const [allowedApplications, setAllowedApps] = useState(null);

    const client = useApolloClient();

    useEffect(() => {
        setAllowedApps(null);
        asyncPipe(
            importAllowedApps(role),
            tap(setAllowedApps),
            apps => apps && setAuthenticating(false),
        );
    }, [role]);

    const login = ({ username, password }) => asyncPipe(
        setAuthenticating(true),
        () => authenticate({ username, password }),
        ({ authenticate: { jwt } }) => setJwt(jwt),
        refetch,
    );

    const logout = () => asyncPipe(
        setAuthenticating(false),
        () => client.clearStore(),
        () => localStorage.clear(),
        refetch,
    );

    return allowedApplications ? (
        <Navigator
            routeProps={{
                allowedApplications,
                currentUser,
                logout,
            }}
            routes={allowedApplications}
        />
    ) : (
            <Login
                {...{
                    login,
                    authenticating,
                    logout,
                }}
            />
        );
}

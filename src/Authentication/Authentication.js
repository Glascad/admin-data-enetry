import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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

    const history = useHistory();
    const { search, pathname } = useLocation();
    const [originalLocation, setOriginalLocation] = useState(`${pathname}${search}`);
    const queryResult = useApolloQuery(query, { fetchPolicy: 'no-cache' });
    const [authenticate, authenticationResult] = useApolloMutation(mutation, { fetchPolicy: 'no-cache' });
    const [allowedApplications, setAllowedApps] = useState(null);
    const [importingApps, setImportingApps] = useState(false);

    const {
        currentUser,
        __raw: {
            refetch,
            loading: fetchingCurrentUser,
        },
    } = queryResult;

    const {
        __raw: {
            loading: loggingIn,
        },
    } = authenticationResult;

    const client = useApolloClient();

    const authenticating = (
        importingApps
        ||
        loggingIn
        ||
        (
            getAuthorization()
            &&
            fetchingCurrentUser
        )
    );

    console.log({
        importingApps,
        loggingIn,
        fetchingCurrentUser,
        authenticating,
        currentUser,
        allowedApplications,
    });

    const rerouteToOriginalLocation = () => history.push(originalLocation.match(/\/(glascad|data-entry)/) ?
        originalLocation
        :
        `/glascad`
    );

    const getCurrentUser = async () => asyncPipe(
        refetch(),
        tap(() => setImportingApps(true)),
        ({ currentUser: { role = '', id } = {} } = {}) => asyncPipe(
            importAllowedApps(role),
            setAllowedApps,
            id ? rerouteToOriginalLocation : () => console.log('unauthorized')
        ),
        () => setImportingApps(false),
    );

    const login = ({ username, password }) => asyncPipe(
        authenticate({ username, password }),
        ({ authenticate: { jwt } }) => setJwt(jwt),
        getCurrentUser,
    );

    const logout = () => asyncPipe(
        client.clearStore(),
        () => localStorage.clear(),
        () => setOriginalLocation(''),
        getCurrentUser,
    );

    useEffect(() => {
        getCurrentUser();
    }, []);

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

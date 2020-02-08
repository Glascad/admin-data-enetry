import React, { useContext, useEffect, useState } from 'react';
import { Navigator } from '../components';
import { AuthContext } from '../http/authentication/AuthContext';
import getAllowedApplications from '../http/authentication/get-allowed-applications';
import Login from '../http/authentication/Login/Login';
import wrapApplications from '../http/authentication/wrap-applications';

export default function AppNavigator() {
    const {
        currentUser: {
            role = '',
        },
    } = useContext(AuthContext);

    const [allowedApplications, setAllowedApplications] = useState();
    const [loading, setLoading] = useState(false);

    const getAndSetApplications = async () => {
        setLoading(true);
        setAllowedApplications(wrapApplications(await getAllowedApplications(role)));
        setLoading(false);
    }

    useEffect(() => {
        getAndSetApplications();
    }, [role]);

    return allowedApplications ? (
        <Navigator
            routeProps={{ allowedApplications }}
            routes={allowedApplications}
        />
    ) : (
            <Login loading={loading} />
        );
}

import React, { useContext } from 'react';
import { Navigator } from '../components';
import { AuthContext } from '../http/AuthContext';
import { match } from '../utils';
import DataEntry from './DataEntry/DataEntry';
import Glascad from './GlasCAD/GlasCAD';
import Login from './Login/Login';

export default function AppNavigator() {
    const {
        currentUser: {
            role = '',
        },
    } = useContext(AuthContext);

    const allowedApplications = match(role)
        .regex(/admin/i, { DataEntry, Glascad })
        .regex(/data.entry/i, { DataEntry })
        .regex(/client/i, { Glascad })
        .otherwise({ Login });
    // .otherwise({
    //     DataEntry,
    //     Glascad,
    //     // Login,
    // });

    return (
        <Navigator
            routeProps={{ allowedApplications }}
            routes={allowedApplications}
        />
    );
}

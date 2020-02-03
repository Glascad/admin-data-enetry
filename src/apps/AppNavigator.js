import React, { Suspense } from 'react';
import { AuthContext } from '../AuthContext';
import { Navigator, withContext } from '../components';
import { match } from '../utils';
import DataEntry from './DataEntry/DataEntry';
// import Practice from './Practice/practice';
import Glascad from './GlasCAD/GlasCAD';
import Login from './Login/Login';

// CONVERT THIS INTO A HOOOK
// const Glascad = lazy(() => import('./GlasCAD/GlasCAD'));
// const DataEntry = lazy(() => import('./DataEntry/data-entry'));

const AppNavigator = ({ allowedApplications }) => (
    <Suspense fallback={<Login />}>
        <Navigator
            routeProps={{ allowedApplications }}
            routes={allowedApplications}
        />
    </Suspense>
);

const mapProps = ({
    context: {
        currentUser: {
            role = '',
        },
    },
}) => ({
    allowedApplications: match(role)
        .regex(/admin/i, { DataEntry, Glascad })
        .regex(/data.entry/i, { DataEntry })
        .regex(/client/i, { Glascad })
        .otherwise({ Login }),
        // .otherwise({
        //     DataEntry,
        //     Glascad,
        //     // Login,
        // }),
});

export default withContext(AuthContext, mapProps)(AppNavigator);
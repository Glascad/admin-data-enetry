import React, { Suspense, lazy } from 'react';

import { AuthenticationContext } from './Authentication/Authentication';

import { withContext, Navigator } from '../components';

import Login from './Authentication/Login';

import Glascad from './GlasCAD/GlasCAD';
import DataEntry from './DataEntry/DataEntry';

// CONVERT THIS INTO A HOOOK
// const Glascad = lazy(() => import('./GlasCAD/GlasCAD'));
// const DataEntry = lazy(() => import('./DataEntry/data-entry'));

const AppNavigator = ({ allowedApplications }) => (
    <Suspense fallback={<Login />}>
        <Navigator routes={allowedApplications} />
    </Suspense>
);

const mapProps = ({
    context: {
        currentUser: {
            role,
        },
    },
}) => ({
    allowedApplications:
        // role === 'ADMIN' ?
        { Glascad, DataEntry }
    // :
    // role === 'DATA_ENTRY' ?
    //     { DataEntry }
    //     :
    //     role === 'CLIENT' ?
    //         { Glascad }
    //         :
    //         { Login },
});

export default withContext(AuthenticationContext, mapProps)(AppNavigator);

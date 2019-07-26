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
            role = '',
        },
    },
}) => ({
    allowedApplications: role.match(/ADMIN/i) ?
        { Glascad, DataEntry }
        :
        role.match(/DATA.ENTRY/i) ?
            { DataEntry }
            :
            role.match(/CLIENT/i) ?
                { Glascad }
                :
                { Login },
});

export default withContext(AuthenticationContext, mapProps)(AppNavigator);

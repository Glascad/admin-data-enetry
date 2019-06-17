import React, { Suspense, lazy } from 'react';

import { AuthenticationContext } from './Authentication/Authentication';

import { withContext, Navigator } from '../components';

import Login from './Authentication/Login';

import Glascad from './GlasCAD/GlasCAD';
import DataEntry from './DataEntry/DataEntry';

// const Glascad = lazy(() => import('./GlasCAD/GlasCAD'));
// const DataEntry = lazy(() => import('./DataEntry/data-entry'));

const AppNavigator = ({ allowedApplications }) => (
    <Suspense fallback={<Login />}>
        <Navigator routes={allowedApplications} />
    </Suspense>
);

// const getAllowedApplications = () => ({ Glascad, DataEntry });

const getAllowedApplications = role => role === 'ADMIN' ?
    { Glascad, DataEntry }
    :
    role === 'DATA_ENTRY' ?
        { DataEntry }
        :
        role === 'CLIENT' ?
            { Glascad }
            :
            { Login };

const mapProps = ({
    context: {
        currentUser: {
            role,
        },
    },
}) => ({
    allowedApplications: getAllowedApplications(role),
});

export default withContext(AuthenticationContext, mapProps)(AppNavigator);

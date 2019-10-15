import React, { Suspense, lazy } from 'react';

import { AuthContext } from '../AuthContext';

import { withContext, Navigator } from '../components';

import Login from './Login/Login';
import Practice from './Practice/Practice';

import Glascad from './GlasCAD/GlasCAD';
import DataEntry from './DataEntry/DataEntry';
import { match } from '../utils';

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
        // .regex(/admin/i, { DataEntry, Glascad })
        // .regex(/data.entry/i, { DataEntry })
        // .regex(/client/i, { Glascad })
        // .otherwise({ Login })
        .otherwise({
            DataEntry,
            Glascad,
        }),
});

export default withContext(AuthContext, mapProps)(AppNavigator);

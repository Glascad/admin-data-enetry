import React, { Suspense, lazy } from 'react';

import { AuthContext } from '../auth-context';

import { withContext, Navigator } from '../components';

import Login from './Login/Login';
import Practice from './Practice/Practice';

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
    allowedApplications:
    {
        // Login,
        DataEntry,
        Glascad,
    }
    // role.match(/admin/i) ?
    //     {
    //         DataEntry,
    //         Glascad,
    //     }
    //     :
    //     role.match(/data.entry/i) ?
    //         {
    //             DataEntry,
    //         }
    //         :
    //         role.match(/client/i) ?
    //             {
    //                 Glascad,
    //             }
    //             :
    //             {
    //                 Login,
    //             },
});

export default withContext(AuthContext, mapProps)(AppNavigator);

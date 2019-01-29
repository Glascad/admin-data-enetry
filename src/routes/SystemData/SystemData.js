import React from 'react';

import {
    Navigator,
} from '../../components';

import SystemSearch from './SystemSearch/SystemSearch';
import NewSystem from './NewSystem/NewSystem';
import SystemToggle from './SystemToggle/SystemToggle';

function SystemDataRouter() {
    return (
        <Navigator
            routes={routes.subroutes}
        />
    );
}

const routes = {
    name: "System Data",
    path: "/system-data",
    component: SystemDataRouter,
    subroutes: [
        {
            name: "System Search",
            path: "/search",
            component: SystemSearch,
        },
        {
            name: "New System",
            path: "/new",
            component: NewSystem,
        },
        ({
            queryStatus: {
                system: {
                    name = '',
                    manufacturer: {
                        name: mnfgName='',
                    }={},
                } = {},
            } = {},
            location: {
                search,
            },
        }) => ({
            name: `${mnfgName} ${name}`,
            path: "/info",
            component: SystemToggle,
        }),
    ],
};

export default routes;

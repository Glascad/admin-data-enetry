import React from 'react';

import {
    Navigator,
} from '../../components';

import SystemSearch from './SystemSearch/SystemSearch';
import NewSystem from './NewSystem/NewSystem';
import SystemToggle from './SystemToggle/SystemToggle';

const path = "/system-data";

function SystemDataRouter() {
    return (
        <Navigator
            parentPath={path}
            routes={[
                {
                    exact: true,
                    path: "/",
                    component: SystemSearch,
                },
                {
                    path: "/new",
                    component: NewSystem,
                },
                {
                    path: "/info",
                    component: SystemToggle,
                },
            ]}
        />
    );
}

export default {
    name: "System Data",
    path,
    component: SystemDataRouter,
};

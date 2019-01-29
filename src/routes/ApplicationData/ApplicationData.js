import React from 'react';

import {
    Navigator,
} from '../../components';

import Manufacturers from './Manufacturers/Manufacturers';
import Types from './Types/Types';
import SystemTags from './SystemTags/SystemTags';
import Parts from './Parts/Parts';
import Lines from './Lines/Lines';
import Infills from './Infills/Infills';

function ApplicationDataRouter() {
    return (
        <Navigator
            routes={routes.subroutes}
        />
    );
}

const routes = {
    name: "Application Data",
    path: '/application-data',
    component: ApplicationDataRouter,
    subroutes: [
        {
            name: "Manufacturers",
            path: "/manufacturers",
            component: Manufacturers,
        },
        {
            name: "Types",
            path: "/types",
            component: Types,
        },
        {
            name: "System Tags",
            path: "/system-tags",
            component: SystemTags,
        },
        {
            name: "Parts",
            path: "/parts",
            component: Parts,
        },
        {
            name: "Infills",
            path: "/infills",
            component: Infills,
        },
        {
            name: "Lines",
            path: "/lines",
            component: Lines,
        },
    ],
};

export default routes;

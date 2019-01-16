import React from 'react';
import {
    Navigator,
} from '../../components';

const path = "/part-data";

const routes = {
    name: "Part Data",
    path,
    component: PartDataRouter,
    subroutes: [
        {
            name: "Part Data",
            path: "/",
            component: PartData,
        },
    ],
};

function PartData() {
    return (
        "Part Data"
    );
}

function PartDataRouter() {
    return (
        <Navigator
            parentPath={path}
            routes={routes.subroutes}
        />
    );
}

export default routes;

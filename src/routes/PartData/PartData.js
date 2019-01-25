import React from 'react';
import {
    Navigator, TitleBar,
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
        <>
            <TitleBar
                title="Part Data"
            />
            <div className="card">
                <Navigator
                    parentPath={path}
                    routes={routes.subroutes}
                />
            </div>
        </>
    );
}

export default routes;

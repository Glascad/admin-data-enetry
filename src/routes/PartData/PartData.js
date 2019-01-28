import React from 'react';
import {
    Navigator, TitleBar,
} from '../../components';

const routes = {
    name: "Part Data",
    path: "/part-data",
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
                    routes={routes.subroutes}
                />
            </div>
        </>
    );
}

export default routes;

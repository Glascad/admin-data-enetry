import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SystemSearch from './SystemSearch/SystemSearch';

import SystemDetails from './SystemDetails/SystemDetails';
import SystemDatabase from './SystemDatabase/SystemDatabase';
import NewSystem from './NewSystem/NewSystem';

export const links = {
    text: "System Data",
    link: "/system-data",
    // subroutes: [
    //     {
    //         text: "Search",
    //         link: "/search",
    //     },
    //     {
    //         text: "SystemDatabase",
    //         link: "/database"
    //     },
    //     {
    //         text: "Details",
    //         link: "/details"
    //     },
    //     {
    //         text: "New",
    //         link: "/new"
    //     }
    // ]
};

export default function SystemRouter() {
    return (
        <Switch>
            <Route
                exact
                path="/system-data"
                component={SystemSearch}
            />
            <Route
                path="/system-data/new"
                component={NewSystem}
            />
            <Route
                path="/system-data/database"
                component={SystemDatabase}
            />
            <Route
                path="/system-data/details"
                component={SystemDetails}
            />
        </Switch>
    );
}

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SystemSearch from './SystemSearch/SystemSearch';
import NewSystem from './NewSystem/NewSystem';
import SystemToggle from './SystemToggle/SystemToggle';

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
                path="/system-data/info"
                component={SystemToggle}
            />
        </Switch>
    );
}

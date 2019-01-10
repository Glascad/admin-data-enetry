import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SystemSearch from './SystemSearch/SystemSearch';

import SystemDetails from './SystemDetails/SystemDetails';
import Database from './Database/Database';
import NewSystem from './NewSystem/NewSystem';

export const links = {
    text: "System",
    link: "/system",
    subroutes: [
        {
            text: "Activity",
            link: "/activity"
        },
        {
            text: "Search",
            link: "/search",
        },
        {
            text: "Database",
            link: "/database"
        },
        {
            text: "Details",
            link: "/system-details"
        },
        {
            text: "New",
            link: "/new"
        }
    ]
};

export default function SystemRouter() {
    return (
        <Switch>
            <Route
                exact
                path="/system/search"
                component={SystemSearch}
            />
            <Route
                path="/system/activity"
                component={() => "System Activity"}
            />
            <Route
                path="/system/database"
                component={Database}
            />
            <Route
                path="/system/details"
                component={SystemDetails}
            />
            <Route
                path="/system/new"
                component={NewSystem}
            />
        </Switch>
    );
}

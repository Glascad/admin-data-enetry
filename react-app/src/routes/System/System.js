import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SelectSystem from './SelectSystem/SelectSystem';

import SystemSVG from './SystemSVG/SystemSVG';
import SystemWizard from './SystemWizard';

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
            link: "/details"
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
                component={SelectSystem}
            />
            <Route
                path="/system/activity"
                component={() => "System Activity"}
            />
            <Route
                path="/system/database"
                component={SystemWizard}
            />
            <Route
                path="/system/details"
                component={SystemSVG}
            />
        </Switch>
    );
}

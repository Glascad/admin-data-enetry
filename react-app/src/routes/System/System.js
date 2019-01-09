import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SelectSystem from './SelectSystem/SelectSystem';

import SystemSVG from './SystemSVG/SystemSVG';
import SystemTabContainer from './SystemTabContainer';

export default function SystemRouter() {
    return (
        <Switch>
            <Route
                exact
                path="/system/select-system"
                component={SelectSystem}
            />
            <Route
                path="/system/:systemNID/svg"
                component={SystemSVG}
            />
            <Route
                path="/system/:systemNID"
                component={SystemTabContainer}
            />
        </Switch>
    );
}

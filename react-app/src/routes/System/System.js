import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SelectSystem from './SelectSystem/SelectSystem';

import SystemWizard from './SystemWizard';

export default function SystemRouter() {
    return (
        <Switch>
            <Route
                exact
                path="/system/select-system"
                component={SelectSystem}
            />
            <Route
                path="/system/:systemNID"
                component={SystemWizard}
            />
        </Switch>
    );
}

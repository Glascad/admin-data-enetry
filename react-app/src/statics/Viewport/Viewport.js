import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Viewport.scss';
// HOME
import Home from '../../routes/Home/Home';

import SystemRouter from '../../routes/System/System';
import SettingsRouter from '../../routes/Settings/Settings';

export default function Viewport() {
    return (
        <div id="Viewport">
            <Switch>
                {/* HOME */}
                <Route
                    exact={true}
                    path="/"
                    component={Home}
                />
                {/* SYSTEM */}
                <Route
                    path="/system"
                    component={SystemRouter}
                />
                {/* SETTINGS */}
                <Route
                    path="/settings"
                    component={SettingsRouter}
                />
            </Switch>
        </div>
    );
}

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Viewport.scss';

import ActivityRouter from '../../routes/Activity/Activity';
import SystemDataRouter from '../../routes/SystemData/SystemData';
import ApplicationDataRouter from '../../routes/ApplicationData/ApplicationData';
import PartDataRouter from '../../routes/PartData/PartData';

export default function Viewport() {
    return (
        <div id="Viewport">
            <Switch>
                {/* HOME */}
                <Route
                    exact={true}
                    path="/"
                    component={ActivityRouter}
                />
                {/* SYSTEM */}
                <Route
                    path="/system-data"
                    component={SystemDataRouter}
                />
                {/* SETTINGS */}
                <Route
                    path="/application-data"
                    component={ApplicationDataRouter}
                />
                <Route
                    path="/part-data"
                    component={PartDataRouter}
                />
            </Switch>
        </div>
    );
}

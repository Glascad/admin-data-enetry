import React from 'react';
import { Switch, Route } from 'react-router-dom';
// SYSTEM CONFIGURATIONS
import SystemTypes from './SystemTypes/SystemTypes';
import SystemTags from './SystemTags/SystemTags';
import DetailTypes from './DetailTypes/DetailTypes';
import ConfigurationTypes from './ConfigurationTypes/ConfigurationTypes';
import PartTypes from './PartTypes/PartTypes';
import PartTags from './PartTags/PartTags';

export default function SystemConfigurationsRouter() {
    return (
        <div className="card">
            <Switch>
                <Route
                    path="/system-configurations/system-types"
                    component={SystemTypes}
                />
                <Route
                    path="/system-configurations/system-tags"
                    component={SystemTags}
                />
                <Route
                    path="/system-configurations/detail-types"
                    component={DetailTypes}
                />
                <Route
                    path="/system-configurations/configuration-types"
                    component={ConfigurationTypes}
                />
                <Route
                    path="/system-configurations/part-types"
                    component={PartTypes}
                />
                <Route
                    path="/system-configurations/part-tags"
                    component={PartTags}
                />
            </Switch>
        </div>
    );
}

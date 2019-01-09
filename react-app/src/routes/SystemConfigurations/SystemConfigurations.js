import React from 'react';
import { Switch, Route } from 'react-router-dom';
// SYSTEM CONFIGURATIONS
import SystemTypes from './SystemTypes/SystemTypes';
import SystemTags from './SystemTags/SystemTags';
import DetailTypes from './DetailTypes/DetailTypes';
import ConfigurationTypes from './ConfigurationTypes/ConfigurationTypes';
import PartTypes from './PartTypes/PartTypes';
import PartTags from './PartTags/PartTags';

export const links = {
    text: "System Configurations",
    link: "/system-configurations",
    subroutes: [
        {
            text: "System Types",
            link: "/system-types",
        },
        {
            text: "System Tags",
            link: "/system-tags",
        },
        {
            text: "Detail Types",
            link: "/detail-types",
        },
        {
            text: "Configuration Types",
            link: "/configuration-types",
        },
        {
            text: "Part Types",
            link: "/part-types",
        },
        {
            text: "Part Tags",
            link: "/part-tags",
        },
    ]
};

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

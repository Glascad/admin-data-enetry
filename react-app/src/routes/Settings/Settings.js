import React from 'react';
import { Switch, Route } from 'react-router-dom';
// SETTINGS
import Manufacturers from './Manufacturers/Manufacturers';
import Linetypes from './LinetypesView/LinetypesView';
import PartOrientations from './PartOrientations/PartOrientations';
import InfillSizes from './InfillSizes/InfillSizes';
import InfillTypes from './InfillTypesView/InfillTypesView';

export default function SettingsRouter() {
    return (
        <div className="card">
            <Switch>
                <Route
                    path="/settings/manufacturers"
                    component={Manufacturers}
                />
                <Route
                    path="/settings/linetypes"
                    component={Linetypes}
                />
                <Route
                    path="/settings/part-orientations"
                    component={PartOrientations}
                />
                <Route
                    path="/settings/infill-sizes"
                    component={InfillSizes}
                />
                <Route
                    path="/settings/infill-types"
                    component={InfillTypes}
                />
            </Switch>
        </div>
    );
}

import React from 'react';
import { Switch, Route } from 'react-router-dom';
// SETTINGS
import Manufacturers from './Manufacturers/Manufacturers';
import Linetypes from './LinetypesView/LinetypesView';
import PartOrientations from './PartOrientations/PartOrientations';
import InfillSizes from './InfillSizes/InfillSizes';
import InfillTypes from './InfillTypesView/InfillTypesView';
import SystemTags from './SystemTags/SystemTags';
import PartTags from './PartTags/PartTags';
import TypesWizard from './Types/TypesWizard';

export const links = {
    text: "Settings",
    link: "/settings",
    subroutes: [
        {
            text: "Manufacturers",
            link: "/manufacturers",
        },
        {
            text: "Linetypes",
            link: "/linetypes",
        },
        {
            text: "Part Orientations",
            link: "/part-orientations",
        },
        {
            text: "Infill Sizes",
            link: "/infill-sizes",
        },
        {
            text: "Infill Types",
            link: "/infill-types",
        },
        {
            text: "System Tags",
            link: "/system-tags",
        },
        {
            text: "Part Tags",
            link: "/part-tags",
        },
        {
            text: "Types",
            link: "/types"
        }
    ]
};

export default function SettingsRouter() {
    return (
        <Switch>
            <Route
                path="/settings/types"
                component={TypesWizard}
            />
            <Route
                render={() => (
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
                            <Route
                                path="/settings/system-tags"
                                component={SystemTags}
                            />
                            <Route
                                path="/settings/part-tags"
                                component={PartTags}
                            />
                        </Switch>
                    </div>
                )}
            />
        </Switch>
    );
}

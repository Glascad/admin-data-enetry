import React from 'react';
import { Switch, Route } from 'react-router-dom';
// SETTINGS
import Manufacturers from './Manufacturers/Manufacturers';
import Linetypes from './LinetypesView/LinetypesView';
import PartOrientations from './PartOrientations/PartOrientations';
import InfillSizes from './InfillSizes/InfillSizes';
import InfillPockets from './InfillPockets/InfillPockets';
import SystemTags from './SystemTags/SystemTags';
import PartTags from './PartTags/PartTags';
import Types from './Types/Types';

export const links = {
    text: "Application Data",
    link: "/application-data",
    subroutes: [
        {
            text: "Manufacturers",
            link: "/manufacturers",
        },
        {
            text: "Types",
            link: "/types"
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
            text: "Infill Pockets",
            link: "/infill-pockets",
        },
        {
            text: "Infill Sizes",
            link: "/infill-sizes",
        },
        {
            text: "Linetypes",
            link: "/linetypes",
        },
        {
            text: "Part Orientations",
            link: "/part-orientations",
        },
    ]
};

export default function ApplicationDataRouter() {
    return (
        <Switch>
            <Route
                path="/application-data/types"
                component={Types}
            />
            <Route
                render={() => (
                    <div className="card">
                        <Switch>
                            <Route
                                path="/application-data/manufacturers"
                                component={Manufacturers}
                            />
                            <Route
                                path="/application-data/linetypes"
                                component={Linetypes}
                            />
                            <Route
                                path="/application-data/part-orientations"
                                component={PartOrientations}
                            />
                            <Route
                                path="/application-data/infill-sizes"
                                component={InfillSizes}
                            />
                            <Route
                                path="/application-data/infill-pockets"
                                component={InfillPockets}
                            />
                            <Route
                                path="/application-data/system-tags"
                                component={SystemTags}
                            />
                            <Route
                                path="/application-data/part-tags"
                                component={PartTags}
                            />
                        </Switch>
                    </div>
                )}
            />
        </Switch>
    );
}

import React from 'react';

import {
    Navigator,
} from '../../components';

import Manufacturers from './Manufacturers/Manufacturers';
import Linetypes from './LinetypesView/LinetypesView';
import PartOrientations from './PartOrientations/PartOrientations';
import InfillSizes from './InfillSizes/InfillSizes';
import InfillPockets from './InfillPockets/InfillPockets';
import SystemTags from './SystemTags/SystemTags';
import PartTags from './PartTags/PartTags';
import Types from './Types/Types';

const path = '/application-data';

const routes = {
    name: "Application Data",
    path,
    component: ApplicationDataRouter,
    subroutes: [
        {
            name: "Manufacturers",
            path: "/manufacturers",
            component: Manufacturers,
        },
        {
            name: "Types",
            path: "/types",
            component: Types,
        },
        {
            name: "System Tags",
            path: "/system-tags",
            component: SystemTags,
        },
        {
            name: "Part Tags",
            path: "/part-tags",
            component: PartTags,
        },
        {
            name: "Infill Pockets",
            path: "/infill-pockets",
            component: InfillPockets,
        },
        {
            name: "Infill Sizes",
            path: "/infill-sizes",
            component: InfillSizes,
        },
        {
            name: "Linetypes",
            path: "/linetypes",
            component: Linetypes,
        },
        {
            name: "Part Orientations",
            path: "/part-orientations",
            component: PartOrientations,
        },
    ],
};

function ApplicationDataRouter() {
    
    return (
        <Navigator
            routes={[
                {
                    path: "/types",
                    component: Types,
                },
                {
                    path: "/",
                    render: () => (
                        <div className="card">
                            <Navigator
                                log={true}
                                routes={routes.subroutes.filter(({ name }) => name !== "Types")}
                            />
                        </div>
                    ),
                },
            ]}
        />
    );
}

export default routes;

// HOME
import Home from './Home/Home';
// SYSTEM
import System from './System/System';
// SYSTEM CONFIGURATIONS
import SystemConfigurations from './SystemConfigurations/SystemConfigurations';
import SystemTypes from './SystemConfigurations/SystemTypes/SystemTypes';
import DetailTypes from './SystemConfigurations/DetailTypes/DetailTypes';
import ConfigurationTypes from './SystemConfigurations/ConfigurationTypes/ConfigurationTypes';
import PartTypes from './SystemConfigurations/PartTypes/PartTypes';
// SETTINGS
import Settings from './Settings/Settings';
import Manufacturers from './Settings/Manufacturers/Manufacturers';
import Linetypes from './Settings/Linetypes/Linetypes';
import PartOrientations from './Settings/PartOrientations/PartOrientations';
import Fasteners from './Settings/Fasteners/Fasteners';
import InfillSizes from './Settings/InfillSizes/InfillSizes';
import InfillTypes from './Settings/InfillTypes/InfillTypes';

// function fromPascalToUpperSpaceCase(PascalCase) {
//     return [...PascalCase].reduce((spaces, letter) => `${spaces}${letter === letter.toUpperCase() ? ' ' : ''}${letter.toUpperCase()}`, '');
// }

// function createRouteObject(compObj, prefix) {
//     return Object.keys(compObj).reduce((routeObj, key) => ({
//         ...routeObj,
//         name: fromPascalToUpperSpaceCase(key),
//         path: `/${[prefix, key.toLowerCase()].join('/')}`,
// component: compObj[key]
//     }), {});
// }

export default [
    {
        name: "HOME",
        exact: true,
        path: "/",
        component: Home,
    },
    {
        name: "SYSTEM",
        path: "/system/",
        component: System,
    },
    {
        name: "SYSTEM CONFIGURATIONS",
        exact: true,
        path: "/systemconfigurations/",
        component: SystemConfigurations,
        subroutes: [
            {
                name: "SYSTEM TYPES",
                path: "/systemtypes/",
                component: SystemTypes
            },
            {
                name: "DETAIL TYPES",
                path: "/detailtypes/",
                component: DetailTypes
            },
            {
                name: "CONFIGURATION TYPES",
                path: "/configurationtypes/",
                component: ConfigurationTypes
            },
            {
                name: "PART TYPES",
                path: "/parttypes/",
                component: PartTypes
            }
        ]
    },
    {
        name: "SETTINGS",
        exact: true,
        path: "/settings/",
        component: Settings,
        subroutes: [
            {
                name: "MANUFACTURERS",
                path: "/manufacturers/",
                component: Manufacturers
            },
            {
                name: "LINETYPES",
                path: "/linetypes/",
                component: Linetypes
            },
            {
                name: "PART ORIENTATIONS",
                path: "/partorientations/",
                component: PartOrientations
            },
            {
                name: "FASTENERS",
                path: "/fasteners/",
                component: Fasteners
            },
            {
                name: "INFILL SIZES",
                path: "/infillsizes/",
                component: InfillSizes
            },
            {
                name: "INFILL TYPES",
                path: "/infilltypes/",
                component: InfillTypes
            },
        ]
    }
];

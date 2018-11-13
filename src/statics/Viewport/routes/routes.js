// HOME
// import Home from './Home/Home';
// // SYSTEM
// import System from './System/System';
// // SYSTEM CONFIGURATIONS
// import SystemTypes from './SystemConfigurations/SystemTypes/SystemTypes';
// import DetailTypes from './SystemConfigurations/DetailTypes/DetailTypes';
// import ConfigurationTypes from './SystemConfigurations/ConfigurationTypes/ConfigurationTypes';
// import PartTypes from './SystemConfigurations/PartTypes/PartTypes';
// // SETTINGS
// import Manufacturers from './Settings/Manufacturers/Manufacturers';
// import Linetypes from './Settings/Linetypes/Linetypes';
// import PartOrientations from './Settings/PartOrientations/PartOrientations';
// import Fasteners from './Settings/Fasteners/Fasteners';
// import InfillSizes from './Settings/InfillSizes/InfillSizes';
// import InfillTypes from './Settings/InfillTypes/InfillTypes';

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
        name: "SYSTEM",
        path: "/system",
        // component: System,
    },
    {
        name: "SYSTEM CONFIGURATIONS",
        path: "/systemconfigurations",
        subroutes: [
            {
                name: "SYSTEM TYPES",
                path: "/systemconfigurations/systemtypes",
                // component: SystemTypes
            },
            {
                name: "DETAIL TYPES",
                path: "/systemconfigurations/detailtypes",
                // component: DetailTypes
            },
            {
                name: "CONFIGURATION TYPES",
                path: "/systemconfigurations/configurationtypes",
                // component: ConfigurationTypes
            },
            {
                name: "PART TYPES",
                path: "/systemconfigurations/parttypes",
                // component: PartTypes
            }
        ]
    },
    {
        name: "SETTINGS",
        path: "/settings",
        subroutes: [
            {
                name: "MANUFACTURERS",
                path: "/settings/manufacturers",
                // component: Manufacturers
            },
            {
                name: "LINETYPES",
                path: "/settings/linetypes",
                // component: Linetypes
            },
            {
                name: "PART ORIENTATIONS",
                path: "/settings/partorientations",
                // component: PartOrientations
            },
            {
                name: "FASTENERS",
                path: "/settings/fasteners",
                // component: Fasteners
            },
            {
                name: "INFILL SIZES",
                path: "/settings/infillsizes",
                // component: InfillSizes
            },
            {
                name: "INFILL TYPES",
                path: "/settings/infilltypes",
                // component: InfillTypes
            },
        ]
    }
];


<<<<<<< HEAD
export default [
    {
        name: "Activity",
        exact: true,
        path: "/",
        component: Home,
    },
    {
        name: "System",
        exact: true,
        path: "/system/:systemNID",
        // component: System,
        subroutes: [
            // {
            //     name: "SYSTEM",
            //     exact: true,
            //     path: "/:mnfgNID",
            //     component: System
            // },
            // {
            //     name: "SYSTEM",
            //     path: "/:mnfgNID/:systemNID",
            //     component: System
            // },
            {
                name: "System Explorer",
                path: "/system explorer"
                // component: 
            },
            {
                name: "System Info",
                path: "/system info"
                // component: 
            },
            {
                name: "Glazing Info",
                path: "/glazing info"
                // component: 
            },
            {
                name: "Valid Types",
                path: "/valid types"
                // component: 
            },
            {
                name: "System Compatibility",
                path: "/system compatibility"
                // component: 
            },
            {
                name: "System Options",
                path: "/system options"
                // component: 
            },
            {
                name: "Invalid Combinations",
                path: "/invalid combinations"
                // component: 
            },
        ]
    },
    {
        name: "System Configurations",
        exact: true,
        path: "/system configurations",
        // component: SystemConfigurations,
        subroutes: [
            {
                name: "System Types",
                path: "/system types",
                component: SystemTypes
            },
            {
                name: "System Tags",
                path: "/system tags",
                component: SystemTags
            },
            {
                name: "Detail Types",
                path: "/detail types",
                component: DetailTypes
            },
            {
                name: "Configuration Types",
                path: "/configuration types",
                component: ConfigurationTypes
            },
            {
                name: "Part Types",
                path: "/part types",
                component: PartTypes
            },
            {
                name: "Part Tags",
                path: "/part tags",
                component: PartTags
            },
        ]
    },
    {
        name: "Settings",
        exact: true,
        path: "/settings",
        // component: Settings,
        subroutes: [
            {
                name: "Manufacturers",
                path: "/manufacturers",
                component: Manufacturers
            },
            {
                name: "Linetypes",
                path: "/linetypes",
                component: Linetypes
            },
            {
                name: "Part Orientations",
                path: "/part orientations",
                component: PartOrientations
            },
            // {
            //     name: "Fasteners",
            //     path: "/fasteners",
            //     // component: Fasteners
            // },
            {
                name: "Infill Sizes",
                path: "/infill sizes",
                component: InfillSizes
            },
            {
                name: "Infill Types",
                path: "/infill types",
                component: InfillTypes
            },
        ]
    },
    // {
    //     name: "PRACTICE",
    //     path: "/practice",
    //     component: Practice
    // }
];
=======




// // HOME
// import Home from './Home/Home';
// // SYSTEM
// import SelectSystem from './System/SelectSystem/SelectSystem';
// import SystemInfo from './System/SystemInfo/SystemInfo';
// import GlazingInfo from './System/GlazingInfo/GlazingInfo';
// import ValidTypes from './System/ValidTypes/ValidTypes';
// import SystemCompatibility from './System/SystemCompatibility/SystemCompatibility';
// import SystemOptions from './System/SystemOptions/SystemOptions';
// import InvalidCombinations from './System/InvalidCombinations/InvalidCombinations';
// // SYSTEM CONFIGURATIONS
// import SystemTypes from './SystemConfigurations/SystemTypes/SystemTypes';
// import SystemTags from './SystemConfigurations/SystemTags/SystemTags';
// import DetailTypes from './SystemConfigurations/DetailTypes/DetailTypes';
// import ConfigurationTypes from './SystemConfigurations/ConfigurationTypes/ConfigurationTypes';
// import PartTypes from './SystemConfigurations/PartTypes/PartTypes';
// import PartTags from './SystemConfigurations/PartTags/PartTags';
// // SETTINGS
// import Manufacturers from './Settings/Manufacturers/Manufacturers';
// import Linetypes from './Settings/LinetypesView/LinetypesView';
// import PartOrientations from './Settings/PartOrientations/PartOrientations';
// // import Fasteners from './Settings/Fasteners/Fasteners';
// import InfillSizes from './Settings/InfillSizes/InfillSizes';
// import InfillTypes from './Settings/InfillTypesView/InfillTypesView';
// // PRACTICE
// import Practice from './Practice/Practice';

// export default [
//     {
//         name: "HOME",
//         exact: true,
//         path: "/",
//         component: Home,
//     },
//     {
//         name: "SYSTEM",
//         exact: true,
//         path: "/system/:systemNID",
//         // component: System,
//         subroutes: [
//             // {
//             //     name: "SYSTEM",
//             //     exact: true,
//             //     path: "/:mnfgNID",
//             //     component: System
//             // },
//             // {
//             //     name: "SYSTEM",
//             //     path: "/:mnfgNID/:systemNID",
//             //     component: System
//             // },
//             {
//                 name: "SELECT SYSTEM",
//                 path: "/select system",
//                 component: SelectSystem
//             },
//             {
//                 name: "SYSTEM INFO",
//                 path: "/system info/:systemNID",
//                 component: SystemInfo
//             },
//             {
//                 name: "GLAZING INFO",
//                 path: "/glazing info/:systemNID",
//                 component: GlazingInfo
//             },
//             {
//                 name: "VALID TYPES",
//                 path: "/valid types/:systemNID",
//                 component: ValidTypes
//             },
//             {
//                 name: "SYSTEM COMPATIBILITY",
//                 path: "/system compatibility/:systemNID",
//                 component: SystemCompatibility
//             },
//             {
//                 name: "SYSTEM OPTIONS",
//                 path: "/system options/:systemNID",
//                 component: SystemOptions
//             },
//             {
//                 name: "INVALID COMBINATIONS",
//                 path: "/invalid combinations/:systemNID",
//                 component: InvalidCombinations
//             },
//         ]
//     },
//     {
//         name: "SYSTEM CONFIGURATIONS",
//         exact: true,
//         path: "/system configurations",
//         subroutes: [
//             {
//                 name: "SYSTEM TYPES",
//                 path: "/system types",
//                 component: SystemTypes
//             },
//             {
//                 name: "SYSTEM TAGS",
//                 path: "/system tags",
//                 component: SystemTags
//             },
//             {
//                 name: "DETAIL TYPES",
//                 path: "/detail types",
//                 component: DetailTypes
//             },
//             {
//                 name: "CONFIGURATION TYPES",
//                 path: "/configuration types",
//                 component: ConfigurationTypes
//             },
//             {
//                 name: "PART TYPES",
//                 path: "/part types",
//                 component: PartTypes
//             },
//             {
//                 name: "PART TAGS",
//                 path: "/part tags",
//                 component: PartTags
//             },
//         ]
//     },
//     {
//         name: "SETTINGS",
//         exact: true,
//         path: "/settings",
//         subroutes: [
//             {
//                 name: "MANUFACTURERS",
//                 path: "/manufacturers",
//                 component: Manufacturers
//             },
//             {
//                 name: "LINETYPES",
//                 path: "/linetypes",
//                 component: Linetypes
//             },
//             {
//                 name: "PART ORIENTATIONS",
//                 path: "/part orientations",
//                 component: PartOrientations
//             },
//             // {
//             //     name: "FASTENERS",
//             //     path: "/fasteners",
//             //     // component: Fasteners
//             // },
//             {
//                 name: "INFILL SIZES",
//                 path: "/infill sizes",
//                 component: InfillSizes
//             },
//             {
//                 name: "INFILL TYPES",
//                 path: "/infill types",
//                 component: InfillTypes
//             },
//         ]
//     },
//     {
//         name: "PRACTICE",
//         path: "/practice",
//         component: Practice
//     }
// ];
>>>>>>> ae083bdca6a3a2b5fe9e8d46ee7f602b6981e233

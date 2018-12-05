// HOME
import Home from './Viewport/routes/Home/Home';
// SYSTEM
import System from './Viewport/routes/System/System';
// SYSTEM CONFIGURATIONS
// import SystemConfigurations from './Viewport/routes/SystemConfigurations/SystemConfigurations';
import SystemTypes from './Viewport/routes/SystemConfigurations/SystemTypes/SystemTypes';
import SystemTags from './Viewport/routes/SystemConfigurations/SystemTags/SystemTags';
import DetailTypes from './Viewport/routes/SystemConfigurations/DetailTypes/DetailTypes';
import ConfigurationTypes from './Viewport/routes/SystemConfigurations/ConfigurationTypes/ConfigurationTypes';
import PartTypes from './Viewport/routes/SystemConfigurations/PartTypes/PartTypes';
import PartTags from './Viewport/routes/SystemConfigurations/PartTags/PartTags';
// SETTINGS
// import Settings from './Viewport/routes/Settings/Settings';
import Manufacturers from './Viewport/routes/Settings/Manufacturers/Manufacturers';
import Linetypes from './Viewport/routes/Settings/LinetypesView/LinetypesView';
import PartOrientations from './Viewport/routes/Settings/PartOrientations/PartOrientations';
// import Fasteners from './Viewport/routes/Settings/Fasteners/Fasteners';
import InfillSizes from './Viewport/routes/Settings/InfillSizes/InfillSizes';
import InfillTypes from './Viewport/routes/Settings/InfillTypesView/InfillTypesView';
// PRACTICE
import Practice from './Viewport/routes/Practice/Practice';

export default [
    {
        name: "HOME",
        exact: true,
        path: "/",
        component: Home,
    },
    {
        name: "SYSTEM",
        exact: true,
        path: "/system",
        component: System,
        subroutes: [
            {
                name: "SYSTEM",
                exact: true,
                path: "/:mnfgNID",
                component: System
            },
            {
                name: "SYSTEM",
                path: "/:mnfgNID/:systemNID",
                component: System
            }
        ]
    },
    {
        name: "SYSTEM CONFIGURATIONS",
        exact: true,
        path: "/system configurations",
        // component: SystemConfigurations,
        subroutes: [
            {
                name: "SYSTEM TYPES",
                path: "/system types",
                component: SystemTypes
            },
            {
                name: "SYSTEM TAGS",
                path: "/system tags",
                component: SystemTags
            },
            {
                name: "DETAIL TYPES",
                path: "/detail types",
                component: DetailTypes
            },
            {
                name: "CONFIGURATION TYPES",
                path: "/configuration types",
                component: ConfigurationTypes
            },
            {
                name: "PART TYPES",
                path: "/part types",
                component: PartTypes
            },
            {
                name: "PART TAGS",
                path: "/part tags",
                component: PartTags
            },
        ]
    },
    {
        name: "SETTINGS",
        exact: true,
        path: "/settings",
        // component: Settings,
        subroutes: [
            {
                name: "MANUFACTURERS",
                path: "/manufacturers",
                component: Manufacturers
            },
            {
                name: "LINETYPES",
                path: "/linetypes",
                component: Linetypes
            },
            {
                name: "PART ORIENTATIONS",
                path: "/part orientations",
                component: PartOrientations
            },
            // {
            //     name: "FASTENERS",
            //     path: "/fasteners",
            //     // component: Fasteners
            // },
            {
                name: "INFILL SIZES",
                path: "/infill sizes",
                component: InfillSizes
            },
            {
                name: "INFILL TYPES",
                path: "/infill types",
                component: InfillTypes
            },
        ]
    },
    {
        name: "PRACTICE",
        path: "/practice",
        component: Practice
    }
];

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
        path: "/system configurations/",
        component: SystemConfigurations,
        subroutes: [
            {
                name: "SYSTEM TYPES",
                path: "/system types/",
                component: SystemTypes
            },
            {
                name: "DETAIL TYPES",
                path: "/detail types/",
                component: DetailTypes
            },
            {
                name: "CONFIGURATION TYPES",
                path: "/configuration types/",
                component: ConfigurationTypes
            },
            {
                name: "PART TYPES",
                path: "/part types/",
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
                path: "/part orientations/",
                component: PartOrientations
            },
            {
                name: "FASTENERS",
                path: "/fasteners/",
                component: Fasteners
            },
            {
                name: "INFILL SIZES",
                path: "/infill sizes/",
                component: InfillSizes
            },
            {
                name: "INFILL TYPES",
                path: "/infill types/",
                component: InfillTypes
            },
        ]
    }
];

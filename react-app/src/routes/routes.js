
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

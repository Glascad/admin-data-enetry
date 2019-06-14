
const applications = [
    {
        name: "Data Entry",
        path: "/data-entry",
        render: lazy(() => import('./DataEntry')),
        children: [
            {
                name: "Activity",
                path: "/activity",
                render: () => "Activity",
            },
            {
                name: "System Data",
                path: "/system-data",
                render: lazy(() => import('./SystemData')),
            },
            {
                name: "Application Data",
                path: "/application-data",
                render: lazy(() => import('./ApplicationData')),
            },
            {
                name: "Part Data",
                path: "/part-data",
                render: () => "Part Data",
            },
        ],
    },
    {
        name: "GlasCAD",
        path: "/glascad",
        render: lazy(() => import('./GlasCAD')),
        children: [
            {
                name: "Main Menu",
                path: "/main-menu",
                render: () => "Main Menu",
            },
            {
                name: ({ location: { search } }) => getProjectName(search),
                path: "/project",
                shouldRender: ({ location: { search } }) => hasProject(search),
                render: lazy(() => import('./Project')),
            },
            {
                name: "Export",
                path: "/export",
                render: () => "Export",
            },
        ],
    },
];

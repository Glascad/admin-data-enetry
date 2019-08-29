import { sample1 } from "../../../sample-systems";

function TestGetChildren({
    system,
    item,
    children,
}) {

    const childrenResult = getChildren(item, system);

    describe(`Testing ${system.name} to get correct first optionValue`, () => {
        test(`testing name, id, typename and nodeId match`, () => {
            expect(childrenResult).toMatchObject(children);
        });
    });
};

TestGetChildren({
    system: sample1,
    item: {
        id: 3,
        __typename: "SystemOptionValue",
    },
    children: [
        {
            __typename: "SystemOption",
            nodeId: "WyJzeXN0ZW1fb3B0aW9ucyIsMl0=",
            id: 2,
            name: "JOINERY",
            parentSystemOptionValueId: 3,
        },
    ]
});

TestGetChildren({
    system: sample1,
    item: {
        __typename: "DetailOptionValue",
        id: 2,
        name: "DOWN",
    },
    children: [
        {
            __typename: "DetailOption",
            nodeId: "WyJkZXRhaWxfb3B0aW9ucyIsMl0=",
            id: 2,
            name: "GLAZING",
            parentDetailOptionValueId: 2,
        },
    ]
});

TestGetChildren({
    system: sample1,
    item: {
        __typename: "SystemConfigurationType",
        nodeId: "WyJzeXN0ZW1fY29uZmlndXJhdGlvbl90eXBlcyIsMl0=",
        id: 2,
        configurationType: "COMPENSATING_RECEPTOR",
        optional: true
    },
    children: [
        {
            __typename: "ConfigurationOption",
            nodeId: "WyJjb25maWd1cmF0aW9uX29wdGlvbnMiLDFd",
            id: 1,
            name: "RECEPTOR_TYPE",
            systemConfigurationTypeId: 2,
        },
    ]
});
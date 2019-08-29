import { getChildren } from "../../utils";
import { sample1 } from "../../../../sample-systems";

function testGetChildren({
    system,
    item,
    children,
}) {

    describe(`Testing ${system.name} to get correct first optionValue`, () => {

        const childrenResult = getChildren(item, system);

        test(`result has correct length`, () => {
            expect(childrenResult.length).toBe(children.length);
        });
        test(`testing name, id, typename and nodeId match`, () => {
            expect(childrenResult).toMatchObject(children);
        });
    });
};

testGetChildren({
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
    ],
});

testGetChildren({
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
    ],
});

testGetChildren({
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
    ],
});
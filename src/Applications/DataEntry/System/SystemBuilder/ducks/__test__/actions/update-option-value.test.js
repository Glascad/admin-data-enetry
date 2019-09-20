import { UPDATE_OPTION_VALUE } from "../../actions";
import { systemUpdate, systemOptionValueUpdate, detailOptionValueUpdate, configurationOptionValueUpdate } from "../../schemas";

function testUpdateOptionValue({
    systemInput,
    payload,
    systemOutput,
}) {
    describe(`Testing update options`, () => {
        const result = UPDATE_OPTION_VALUE({ ...systemUpdate, ...systemInput }, payload);
        test(`Result should be correct for ${payload.name}`, () => {
            expect(result).toMatchObject(systemOutput);
        });
    });
}

//System Option Values
testUpdateOptionValue({
    systemInput: {},
    payload: {
        id: 1,
        name: "FRONT",
        __typename: "SystemOptionValue",
        parentSystemOptionId: 5,
    },
    systemOutput: {
        systemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "FRONT",
                __typename: "SystemOptionValue",
                parentSystemOptionId: 5,
            })
        ])
    },
});

testUpdateOptionValue({
    systemInput: {
        systemOptionValues: [
            {
                ...systemOptionValueUpdate,
                id: 1,
                name: "CENTER",
                __typename: "SystemOptionValue",
                parentSystemOptionId: 5,
            },
        ],
    },
    payload: {
        id: 1,
        name: "FRONT",
        __typename: "SystemOptionValue",
        parentSystemOptionId: 5,
    },
    systemOutput: {
        systemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "FRONT",
                __typename: "SystemOptionValue",
                parentSystemOptionId: 5,
            }),
        ])
    },
});

testUpdateOptionValue({
    systemInput: {
        systemOptionValues: [
            {
                ...systemOptionValueUpdate,
                id: 1,
                name: "CENTER",
                __typename: "SystemOptionValue",
                parentSystemOptionId: 5,
            },
        ],
    },
    payload: {
        id: 2,
        name: "FRONT",
        __typename: "SystemOptionValue",
        parentSystemOptionId: 5,
    },
    systemOutput: {
        systemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "CENTER",
                __typename: "SystemOptionValue",
                parentSystemOptionId: 5,
            }),
            expect.objectContaining({
                id: 2,
                name: "FRONT",
                __typename: "SystemOptionValue",
                parentSystemOptionId: 5,
            }),
        ])
    },
});

testUpdateOptionValue({
    systemInput: {
        systemOptionValues: [
            {
                ...systemOptionValueUpdate,
                fakeId: 1,
                name: "CENTER",
                __typename: "SystemOptionValue",
                parentSystemOptionFakeId: 5,
            },
        ],
    },
    payload: {
        fakeId: 2,
        name: "FRONT",
        __typename: "SystemOptionValue",
        parentSystemOptionFakeId: 5,
    },
    systemOutput: {
        systemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "CENTER",
                __typename: "SystemOptionValue",
                parentSystemOptionFakeId: 5,
            }),
            expect.objectContaining({
                fakeId: 2,
                name: "FRONT",
                __typename: "SystemOptionValue",
                parentSystemOptionFakeId: 5,
            }),
        ])
    },
});

//Detail Options
testUpdateOptionValue({
    systemInput: {},
    payload: {
        id: 1,
        name: "INSIDE",
        __typename: "DetailOptionValue",
        parentDetailOptionId: 3,
    },
    systemOutput: {
        detailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "INSIDE",
                __typename: "DetailOptionValue",
                parentDetailOptionId: 3,
            }),
        ])
    },
});

testUpdateOptionValue({
    systemInput: {
        detailOptionValues: [
            {
                ...detailOptionValueUpdate,
                id: 1,
                name: "OUTSIDE",
                __typename: "DetailOptionValue",
                parentDetailOptionId: 3,
            },
        ],
    },
    payload: {
        id: 1,
        name: "INSIDE",
        __typename: "DetailOptionValue",
        parentDetailOptionId: 3,
    },
    systemOutput: {
        detailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "INSIDE",
                __typename: "DetailOptionValue",
                parentDetailOptionId: 3,
            }),
        ])
    },
});

testUpdateOptionValue({
    systemInput: {
        detailOptionValues: [
            {
                ...detailOptionValueUpdate,
                id: 1,
                name: "OUTSIDE",
                __typename: "DetailOptionValue",
                parentDetailOptionId: 3,
            },
        ],
    },
    payload: {
        id: 2,
        name: "INSIDE",
        __typename: "DetailOptionValue",
        parentDetailOptionId: 3,
    },
    systemOutput: {
        detailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "OUTSIDE",
                __typename: "DetailOptionValue",
                parentDetailOptionId: 3,
            }),
            expect.objectContaining({
                id: 2,
                name: "INSIDE",
                __typename: "DetailOptionValue",
                parentDetailOptionId: 3,
            }),
        ])
    },
});

testUpdateOptionValue({
    systemInput: {
        detailOptionValues: [
            {
                ...detailOptionValueUpdate,
                fakeId: 1,
                name: "OUTSIDE",
                __typename: "DetailOptionValue",
                parentDetailOptionFakeId: 3,
            },
        ],
    },
    payload: {
        fakeId: 2,
        name: "INSIDE",
        __typename: "DetailOptionValue",
        parentDetailOptionFakeId: 3,
    },
    systemOutput: {
        detailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "OUTSIDE",
                __typename: "DetailOptionValue",
                parentDetailOptionFakeId: 3,
            }),
            expect.objectContaining({
                fakeId: 2,
                name: "INSIDE",
                __typename: "DetailOptionValue",
                parentDetailOptionFakeId: 3,
            }),
        ])
    },
});

//Configuration Options
testUpdateOptionValue({
    systemInput: {},
    payload: {
        id: 1,
        name: "SOME_CONFIGURATION_OPTION_VALUE",
        __typename: "ConfigurationOptionValue",
        parentConfigurationOptionId: 7,
    },
    systemOutput: {
        configurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "SOME_CONFIGURATION_OPTION_VALUE",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionId: 7,
            }),
        ])
    },
});

testUpdateOptionValue({
    systemInput: {
        configurationOptionValues: [
            {
                ...configurationOptionValueUpdate,
                id: 1,
                name: "PRESENT?",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionId: 7,
            },
        ],
    },
    payload: {
        id: 1,
        name: "SOME_CONFIGURATION_OPTION_VALUE",
        __typename: "ConfigurationOptionValue",
        parentConfigurationOptionId: 7,
    },
    systemOutput: {
        configurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "SOME_CONFIGURATION_OPTION_VALUE",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionId: 7,
            }),
        ])
    },
});

testUpdateOptionValue({
    systemInput: {
        configurationOptionValues: [
            {
                ...configurationOptionValueUpdate,
                id: 1,
                name: "PRESENT?",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionId: 7,
            },
        ],
    },
    payload: {
        id: 2,
        name: "SOME_CONFIGURATION_OPTION_VALUE",
        __typename: "ConfigurationOptionValue",
        parentConfigurationOptionId: 7,
    },
    systemOutput: {
        configurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "PRESENT?",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionId: 7,
            }),
            expect.objectContaining({
                id: 2,
                name: "SOME_CONFIGURATION_OPTION_VALUE",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionId: 7,
            }),
        ])
    },
});

testUpdateOptionValue({
    systemInput: {
        configurationOptionValues: [
            {
                ...configurationOptionValueUpdate,
                fakeId: 1,
                name: "PRESENT?",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionFakeId: 7,
            },
        ],
    },
    payload: {
        fakeId: 2,
        name: "SOME_CONFIGURATION_OPTION_VALUE",
        __typename: "ConfigurationOptionValue",
        parentConfigurationOptionFakeId: 7,
    },
    systemOutput: {
        configurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "PRESENT?",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionFakeId: 7,
            }),
            expect.objectContaining({
                fakeId: 2,
                name: "SOME_CONFIGURATION_OPTION_VALUE",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionFakeId: 7,
            }),
        ])
    },
});

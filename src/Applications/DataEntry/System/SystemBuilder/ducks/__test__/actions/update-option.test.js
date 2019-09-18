import { UPDATE_OPTION } from "../../actions";
import { systemUpdate, systemOptionUpdate, detailOptionUpdate, configurationOptionUpdate } from "../../schemas";

function testUpdateOption({
    systemInput,
    payload,
    systemOutput,
}) {
    describe(`Testing update options`, () => {
        const result = UPDATE_OPTION({ ...systemUpdate, ...systemInput }, payload);
        test(`Result should be correct for ${payload.name}`, () => {
            console.log({ payload, systemOutput, result: result.systemOptions });
            expect(result).toMatchObject(systemOutput);
        });
    });
}

//System Options
testUpdateOption({
    systemInput: {},
    payload: {
        id: 1,
        name: "JOINERY",
        __typename: "SystemOption",
        parentValueId: 5,
        defaultOptionValueId: 7,
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "JOINERY",
                __typename: "SystemOption",
                parentSystemOptionValueId: 5,
                defaultSystemOptionValueId: 7,
            })
        ])
    },
});

testUpdateOption({
    systemInput: {
        systemOptions: [
            {
                ...systemOptionUpdate,
                id: 1,
                name: "SET",
                __typename: "SystemOption",
                parentSystemOptionValueId: 2,
                defaultSystemOptionValueId: 7,
            },
        ],
    },
    payload: {
        id: 1,
        name: "JOINERY",
        __typename: "SystemOption",
        parentValueFakeId: 5,
        defaultOptionValueFakeId: 11,
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "JOINERY",
                __typename: "SystemOption",
                parentSystemOptionValueId: undefined,
                parentSystemOptionValueFakeId: 5,
                defaultSystemOptionValueId: undefined,
                defaultSystemOptionValueFakeId: 11,
            }),
        ])
    },
});

testUpdateOption({
    systemInput: {
        systemOptions: [
            {
                ...systemOptionUpdate,
                id: 1,
                name: "SET",
                __typename: "SystemOption",
                parentSystemOptionValueFakeId: 2,
                defaultOptionValueFakeId: 9,
            },
        ],
    },
    payload: {
        id: 1,
        name: "JOINERY",
        __typename: "SystemOption",
        parentValueId: 5,
        defaultOptionValueId: 7,
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "JOINERY",
                __typename: "SystemOption",
                parentSystemOptionValueFakeId: undefined,
                parentSystemOptionValueId: 5,
                defaultSystemOptionValueId: 7,
                defaultSystemOptionValueFakeId: undefined,
            }),
        ])
    },
});

testUpdateOption({
    systemInput: {
        systemOptions: [
            {
                ...systemOptionUpdate,
                id: 1,
                name: "SET",
                __typename: "SystemOption",
                parentSystemOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 2,
        name: "JOINERY",
        __typename: "SystemOption",
        parentValueId: 5,
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "SET",
                __typename: "SystemOption",
                parentSystemOptionValueId: 5,
            }),
            expect.objectContaining({
                id: 2,
                name: "JOINERY",
                __typename: "SystemOption",
                parentSystemOptionValueId: 5,
            }),
        ])
    },
});

testUpdateOption({
    systemInput: {
        systemOptions: [
            {
                ...systemOptionUpdate,
                fakeId: 1,
                name: "SET",
                __typename: "SystemOption",
                parentSystemOptionValueFakeId: 5,
            },
        ],
    },
    payload: {
        fakeId: 2,
        name: "JOINERY",
        __typename: "SystemOption",
        parentValueFakeId: 5,
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "SET",
                __typename: "SystemOption",
                parentSystemOptionValueFakeId: 5,
            }),
            expect.objectContaining({
                fakeId: 2,
                name: "JOINERY",
                __typename: "SystemOption",
                parentSystemOptionValueFakeId: 5,
            }),
        ])
    },
});

//Detail Options
testUpdateOption({
    systemInput: {},
    payload: {
        id: 1,
        name: "GLAZING",
        __typename: "DetailOption",
        parentValueId: 3,
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "GLAZING",
                __typename: "DetailOption",
                parentDetailOptionValueId: 3,
            }),
        ])
    },
});

testUpdateOption({
    systemInput: {
        detailOptions: [
            {
                ...detailOptionUpdate,
                id: 1,
                name: "STOPS",
                __typename: "DetailOption",
                defaultDetailOptionValueId: 4,
                parentSystemDetailId: 3,
            },
        ],
    },
    payload: {
        id: 1,
        name: "GLAZING",
        __typename: "DetailOption",
        parentTypeId: 3,
        defaultOptionValueId: 2,
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "GLAZING",
                __typename: "DetailOption",
                parentSystemDetailId: 3,
                defaultDetailOptionValueId: 2,
            }),
        ])
    },
});

testUpdateOption({
    systemInput: {
        detailOptions: [
            {
                ...detailOptionUpdate,
                id: 1,
                name: "STOPS",
                __typename: "DetailOption",
                parentSystemDetailFakeId: 3,
            },
        ],
    },
    payload: {
        id: 2,
        name: "GLAZING",
        __typename: "DetailOption",
        parentTypeFakeId: 3,
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "STOPS",
                __typename: "DetailOption",
                parentSystemDetailFakeId: 3,
            }),
            expect.objectContaining({
                id: 2,
                name: "GLAZING",
                __typename: "DetailOption",
                parentSystemDetailFakeId: 3,
            }),
        ])
    },
});

testUpdateOption({
    systemInput: {
        detailOptions: [
            {
                ...detailOptionUpdate,
                fakeId: 1,
                name: "STOPS",
                __typename: "DetailOption",
                parentDetailOptionValueId: 3,
            },
        ],
    },
    payload: {
        fakeId: 2,
        name: "GLAZING",
        __typename: "DetailOption",
        parentValueId: 3,
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "STOPS",
                __typename: "DetailOption",
                parentDetailOptionValueId: 3,
            }),
            expect.objectContaining({
                fakeId: 2,
                name: "GLAZING",
                __typename: "DetailOption",
                parentDetailOptionValueId: 3,
            }),
        ])
    },
});

//Configuration Options
testUpdateOption({
    systemInput: {},
    payload: {
        id: 1,
        name: "SILL_FLASHING",
        __typename: "ConfigurationOption",
        parentValueId: 7,
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "SILL_FLASHING",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 7,
            }),
        ])
    },
});

testUpdateOption({
    systemInput: {
        configurationOptions: [
            {
                ...configurationOptionUpdate,
                id: 1,
                name: "COMPENSATING_RECEPTOR",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 7,
            },
        ],
    },
    payload: {
        id: 1,
        name: "SILL_FLASHING",
        __typename: "ConfigurationOption",
        parentValueId: 7,
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "SILL_FLASHING",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 7,
            }),
        ])
    },
});

testUpdateOption({
    systemInput: {
        configurationOptions: [
            {
                ...configurationOptionUpdate,
                id: 1,
                name: "COMPENSATING_RECEPTOR",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 7,
            },
        ],
    },
    payload: {
        id: 2,
        name: "SILL_FLASHING",
        __typename: "ConfigurationOption",
        parentValueId: 7,
        defaultOptionValueId: 2
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "COMPENSATING_RECEPTOR",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 7,
            }),
            expect.objectContaining({
                id: 2,
                name: "SILL_FLASHING",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 7,
                defaultConfigurationOptionValueId: 2
            }),
        ])
    },
});

testUpdateOption({
    systemInput: {
        configurationOptions: [
            {
                ...configurationOptionUpdate,
                fakeId: 1,
                name: "COMPENSATING_RECEPTOR",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 7,
            },
        ],
    },
    payload: {
        fakeId: 2,
        name: "SILL_FLASHING",
        __typename: "ConfigurationOption",
        parentValueId: 7,
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "COMPENSATING_RECEPTOR",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 7,
            }),
            expect.objectContaining({
                fakeId: 2,
                name: "SILL_FLASHING",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 7,
            }),
        ])
    },
});

import { UPDATE_OPTION } from "../../actions";
import { systemUpdate, systemOptionUpdate, detailOptionUpdate, configurationOptionUpdate } from "../../schemas";
import "../../../../../../../../public";

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
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "JOINERY",
                __typename: "SystemOption",
                parentSystemOptionValueId: 5,
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
                parentSystemOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 1,
        name: "JOINERY",
        __typename: "SystemOption",
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
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
                parentSystemOptionValueId: 5,
            },
        ],
    },
    payload: {
        fakeId: 2,
        name: "JOINERY",
        __typename: "SystemOption",
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "SET",
                __typename: "SystemOption",
                parentSystemOptionValueId: 5,
            }),
            expect.objectContaining({
                fakeId: 2,
                name: "JOINERY",
                __typename: "SystemOption",
                parentSystemOptionValueId: 5,
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
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "GLAZING",
                __typename: "DetailOption",
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
            },
        ],
    },
    payload: {
        id: 1,
        name: "GLAZING",
        __typename: "DetailOption",
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "GLAZING",
                __typename: "DetailOption",
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
            },
        ],
    },
    payload: {
        id: 2,
        name: "GLAZING",
        __typename: "DetailOption",
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "STOPS",
                __typename: "DetailOption",
            }),
            expect.objectContaining({
                id: 2,
                name: "GLAZING",
                __typename: "DetailOption",
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
            },
        ],
    },
    payload: {
        fakeId: 2,
        name: "GLAZING",
        __typename: "DetailOption",
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "STOPS",
                __typename: "DetailOption",
            }),
            expect.objectContaining({
                fakeId: 2,
                name: "GLAZING",
                __typename: "DetailOption",
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
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "SILL_FLASHING",
                __typename: "ConfigurationOption",
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
            },
        ],
    },
    payload: {
        id: 1,
        name: "SILL_FLASHING",
        __typename: "ConfigurationOption",
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "SILL_FLASHING",
                __typename: "ConfigurationOption",
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
            },
        ],
    },
    payload: {
        id: 2,
        name: "SILL_FLASHING",
        __typename: "ConfigurationOption",
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "COMPENSATING_RECEPTOR",
                __typename: "ConfigurationOption",
            }),
            expect.objectContaining({
                id: 2,
                name: "SILL_FLASHING",
                __typename: "ConfigurationOption",
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
            },
        ],
    },
    payload: {
        fakeId: 2,
        name: "SILL_FLASHING",
        __typename: "ConfigurationOption",
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "COMPENSATING_RECEPTOR",
                __typename: "ConfigurationOption",
            }),
            expect.objectContaining({
                fakeId: 2,
                name: "SILL_FLASHING",
                __typename: "ConfigurationOption",
            }),
        ])
    },
});

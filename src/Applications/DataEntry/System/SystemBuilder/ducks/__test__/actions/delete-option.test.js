import { DELETE_OPTION } from "../../actions";
import { systemUpdate, systemOptionUpdate, detailOptionUpdate, configurationOptionUpdate } from "../../schemas";
import "../../../../../../../../public";

function testUpdateOption({
    systemInput,
    payload,
    systemOutput,
}) {
    describe(`Testing update options`, () => {
        const result = DELETE_OPTION({ ...systemUpdate, ...systemInput }, payload);

        console.log(result);

        test(`Result should be correct for ${payload.name}`, () => {
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
        systemOptions: [],
        systemOptionIdsToDelete: [1]
    },
});

testUpdateOption({
    systemInput: {
        systemOptions: [{
            fakeId: 1,
            name: "JOINERY",
            __typename: "SystemOption",
            parentSystemOptionValueId: 5,
        }]
    },
    payload: {
        fakeId: 1,
        name: "JOINERY",
        __typename: "SystemOption",
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemOptions: [],
        systemOptionIdsToDelete: []
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
        name: "SET",
        __typename: "SystemOption",
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemOptions: [],
        systemOptionIdsToDelete: [1]
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
        id: 2,
        name: "JOINERY",
        __typename: "SystemOption",
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "SET",
                __typename: "SystemOption",
                parentSystemOptionValueId: 5,
            }),
        ]),
        systemOptionIdsToDelete: [2]
    },
});

//Detail Options
testUpdateOption({
    systemInput: {},
    payload: {
        id: 1,
        name: "JOINERY",
        __typename: "DetailOption",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        detailOptionIdsToDelete: [1]
    },
});

testUpdateOption({
    systemInput: {
        detailOptions: [{
            fakeId: 1,
            name: "GLAZING",
            __typename: "DetailOption",
            parentDetailOptionValueId: 5,
        }]
    },
    payload: {
        fakeId: 1,
        name: "GLAZING",
        __typename: "DetailOption",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        detailOptions: [],
        detailOptionIdsToDelete: []
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
                parentDetailOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 1,
        name: "STOPS",
        __typename: "DetailOption",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        detailOptions: [],
        detailOptionIdsToDelete: [1]
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
                parentDetailOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 2,
        name: "GLAZING",
        __typename: "DetailOption",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "STOPS",
                __typename: "DetailOption",
                parentDetailOptionValueId: 5,
            }),
        ]),
        detailOptionIdsToDelete: [2]
    },
});

//Configuration Options
testUpdateOption({
    systemInput: {},
    payload: {
        id: 1,
        name: "COMPENSATING_RECEPTOR",
        __typename: "ConfigurationOption",
        parentConfigurationOptionValueId: 5,
    },
    systemOutput: {
        configurationOptionIdsToDelete: [1]
    },
});

testUpdateOption({
    systemInput: {
        configurationOptions: [{
            fakeId: 1,
            name: "COMPENSATING_RECEPTOR",
            __typename: "ConfigurationOption",
            parentConfigurationOptionValueId: 5,
        }]
    },
    payload: {
        fakeId: 1,
        name: "COMPENSATING_RECEPTOR",
        __typename: "ConfigurationOption",
        parentConfigurationOptionValueId: 5,
    },
    systemOutput: {
        configurationOptions: [],
        configurationOptionIdsToDelete: []
    },
});

testUpdateOption({
    systemInput: {
        configurationOptions: [
            {
                ...configurationOptionUpdate,
                id: 1,
                name: "SILL_FLASHING",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 1,
        name: "SILL_FLASHING",
        __typename: "ConfigurationOption",
        parentConfigurationOptionValueId: 5,
    },
    systemOutput: {
        configurationOptions: [],
        configurationOptionIdsToDelete: [1]
    },
});

testUpdateOption({
    systemInput: {
        configurationOptions: [
            {
                ...configurationOptionUpdate,
                fakeId: 1,
                name: "SILL_FLASHING",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 2,
        name: "COMPENSATING_RECEPTOR",
        __typename: "ConfigurationOption",
        parentConfigurationOptionValueId: 5,
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "SILL_FLASHING",
                __typename: "ConfigurationOption",
                parentConfigurationOptionValueId: 5,
            }),
        ]),
        configurationOptionIdsToDelete: [2]
    },
});

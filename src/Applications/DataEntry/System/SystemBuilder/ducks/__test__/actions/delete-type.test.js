import { DELETE_TYPE } from "../../actions";
import { systemUpdate } from "../../schemas";

function testDeleteType({
    systemInput,
    payload,
    systemOutput,
}) {
    describe(`Testing update options`, () => {
        const result = DELETE_TYPE({ ...systemUpdate, ...systemInput }, payload);

        test(`Result should be correct for ${payload.name}`, () => {
            expect(result).toMatchObject(systemOutput);
        });
    });
}

//System OptionValues
testDeleteType({
    systemInput: {},
    payload: {
        id: 1,
        name: "CT_A",
        __typename: "SystemDetail",
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemDetails: [],
        systemDetailIdsToDelete: [1]
    },
});

testDeleteType({
    systemInput: {
        systemDetails: [{
            fakeId: 1,
            name: "CT_A",
            __typename: "SystemDetail",
            parentSystemOptionValueId: 5,
        }]
    },
    payload: {
        fakeId: 1,
        name: "CT_A",
        __typename: "SystemDetail",
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemDetails: [],
        systemDetailIdsToDelete: []
    },
});

testDeleteType({
    systemInput: {
        systemDetails: [
            {
                id: 1,
                name: "SILL",
                __typename: "SystemDetail",
                parentSystemOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 1,
        name: "SILL",
        __typename: "SystemDetail",
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemDetails: [],
        systemDetailIdsToDelete: [1]
    },
});

testDeleteType({
    systemInput: {
        systemDetails: [
            {
                fakeId: 1,
                name: "SILL",
                __typename: "SystemDetail",
                parentSystemOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 2,
        name: "CT_A",
        __typename: "SystemDetail",
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "SILL",
                __typename: "SystemDetail",
                parentSystemOptionValueId: 5,
            }),
        ]),
        systemDetailIdsToDelete: [2]
    },
});

//Detail OptionValues
testDeleteType({
    systemInput: {},
    payload: {
        id: 1,
        name: "CT_A",
        __typename: "SystemConfiguration",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        systemConfigurationIdsToDelete: [1]
    },
});

testDeleteType({
    systemInput: {
        systemConfigurations: [{
            fakeId: 1,
            name: "CT_2",
            __typename: "SystemConfiguration",
            parentDetailOptionValueId: 5,
        }]
    },
    payload: {
        fakeId: 1,
        name: "CT_2",
        __typename: "SystemConfiguration",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        systemConfigurations: [],
        systemConfigurationIdsToDelete: []
    },
});

testDeleteType({
    systemInput: {
        systemConfigurations: [
            {
                id: 1,
                name: "DOWN",
                __typename: "SystemConfiguration",
                parentDetailOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 1,
        name: "DOWN",
        __typename: "SystemConfiguration",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        systemConfigurations: [],
        systemConfigurationIdsToDelete: [1]
    },
});

testDeleteType({
    systemInput: {
        systemConfigurations: [
            {
                fakeId: 1,
                name: "DOWN",
                __typename: "SystemConfiguration",
                parentDetailOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 2,
        name: "CT_2",
        __typename: "SystemConfiguration",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        systemConfigurations: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "DOWN",
                __typename: "SystemConfiguration",
                parentDetailOptionValueId: 5,
            }),
        ]),
        systemConfigurationIdsToDelete: [2]
    },
});


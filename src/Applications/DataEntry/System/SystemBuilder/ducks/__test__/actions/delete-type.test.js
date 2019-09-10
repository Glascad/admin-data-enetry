import { DELETE_TYPE } from "../../actions";
import { systemUpdate } from "../../schemas";
import "../../../../../../../../public";

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
        __typename: "SystemDetailType",
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemDetailTypes: [],
        systemDetailTypeIdsToDelete: [1]
    },
});

testDeleteType({
    systemInput: {
        systemDetailTypes: [{
            fakeId: 1,
            name: "CT_A",
            __typename: "SystemDetailType",
            parentSystemOptionValueId: 5,
        }]
    },
    payload: {
        fakeId: 1,
        name: "CT_A",
        __typename: "SystemDetailType",
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemDetailTypes: [],
        systemDetailTypeIdsToDelete: []
    },
});

testDeleteType({
    systemInput: {
        systemDetailTypes: [
            {
                id: 1,
                name: "SILL",
                __typename: "SystemDetailType",
                parentSystemOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 1,
        name: "SILL",
        __typename: "SystemDetailType",
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemDetailTypes: [],
        systemDetailTypeIdsToDelete: [1]
    },
});

testDeleteType({
    systemInput: {
        systemDetailTypes: [
            {
                fakeId: 1,
                name: "SILL",
                __typename: "SystemDetailType",
                parentSystemOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 2,
        name: "CT_A",
        __typename: "SystemDetailType",
        parentSystemOptionValueId: 5,
    },
    systemOutput: {
        systemDetailTypes: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "SILL",
                __typename: "SystemDetailType",
                parentSystemOptionValueId: 5,
            }),
        ]),
        systemDetailTypeIdsToDelete: [2]
    },
});

//Detail OptionValues
testDeleteType({
    systemInput: {},
    payload: {
        id: 1,
        name: "CT_A",
        __typename: "SystemConfigurationType",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        systemConfigurationTypeIdsToDelete: [1]
    },
});

testDeleteType({
    systemInput: {
        systemConfigurationTypes: [{
            fakeId: 1,
            name: "CT_2",
            __typename: "SystemConfigurationType",
            parentDetailOptionValueId: 5,
        }]
    },
    payload: {
        fakeId: 1,
        name: "CT_2",
        __typename: "SystemConfigurationType",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        systemConfigurationTypes: [],
        systemConfigurationTypeIdsToDelete: []
    },
});

testDeleteType({
    systemInput: {
        systemConfigurationTypes: [
            {
                id: 1,
                name: "DOWN",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 1,
        name: "DOWN",
        __typename: "SystemConfigurationType",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        systemConfigurationTypes: [],
        systemConfigurationTypeIdsToDelete: [1]
    },
});

testDeleteType({
    systemInput: {
        systemConfigurationTypes: [
            {
                fakeId: 1,
                name: "DOWN",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueId: 5,
            },
        ],
    },
    payload: {
        id: 2,
        name: "CT_2",
        __typename: "SystemConfigurationType",
        parentDetailOptionValueId: 5,
    },
    systemOutput: {
        systemConfigurationTypes: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "DOWN",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueId: 5,
            }),
        ]),
        systemConfigurationTypeIdsToDelete: [2]
    },
});


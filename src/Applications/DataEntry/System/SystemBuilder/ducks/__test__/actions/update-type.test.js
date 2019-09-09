import { UPDATE_TYPE } from "../../actions";
import { systemUpdate, systemDetailTypeUpdate, systemConfigurationTypeUpdate } from "../../schemas";
import "../../../../../../../../public";

function testUpdateType({
    systemInput,
    payload,
    systemOutput,
}) {
    describe(`Testing update options`, () => {
        const result = UPDATE_TYPE({ ...systemUpdate, ...systemInput }, payload);
        test(`Result should be correct for ${payload.name}`, () => {
            expect(result).toMatchObject(systemOutput);
        });
    });
}

//System Detail Types
testUpdateType({
    systemInput: {},
    payload: {
        id: 1,
        name: "HEAD",
        __typename: "SystemDetailType",
        parentSystemOptionValueId: 3,
    },
    systemOutput: {
        systemDetailTypes: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "HEAD",
                __typename: "SystemDetailType",
                parentSystemOptionValueId: 3,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemDetailTypes: [
            {
                ...systemDetailTypeUpdate,
                id: 1,
                name: "SILL",
                __typename: "SystemDetailType",
                parentSystemOptionValueId: 3,
            },
        ],
    },
    payload: {
        id: 1,
        name: "HEAD",
        __typename: "SystemDetailType",
        parentSystemOptionValueId: 3,
    },
    systemOutput: {
        systemDetailTypes: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "HEAD",
                __typename: "SystemDetailType",
                parentSystemOptionValueId: 3,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemDetailTypes: [
            {
                ...systemDetailTypeUpdate,
                id: 1,
                name: "SILL",
                __typename: "SystemDetailType",
                parentSystemOptionValueId: 3,
            },
        ],
    },
    payload: {
        id: 2,
        name: "HEAD",
        __typename: "SystemDetailType",
        parentSystemOptionValueId: 3,
    },
    systemOutput: {
        systemDetailTypes: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "SILL",
                __typename: "SystemDetailType",
                parentSystemOptionValueId: 3,
            }),
            expect.objectContaining({
                id: 2,
                name: "HEAD",
                __typename: "SystemDetailType",
                parentSystemOptionValueId: 3,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemDetailTypes: [
            {
                ...systemDetailTypeUpdate,
                fakeId: 1,
                name: "SILL",
                __typename: "SystemDetailType",
                parentSystemOptionValueFakeId: 3,
            },
        ],
    },
    payload: {
        fakeId: 2,
        name: "HEAD",
        __typename: "SystemDetailType",
        parentSystemOptionValueFakeId: 3,
    },
    systemOutput: {
        systemDetailTypes: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "SILL",
                __typename: "SystemDetailType",
                parentSystemOptionValueFakeId: 3,
            }),
            expect.objectContaining({
                fakeId: 2,
                name: "HEAD",
                __typename: "SystemDetailType",
                parentSystemOptionValueFakeId: 3,
            }),
        ])
    },
});

// System Configuration Type
testUpdateType({
    systemInput: {},
    payload: {
        id: 1,
        name: "CONFIGURATION_TYPE_A",
        __typename: "SystemConfigurationType",
        parentDetailOptionValueId: 7,
    },
    systemOutput: {
        systemConfigurationTypes: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "CONFIGURATION_TYPE_A",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueId: 7,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemConfigurationTypes: [
            {
                ...systemConfigurationTypeUpdate,
                id: 1,
                name: "PRESENT?",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueId: 7,
            },
        ],
    },
    payload: {
        id: 1,
        name: "CONFIGURATION_TYPE_A",
        __typename: "SystemConfigurationType",
        parentDetailOptionValueId: 7,
    },
    systemOutput: {
        systemConfigurationTypes: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "CONFIGURATION_TYPE_A",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueId: 7,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemConfigurationTypes: [
            {
                ...systemConfigurationTypeUpdate,
                id: 1,
                name: "PRESENT?",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueId: 7,
            },
        ],
    },
    payload: {
        id: 2,
        name: "CONFIGURATION_TYPE_A",
        __typename: "SystemConfigurationType",
        parentDetailOptionValueId: 7,
    },
    systemOutput: {
        systemConfigurationTypes: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                name: "PRESENT?",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueId: 7,
            }),
            expect.objectContaining({
                id: 2,
                name: "CONFIGURATION_TYPE_A",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueId: 7,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemConfigurationTypes: [
            {
                ...systemConfigurationTypeUpdate,
                fakeId: 1,
                name: "PRESENT?",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueFakeId: 7,
            },
        ],
    },
    payload: {
        fakeId: 2,
        name: "CONFIGURATION_TYPE_A",
        __typename: "SystemConfigurationType",
        parentDetailOptionValueFakeId: 7,
    },
    systemOutput: {
        systemConfigurationTypes: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "PRESENT?",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueFakeId: 7,
            }),
            expect.objectContaining({
                fakeId: 2,
                name: "CONFIGURATION_TYPE_A",
                __typename: "SystemConfigurationType",
                parentDetailOptionValueFakeId: 7,
            }),
        ])
    },
});

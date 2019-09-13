import { UPDATE_TYPE } from "../../actions";
import { systemUpdate, systemDetailUpdate, systemConfigurationUpdate } from "../../schemas";

function testUpdateType({
    systemInput,
    payload,
    systemOutput,
}) {
    describe(`Testing update options`, () => {
        const result = UPDATE_TYPE({ ...systemUpdate, ...systemInput }, payload);
        test(`Result should be correct for ${payload.type}`, () => {
            expect(result).toMatchObject(systemOutput);
        });
    });
}

//System Detail Types
testUpdateType({
    systemInput: {},
    payload: {
        id: 1,
        type: "HEAD",
        __typename: "SystemDetail",
        // parentSystemOptionValueId: 3,
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                detailType: "HEAD",
                __typename: "SystemDetail",
                // parentSystemOptionValueId: 3,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemDetails: [
            {
                ...systemDetailUpdate,
                id: 1,
                detailType: "SILL",
                __typename: "SystemDetail",
                parentSystemOptionValueId: 3,
            },
        ],
    },
    payload: {
        id: 1,
        type: "HEAD",
        __typename: "SystemDetail",
        // parentSystemOptionValueId: 3,
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                detailType: "HEAD",
                __typename: "SystemDetail",
                // parentSystemOptionValueId: 3,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemDetails: [
            {
                ...systemDetailUpdate,
                id: 1,
                detailType: "SILL",
                __typename: "SystemDetail",
                parentSystemOptionValueId: 3,
            },
        ],
    },
    payload: {
        id: 2,
        type: "HEAD",
        __typename: "SystemDetail",
        // parentSystemOptionValueId: 3,
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                detailType: "SILL",
                __typename: "SystemDetail",
                parentSystemOptionValueId: 3,
            }),
            expect.objectContaining({
                id: 2,
                detailType: "HEAD",
                __typename: "SystemDetail",
                // parentSystemOptionValueId: 3,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemDetails: [
            {
                ...systemDetailUpdate,
                fakeId: 1,
                detailType: "SILL",
                __typename: "SystemDetail",
                parentSystemOptionValueFakeId: 3,
            },
        ],
    },
    payload: {
        fakeId: 2,
        type: "HEAD",
        __typename: "SystemDetail",
        // parentSystemOptionValueFakeId: 3,
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                detailType: "SILL",
                __typename: "SystemDetail",
                parentSystemOptionValueFakeId: 3,
            }),
            expect.objectContaining({
                fakeId: 2,
                detailType: "HEAD",
                __typename: "SystemDetail",
                // parentSystemOptionValueFakeId: 3,
            }),
        ])
    },
});

// System Configuration Type
testUpdateType({
    systemInput: {},
    payload: {
        id: 1,
        type: "CONFIGURATION_TYPE_A",
        __typename: "SystemConfiguration",
        // parentDetailOptionValueId: 7,
    },
    systemOutput: {
        systemConfigurations: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                configurationType: "CONFIGURATION_TYPE_A",
                __typename: "SystemConfiguration",
                // parentDetailOptionValueId: 7,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemConfigurations: [
            {
                ...systemConfigurationUpdate,
                id: 1,
                configurationType: "PRESENT?",
                __typename: "SystemConfiguration",
                parentDetailOptionValueId: 7,
            },
        ],
    },
    payload: {
        id: 1,
        type: "CONFIGURATION_TYPE_A",
        __typename: "SystemConfiguration",
        // parentDetailOptionValueId: 7,
    },
    systemOutput: {
        systemConfigurations: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                configurationType: "CONFIGURATION_TYPE_A",
                __typename: "SystemConfiguration",
                // parentDetailOptionValueId: 7,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemConfigurations: [
            {
                ...systemConfigurationUpdate,
                id: 1,
                configurationType: "PRESENT?",
                __typename: "SystemConfiguration",
                parentDetailOptionValueId: 7,
            },
        ],
    },
    payload: {
        id: 2,
        type: "CONFIGURATION_TYPE_A",
        __typename: "SystemConfiguration",
        // parentDetailOptionValueId: 7,
    },
    systemOutput: {
        systemConfigurations: expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                configurationType: "PRESENT?",
                __typename: "SystemConfiguration",
                parentDetailOptionValueId: 7,
            }),
            expect.objectContaining({
                id: 2,
                configurationType: "CONFIGURATION_TYPE_A",
                __typename: "SystemConfiguration",
                // parentDetailOptionValueId: 7,
            }),
        ])
    },
});

testUpdateType({
    systemInput: {
        systemConfigurations: [
            {
                ...systemConfigurationUpdate,
                fakeId: 1,
                configurationType: "PRESENT?",
                __typename: "SystemConfiguration",
                parentDetailOptionValueFakeId: 7,
            },
        ],
    },
    payload: {
        fakeId: 2,
        type: "CONFIGURATION_TYPE_A",
        __typename: "SystemConfiguration",
        // parentDetailOptionValueFakeId: 7,
    },
    systemOutput: {
        systemConfigurations: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                configurationType: "PRESENT?",
                __typename: "SystemConfiguration",
                parentDetailOptionValueFakeId: 7,
            }),
            expect.objectContaining({
                fakeId: 2,
                configurationType: "CONFIGURATION_TYPE_A",
                __typename: "SystemConfiguration",
                // parentDetailOptionValueFakeId: 7,
            }),
        ])
    },
});

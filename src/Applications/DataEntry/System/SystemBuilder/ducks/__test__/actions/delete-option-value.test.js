import { DELETE_OPTION_VALUE } from "../../actions";
import { systemUpdate, systemOptionValueUpdate, detailOptionValueUpdate, configurationOptionValueUpdate } from "../../schemas";
import "../../../../../../../../public";

function testDeleteOptionValue({
    systemInput,
    payload,
    systemOutput,
}) {
    describe(`Testing update options`, () => {
        const result = DELETE_OPTION_VALUE({ ...systemUpdate, ...systemInput }, payload);

        test(`Result should be correct for ${payload.name}`, () => {
            expect(result).toMatchObject(systemOutput);
        });
    });
}

//System OptionValues
testDeleteOptionValue({
    systemInput: {},
    payload: {
        id: 1,
        name: "FRONT",
        __typename: "SystemOptionValue",
        parentSystemOptionId: 5,
    },
    systemOutput: {
        systemOptionValues: [],
        systemOptionValueIdsToDelete: [1]
    },
});

testDeleteOptionValue({
    systemInput: {
        systemOptionValues: [{
            fakeId: 1,
            name: "FRONT",
            __typename: "SystemOptionValue",
            parentSystemOptionId: 5,
        }]
    },
    payload: {
        fakeId: 1,
        name: "FRONT",
        __typename: "SystemOptionValue",
        parentSystemOptionId: 5,
    },
    systemOutput: {
        systemOptionValues: [],
        systemOptionValueIdsToDelete: []
    },
});

testDeleteOptionValue({
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
        name: "CENTER",
        __typename: "SystemOptionValue",
        parentSystemOptionId: 5,
    },
    systemOutput: {
        systemOptionValues: [],
        systemOptionValueIdsToDelete: [1]
    },
});

testDeleteOptionValue({
    systemInput: {
        systemOptionValues: [
            {
                ...systemOptionValueUpdate,
                fakeId: 1,
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
                fakeId: 1,
                name: "CENTER",
                __typename: "SystemOptionValue",
                parentSystemOptionId: 5,
            }),
        ]),
        systemOptionValueIdsToDelete: [2]
    },
});

//Detail OptionValues
testDeleteOptionValue({
    systemInput: {},
    payload: {
        id: 1,
        name: "FRONT",
        __typename: "DetailOptionValue",
        parentDetailOptionValueValueId: 5,
    },
    systemOutput: {
        detailOptionValueIdsToDelete: [1]
    },
});

testDeleteOptionValue({
    systemInput: {
        detailOptionValues: [{
            fakeId: 1,
            name: "UP",
            __typename: "DetailOptionValue",
            parentDetailOptionValueValueId: 5,
        }]
    },
    payload: {
        fakeId: 1,
        name: "UP",
        __typename: "DetailOptionValue",
        parentDetailOptionValueValueId: 5,
    },
    systemOutput: {
        detailOptionValues: [],
        detailOptionValueIdsToDelete: []
    },
});

testDeleteOptionValue({
    systemInput: {
        detailOptionValues: [
            {
                ...detailOptionValueUpdate,
                id: 1,
                name: "DOWN",
                __typename: "DetailOptionValue",
                parentDetailOptionValueValueId: 5,
            },
        ],
    },
    payload: {
        id: 1,
        name: "DOWN",
        __typename: "DetailOptionValue",
        parentDetailOptionValueValueId: 5,
    },
    systemOutput: {
        detailOptionValues: [],
        detailOptionValueIdsToDelete: [1]
    },
});

testDeleteOptionValue({
    systemInput: {
        detailOptionValues: [
            {
                ...detailOptionValueUpdate,
                fakeId: 1,
                name: "DOWN",
                __typename: "DetailOptionValue",
                parentDetailOptionValueValueId: 5,
            },
        ],
    },
    payload: {
        id: 2,
        name: "UP",
        __typename: "DetailOptionValue",
        parentDetailOptionValueValueId: 5,
    },
    systemOutput: {
        detailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "DOWN",
                __typename: "DetailOptionValue",
                parentDetailOptionValueValueId: 5,
            }),
        ]),
        detailOptionValueIdsToDelete: [2]
    },
});

//Configuration OptionValues
testDeleteOptionValue({
    systemInput: {},
    payload: {
        id: 1,
        name: "STANDARD_DUTY",
        __typename: "ConfigurationOptionValue",
        parentConfigurationOptionValueValueId: 5,
    },
    systemOutput: {
        configurationOptionValueIdsToDelete: [1]
    },
});

testDeleteOptionValue({
    systemInput: {
        configurationOptionValues: [{
            fakeId: 1,
            name: "STANDARD_DUTY",
            __typename: "ConfigurationOptionValue",
            parentConfigurationOptionValueValueId: 5,
        }]
    },
    payload: {
        fakeId: 1,
        name: "STANDARD_DUTY",
        __typename: "ConfigurationOptionValue",
        parentConfigurationOptionValueValueId: 5,
    },
    systemOutput: {
        configurationOptionValues: [],
        configurationOptionValueIdsToDelete: []
    },
});

testDeleteOptionValue({
    systemInput: {
        configurationOptionValues: [
            {
                ...configurationOptionValueUpdate,
                id: 1,
                name: "HIGH_PROFILE",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionValueValueId: 5,
            },
        ],
    },
    payload: {
        id: 1,
        name: "HIGH_PROFILE",
        __typename: "ConfigurationOptionValue",
        parentConfigurationOptionValueValueId: 5,
    },
    systemOutput: {
        configurationOptionValues: [],
        configurationOptionValueIdsToDelete: [1]
    },
});

testDeleteOptionValue({
    systemInput: {
        configurationOptionValues: [
            {
                ...configurationOptionValueUpdate,
                fakeId: 1,
                name: "HIGH_PROFILE",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionValueValueId: 5,
            },
        ],
    },
    payload: {
        id: 2,
        name: "STANDARD_DUTY",
        __typename: "ConfigurationOptionValue",
        parentConfigurationOptionValueValueId: 5,
    },
    systemOutput: {
        configurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                name: "HIGH_PROFILE",
                __typename: "ConfigurationOptionValue",
                parentConfigurationOptionValueValueId: 5,
            }),
        ]),
        configurationOptionValueIdsToDelete: [2]
    },
});

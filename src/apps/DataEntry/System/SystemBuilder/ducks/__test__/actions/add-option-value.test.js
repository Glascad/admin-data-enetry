import ADD_OPTION_VALUE from "../../actions/add-option-value";
import { systemUpdate } from "../../schemas";

function testAddOptionValue({
    systemInput,
    payload,
    systemOutput,
}) {
    describe('testing add option value', () => {
        const result = ADD_OPTION_VALUE({ ...systemUpdate, ...systemInput }, payload);
        test('result should have correct shape', () => {
            expect(result).toMatchObject(systemOutput)
        });
    });
}

testAddOptionValue({
    systemInput: {},
    payload: {
        parentOptionId: 3,
        __typename: "SystemOptionValue",
    },
    systemOutput: {
        systemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionId: 3,
                __typename: "SystemOptionValue",
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {},
    payload: {
        parentOptionFakeId: 3,
        __typename: "DetailOptionValue",
        name: "UP",
    },
    systemOutput: {
        detailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentDetailOptionFakeId: 3,
                __typename: "DetailOptionValue",
                name: "UP",
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {},
    payload: {
        parentOptionFakeId: 2,
        __typename: "ConfigurationOptionValue",
        name: "DOWN",
    },
    systemOutput: {
        configurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentConfigurationOptionFakeId: 2,
                __typename: "ConfigurationOptionValue",
                name: "DOWN",
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {
        configurationOptionValues: [
            {
                parentConfigurationOptionFakeId: 1,
                name: "DOWN",
            },
        ],
    },
    payload: {
        parentOptionFakeId: 1,
        __typename: "ConfigurationOptionValue",
        name: "UP",
    },
    systemOutput: {
        configurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentConfigurationOptionFakeId: 1,
                fakeId: expect.any(Number),
                name: "UP",
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {
        detailOptionValues: [
            {
                parentDetailOptionFakeId: 1,
                fakeId: 1,
                name: "Down",
            },
        ],
    },
    payload: {
        parentOptionFakeId: 1,
        __typename: "DetailOptionValue",
        name: "UP",
    },
    systemOutput: {
        detailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentDetailOptionFakeId: 1,
                fakeId: expect.any(Number),
                name: "UP",
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {
        systemOptionValues: [
            {
                parentSystemOptionFakeId: 1,
                fakeId: 1,
                name: "UP",
            },
        ],
    },
    payload: {
        parentOptionId: 1,
        __typename: "SystemOptionValue",
        name: "UP",
    },
    systemOutput: {
        systemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionFakeId: 1,
                fakeId: expect.any(Number),
                name: "UP",
            }),
        ]),
    },
});

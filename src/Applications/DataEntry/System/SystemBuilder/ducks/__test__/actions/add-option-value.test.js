import ADD_OPTION_VALUE from "../../actions/add-option-value";
import { systemUpdate } from "../../schemas";
import "../../../../../../../../public";

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
    systemInput: {

    },
    payload: {
        optionId: 3,
        __typename: "SystemOptionValue",
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                id: 3,
                systemOptionValues: expect.arrayContaining([
                    expect.objectContaining({
                        __typename: "SystemOptionValue",
                    }),
                ]),
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {

    },
    payload: {
        optionFakeId: 3,
        __typename: "DetailOptionValue",
        name: "UP",
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 3,
                detailOptionValues: expect.arrayContaining([
                    expect.objectContaining({
                        __typename: "DetailOptionValue",
                        name: "UP",
                    }),
                ]),
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {},
    payload: {
        optionFakeId: 2,
        __typename: "ConfigurationOptionValue",
        name: "DOWN",
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 2,
                configurationOptionValues: expect.arrayContaining([
                    expect.objectContaining({
                        __typename: "ConfigurationOptionValue",
                        name: "DOWN",
                    }),
                ]),
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {
        configurationOptions: [
            {
                fakeId: 1,
                configurationOptionValues: [
                    {
                        fakeId: 1,
                        name: "UP",
                    },
                ],
            },
        ],
    },
    payload: {
        optionFakeId: 1,
        __typename: "ConfigurationOptionValue",
        name: "UP",
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                configurationOptionValues: expect.arrayContaining([
                    expect.objectContaining({
                        fakeId: expect.any(Number),
                        name: "UP",
                    }),
                ]),
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {
        detailOptions: [
            {
                fakeId: 1,
                detailOptionValues: [
                    {
                        fakeId: 1,
                        name: "UP",
                    },
                ],
            },
        ],
    },
    payload: {
        optionFakeId: 1,
        __typename: "DetailOptionValue",
        name: "UP",
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                detailOptionValues: expect.arrayContaining([
                    expect.objectContaining({
                        fakeId: expect.any(Number),
                        name: "UP",
                    }),
                ]),
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {
        systemOptions: [
            {
                fakeId: 1,
                systemOptionValues: [
                    {
                        fakeId: 1,
                        name: "UP",
                    },
                ],
            },
        ],
    },
    payload: {
        optionFakeId: 1,
        __typename: "SystemOptionValue",
        name: "UP",
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: 1,
                systemOptionValues: expect.arrayContaining([
                    expect.objectContaining({
                        fakeId: expect.any(Number),
                        name: "UP",
                    }),
                ]),
            }),
        ]),
    },
});

import { ADD_OPTION } from "../../actions";
import { systemUpdate } from '../../schemas';

function testAddOption({
    systemInput,
    payload,
    systemOutput,
}) {
    describe('testing add option', () => {
        const result = ADD_OPTION({ ...systemUpdate, ...systemInput }, payload);
        test('result should have correct values', () => {
            expect(result).toMatchObject(systemOutput);
        });
    });
}

testAddOption({
    systemInput: {},
    payload: {
        name: "SET",
        __typename: "SystemOption",
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: expect.any(Number),
                name: "SET",
                __typename: "SystemOption",
            }),
        ]),
    },
});

testAddOption({
    systemInput: {},
    payload: {
        name: "GLAZING",
        parentTypeId: 1,
        __typename: "DetailOption",
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                systemDetailTypeId: 1,
                fakeId: expect.any(Number),
                name: "GLAZING",
                __typename: "DetailOption",
            }),
        ]),
    },
});

testAddOption({
    systemInput: {},
    payload: {
        name: "STOPS",
        parentTypeId: 1,
        __typename: "ConfigurationOption",
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                systemConfigurationTypeId: 1,
                fakeId: expect.any(Number),
                name: "STOPS",
                __typename: "ConfigurationOption",
            }),
        ]),
    },
});

testAddOption({
    systemInput: {},
    payload: {
        parentOptionValueId: 1,
        name: "SET",
        __typename: "SystemOption",
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: expect.any(Number),
                parentSystemOptionValueId: 1,
                name: "SET",
                __typename: "SystemOption",
            }),
        ]),
    },
});

testAddOption({
    systemInput: {},
    payload: {
        parentTypeId: 1,
        name: "OTHER_OPTION",
        __typename: "DetailOption",
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: expect.any(Number),
                systemDetailTypeId: 1,
                name: "OTHER_OPTION",
                __typename: "DetailOption",
            }),
        ]),
    },
});

testAddOption({
    systemInput: {},
    payload: {
        parentOptionValueId: 1,
        name: "OPTION_TWO",
        __typename: "ConfigurationOption",
    },
    systemOutput: {
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: expect.any(Number),
                parentConfigurationOptionValueId: 1,
                name: "OPTION_TWO",
                __typename: "ConfigurationOption",
            }),
        ]),
    },
});

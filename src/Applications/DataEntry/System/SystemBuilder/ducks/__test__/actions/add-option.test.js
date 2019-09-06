import { ADD_OPTION } from "../../actions";
import { systemUpdate } from '../../schemas';

function testAddOption({
    systemInput,
    payload,
    systemOutput,
}) {
    describe('testing add option', () => {
        const result = ADD_OPTION({ systemUpdate, ...systemInput }, payload);
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
            }),
        ]),
    },
});

testAddOption({
    systemInput: {},
    payload: {
        name: "GLAZING",
        detailTypeId: 1,
        __typename: "DetailOption",
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                detailTypeId: 1,
                fakeId: expect.any(Number),
                name: "GLAZING",
            }),
        ]),
    },
});

testAddOption({
    systemInput: {},
    payload: {
        name: "GLAZING",
        configurationTypeId: 1,
        __typename: "ConfigurationOption",
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                configurationTypeId: 1,
                fakeId: expect.any(Number),
                name: "GLAZING",
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
            }),
        ]),
    },
});

testAddOption({
    systemInput: {},
    payload: {
        parentOptionValueId: 1,
        name: "GLAZING",
        __typename: "DetailOption",
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: expect.any(Number),
                parentDetailOptionValueId: 1,
                name: "GLAZING",
            }),
        ]),
    },
});

testAddOption({
    systemInput: {},
    payload: {
        parentOptionValueId: 1,
        name: "GLAZING",
        __typename: "ConfigurationOption",
    },
    systemOutput: {
        detailOptions: expect.arrayContaining([
            expect.objectContaining({
                fakeId: expect.any(Number),
                parentConfigurationOptionValueId: 1,
                name: "GLAZING",
            }),
        ]),
    },
});

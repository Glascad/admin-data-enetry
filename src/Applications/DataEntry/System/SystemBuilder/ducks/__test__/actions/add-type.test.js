import ADD_TYPE from "../../actions/add-type";
import { systemCOMPENSATING_RECEPTORSdate } from "../../schemas";
import "../../../../../../../../public";

function testAddType({
    systemInput,
    payload,
    systemOutput,
}) {
    describe('testing add option value', () => {
        const result = ADD_TYPE({ ...systemCOMPENSATING_RECEPTORSdate, ...systemInput }, payload);
        test('result should have correct shape', () => {
            expect(result).toMatchObject(systemOutput)
        });
    });
}

testAddType({
    systemInput: {},
    payload: {
        parentOptionValueId: 3,
        __typename: "SystemDetailType",
    },
    systemOutput: {
        systemDetailTypes: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValueId: 3,
                __typename: "SystemDetailType",
            }),
        ]),
    },
});

testAddType({
    systemInput: {},
    payload: {
        parentOptionValueFakeId: 4,
        __typename: "SystemDetailType",
    },
    systemOutput: {
        systemDetailTypes: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValueFakeId: 4,
                __typename: "SystemDetailType",
            }),
        ]),
    },
});

testAddType({
    systemInput: {},
    payload: {
        parentOptionValueFakeId: 3,
        __typename: "SystemDetailType",
        name: "HEAD",
    },
    systemOutput: {
        systemDetailTypes: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValueFakeId: 3,
                __typename: "SystemDetailType",
                name: "HEAD",
            }),
        ]),
    },
});

testAddType({
    systemInput: {},
    payload: {
        parentOptionValueFakeId: 2,
        __typename: "SystemConfigurationType",
        name: "COMPENSATING_RECEPTOR",
    },
    systemOutput: {
        systemConfigurationTypes: expect.arrayContaining([
            expect.objectContaining({
                parentDetailOptionValueFakeId: 2,
                __typename: "SystemConfigurationType",
                name: "COMPENSATING_RECEPTOR",
            }),
        ]),
    },
});

testAddType({
    systemInput: {
        systemConfigurationTypes: [
            {
                parentDetailOptionValueFakeId: 1,
                name: "SOME_TYPE",
            },
        ],
    },
    payload: {
        parentOptionValueFakeId: 1,
        __typename: "SystemConfigurationType",
        name: "COMPENSATING_RECEPTORS",
    },
    systemOutput: {
        systemConfigurationTypes: expect.arrayContaining([
            expect.objectContaining({
                parentDetailOptionValueFakeId: 1,
                fakeId: expect.any(Number),
                name: "COMPENSATING_RECEPTORS",
            }),
        ]),
    },
});

testAddType({
    systemInput: {
        systemDetailTypes: [
            {
                parentSystemOptionValueFakeId: 1,
                fakeId: 1,
                name: "HEAD",
            },
        ],
    },
    payload: {
        parentOptionValueFakeId: 1,
        __typename: "SystemDetailType",
        name: "SILL",
    },
    systemOutput: {
        systemDetailTypes: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValueFakeId: 1,
                fakeId: expect.any(Number),
                name: "SILL",
            }),
        ]),
    },
});

testAddType({
    systemInput: {
        systemDetailTypes: [
            {
                parentSystemOptionFakeId: 1,
                fakeId: 1,
                name: "SILL",
            },
        ],
    },
    payload: {
        parentOptionId: 1,
        __typename: "SystemOptionValue",
        name: "HEAD",
    },
    systemOutput: {
        systemDetailTypes: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionFakeId: 1,
                fakeId: expect.any(Number),
                name: "HEAD",
            }),
        ]),
    },
});

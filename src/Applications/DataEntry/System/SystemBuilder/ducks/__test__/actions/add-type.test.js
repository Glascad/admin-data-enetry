import ADD_TYPE from "../../actions/add-type";
import { systemCOMPENSATING_RECEPTORdate } from "../../schemas";

function testAddType({
    systemInput,
    payload,
    systemOutput,
}) {
    describe('testing add option value', () => {
        const result = ADD_TYPE({ ...systemCOMPENSATING_RECEPTORdate, ...systemInput }, payload);
        test('result should have correct shape', () => {
            expect(result).toMatchObject(systemOutput)
        });
    });
}

testAddType({
    systemInput: {},
    payload: {
        parentOptionValueId: 3,
        __typename: "SystemDetail",
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValueId: 3,
                __typename: "SystemDetail",
            }),
        ]),
    },
});

testAddType({
    systemInput: {},
    payload: {
        parentOptionValueFakeId: 4,
        __typename: "SystemDetail",
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValueFakeId: 4,
                __typename: "SystemDetail",
            }),
        ]),
    },
});

testAddType({
    systemInput: {},
    payload: {
        parentOptionValueFakeId: 3,
        __typename: "SystemDetail",
        type: "HEAD",
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValueFakeId: 3,
                __typename: "SystemDetail",
                detailType: "HEAD",
            }),
        ]),
    },
});

testAddType({
    systemInput: {},
    payload: {
        parentOptionValueFakeId: 2,
        __typename: "SystemConfiguration",
        type: "COMPENSATING_RECEPTOR",
    },
    systemOutput: {
        systemConfigurations: expect.arrayContaining([
            expect.objectContaining({
                parentDetailOptionValueFakeId: 2,
                __typename: "SystemConfiguration",
                configurationType: "COMPENSATING_RECEPTOR",
            }),
        ]),
    },
});

testAddType({
    systemInput: {
        systemConfigurations: [
            {
                parentDetailOptionValueFakeId: 1,
                configurationType: "SOME_TYPE",
            },
        ],
    },
    payload: {
        parentOptionValueFakeId: 1,
        __typename: "SystemConfiguration",
        type: "COMPENSATING_RECEPTOR",
    },
    systemOutput: {
        systemConfigurations: expect.arrayContaining([
            expect.objectContaining({
                parentDetailOptionValueFakeId: 1,
                fakeId: expect.any(Number),
                configurationType: "COMPENSATING_RECEPTOR",
            }),
        ]),
    },
});

testAddType({
    systemInput: {
        systemDetails: [
            {
                parentSystemOptionValueFakeId: 1,
                fakeId: 1,
                detailType: "HEAD",
            },
        ],
    },
    payload: {
        parentOptionValueFakeId: 1,
        __typename: "SystemDetail",
        type: "SILL",
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValueFakeId: 1,
                fakeId: expect.any(Number),
                detailType: "SILL",
            }),
        ]),
    },
});

testAddType({
    systemInput: {
        systemDetails: [
            {
                parentSystemOptionValueFakeId: 1,
                fakeId: 1,
                detailType: "SILL",
            },
        ],
    },
    payload: {
        parentOptionValueFakeId: 1,
        __typename: "SystemDetail",
        type: "HEAD",
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValueFakeId: 1,
                fakeId: expect.any(Number),
                detailType: "HEAD",
            }),
        ]),
    },
});

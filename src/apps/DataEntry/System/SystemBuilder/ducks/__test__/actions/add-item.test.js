import ADD_ITEM from "../../actions/add-item";
import sample1 from '../../../../../../../app-logic/__test__/sample-systems/sample1.json';

function testAddOptionValue({
    systemInput,
    payload,
    systemOutput,
}) {
    describe('testing add option value', () => {
        const result = ADD_ITEM({}, systemInput, payload);
        test('result should have correct shape', () => {
            expect(result).toMatchObject(systemOutput)
        });
    });
}

testAddOptionValue({
    systemInput: {},
    payload: {
        parentPath: "1.SET",
        name: "CENTER",
        __typename: "SystemOptionValue",
    },
    systemOutput: {
        systemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER",
                __typename: "SystemOptionValue",
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {
        systemOptionValues: [{
            path: "1.SET",
            __typename: "SystemOption",
        }]
    },
    payload: {
        parentPath: "1.SET",
        name: "CENTER",
        __typename: "SystemOptionValue",
    },
    systemOutput: {
        systemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER",
                __typename: "SystemOptionValue",
            }),
            expect.objectContaining({
                path: "1.SET",
                __typename: "SystemOption",
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {},
    payload: {
        parentPath: "1.SET.CENTER",
        name: "JOINERY",
        __typename: "SystemOption",
    },
    systemOutput: {
        systemOptions: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER.JOINERY",
                __typename: "SystemOption",
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {},
    payload: {
        parentPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
        name: "HEAD",
        __typename: "SystemDetail",
    },
    systemOutput: {
        systemDetails: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD",
                __typename: "SystemDetail",
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {},
    payload: {
        parentPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS",
        name: "DOWN",
        __typename: "DetailOptionValue",
    },
    systemOutput: {
        detailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN",
                __typename: "DetailOptionValue",
            }),
        ]),
    },
});

testAddOptionValue({
    systemInput: {},
    payload: {
        parentPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR.DURABILITY",
        name: "HIGH_PERFORMANCE",
        __typename: "ConfigurationOptionValue",
        optional: false,
    },
    systemOutput: {
        configurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
                __typename: "ConfigurationOptionValue",
                optional: false,
            }),
        ]),
    },
});
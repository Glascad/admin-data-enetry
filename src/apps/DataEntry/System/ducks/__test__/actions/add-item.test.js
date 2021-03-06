import ADD_ITEM from "../../actions/add-item";

function testAddItem({
    systemInput,
    payload,
    systemOutput,
}) {
    describe('testing add option value', () => {
        const result = ADD_ITEM(systemInput, payload);
        test('result should have correct shape', () => {
            expect(result).toMatchObject(systemOutput)
        });
    });
}

testAddItem({
    systemInput: {},
    payload: {
        parentSystemOptionPath: "1.SET",
        name: "CENTER",
        __typename: "SystemOptionValue",
    },
    systemOutput: {
        newSystemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionPath: "1.SET",
                name: "CENTER",
                __typename: "SystemOptionValue",
            }),
        ]),
    },
});

testAddItem({
    systemInput: {
        newSystemOption: [{
            name: "SET",
            __typename: "SystemOption",
        }]
    },
    payload: {
        parentSystemOptionPath: "1.SET",
        name: "CENTER",
        __typename: "SystemOptionValue",
    },
    systemOutput: {
        newSystemOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionPath: "1.SET",
                name: "CENTER",
                __typename: "SystemOptionValue",
            }),
        ]),
        newSystemOption: expect.arrayContaining([
            expect.objectContaining({
                name: "SET",
                __typename: "SystemOption",
            }),
        ]),
    },
});

testAddItem({
    systemInput: {},
    payload: {
        parentSystemOptionValuePath: "1.SET.CENTER",
        name: "JOINERY",
        __typename: "SystemOption",
    },
    systemOutput: {
        newSystemOptions: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValuePath: "1.SET.CENTER",
                name: "JOINERY",
                __typename: "SystemOption",
            }),
        ]),
    },
});

testAddItem({
    systemInput: {},
    payload: {
        parentSystemOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
        name: "HEAD",
        __typename: "SystemDetail",
    },
    systemOutput: {
        newSystemDetails: expect.arrayContaining([
            expect.objectContaining({
                parentSystemOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
                name: "HEAD",
                __typename: "SystemDetail",
            }),
        ]),
    },
});

testAddItem({
    systemInput: {},
    payload: {
        parentDetailOptionPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS",
        name: "DOWN",
        __typename: "DetailOptionValue",
    },
    systemOutput: {
        newDetailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentDetailOptionPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS",
                name: "DOWN",
                __typename: "DetailOptionValue",
            }),
        ]),
    },
});

testAddItem({
    systemInput: {},
    payload: {
        parentConfigurationOptionPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
        name: "HIGH_PERFORMANCE",
        __typename: "ConfigurationOptionValue",
        optional: false,
    },
    systemOutput: {
        newConfigurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentConfigurationOptionPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
                name: "HIGH_PERFORMANCE",
                __typename: "ConfigurationOptionValue",
                optional: false,
            }),
        ]),
    },
});

testAddItem({
    systemInput: {},
    payload: {
        parentConfigurationOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        name: "dxf4",
        __typename: "ConfigurationPart",
    },
    systemOutput: {
        newConfigurationParts: expect.arrayContaining([
            expect.objectContaining({
                parentConfigurationOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
                name: "dxf4",
                __typename: "ConfigurationPart",
                fakeId: expect.any(Number),
            }),
        ]),
    },
});

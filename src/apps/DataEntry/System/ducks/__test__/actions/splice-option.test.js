import { sampleSystemMap2 } from "../../../../../../app-logic/__test__/sample-systems";
import { SPLICE_OPTION } from "../../actions";
import { systemUpdate } from "../../schemas";

function testSpliceOption({
    systemInput,
    payload,
    expected
}) {
    describe(`testing the copy-item function`, () => {
        const result = SPLICE_OPTION({ ...systemUpdate, ...systemInput }, payload);
        // console.log({ result });
        test(`result is expected`, () => {
            expect(result).toMatchObject(expected);
        })
    })
}

// Splicing an option under the Head detail with many configuration Children
testSpliceOption({
    systemInput: {},
    payload: {
        selectedItem: {
            path: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
            __typename: "SystemDetail",
        },
        systemMap: sampleSystemMap2,
    },
    expected: {
        newDetailOptions: expect.arrayContaining([
            expect.objectContaining({
                parentSystemDetailPath: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
                name: "SELECT_OPTION",
                __typename: "DetailOption",
                fakeId: expect.any(Number),
            })
        ]),
        newDetailOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentDetailOptionPath: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.SELECT_OPTION",
                name: "EMPTY_VALUE",
                __typename: "DetailOptionValue",
                fakeId: expect.any(Number),
            }),
        ]),
        detailConfigurations: expect.arrayContaining([
            expect.objectContaining({
                path: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR",
                update: {
                    parentDetailOptionValuePath: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.SELECT_OPTION.EMPTY_VALUE"
                }
            }),
            expect.objectContaining({
                path: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD",
                update: {
                    parentDetailOptionValuePath: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.SELECT_OPTION.EMPTY_VALUE"
                }
            }),
            expect.objectContaining({
                path: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT",
                update: {
                    parentDetailOptionValuePath: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.SELECT_OPTION.EMPTY_VALUE"
                }
            }),
        ])
    }
});

// Splicing an option under the Head configuration with one Option Child
testSpliceOption({
    systemInput: {},
    payload: {
        selectedItem: {
            path: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD",
            __typename: "DetailConfiguration",
        },
        systemMap: sampleSystemMap2,
    },
    expected: {
        newConfigurationOptions: expect.arrayContaining([
            expect.objectContaining({
                parentDetailConfigurationPath: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD",
                name: "SELECT_OPTION",
                __typename: "ConfigurationOption",
                fakeId: expect.any(Number),
            })
        ]),
        newConfigurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentConfigurationOptionPath: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.SELECT_OPTION",
                name: "EMPTY_VALUE",
                __typename: "ConfigurationOptionValue",
                fakeId: expect.any(Number),
            }),
        ]),
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                path: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS",
                update: {
                    parentConfigurationOptionValuePath: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.SELECT_OPTION.EMPTY_VALUE"
                }
            }),
        ])
    }
});

// Splicing an option under Head Stops Down with only one Option Child
testSpliceOption({
    systemInput: {},
    payload: {
        selectedItem: {
            path: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN",
            __typename: "ConfigurationOptionValue",
        },
        systemMap: sampleSystemMap2,
    },
    expected: {
        newConfigurationOptions: expect.arrayContaining([
            expect.objectContaining({
                parentConfigurationOptionValuePath: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN",
                name: "SELECT_OPTION",
                __typename: "ConfigurationOption",
                fakeId: expect.any(Number),
            })
        ]),
        newConfigurationOptionValues: expect.arrayContaining([
            expect.objectContaining({
                parentConfigurationOptionPath: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.SELECT_OPTION",
                name: "EMPTY_VALUE",
                __typename: "ConfigurationOptionValue",
                fakeId: expect.any(Number),
            }),
        ]),
        configurationOptions: expect.arrayContaining([
            expect.objectContaining({
                path: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING",
                update: {
                    parentConfigurationOptionValuePath: "2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.SELECT_OPTION.EMPTY_VALUE"
                }
            }),
        ])
    }
});
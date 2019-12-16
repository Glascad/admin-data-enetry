import merge from "../merge";
import { defaultSystemSetUpdate } from "../schemas";
import SAMPLE_SYSTEM_SETS from './sample-query-results';
import { getUnknownPathFromObject } from "../../../../../../../app-logic/system-utils";


const {
    sample1: {
        systemSet: sample1SystemSet,
        system: sample1System,
    }
} = SAMPLE_SYSTEM_SETS;

function testMerge({
    description = '',
    _systemSet,
    system,
    systemSetUpdate,
    merged: {
        systemId,
        systemOptionValuePath,
        _systemSetOptionGroupValues = [],
        _systemSetDetails = [],
        _systemSetConfigurations = [],
        detailOptionValueCount,
        configurationOptionValueCount,
    },
}) {

    describe(`Testing merge function in system set: ${description}`, () => {
        const result = merge({ _systemSet }, { ...defaultSystemSetUpdate, ...systemSetUpdate }, system);
        console.log({
            _systemSetOptionGroupValues,
            resultOGV: result._systemSetOptionGroupValues
        })
        test('result should have correct systemId and systemOptionValuePath', () => {
            if (systemId) expect(result).toMatchObject({ systemId });
            if (systemOptionValuePath) expect(result).toMatchObject({ systemOptionValuePath });
        });
        test('result should have correct systemSetOptionGroupValues', () => {
            expect(result._systemSetOptionGroupValues).toEqual(
                expect.arrayContaining(
                    _systemSetOptionGroupValues.map(({ optionName, name }) => (
                        expect.objectContaining({
                            optionName,
                            name,
                        })
                    ))
                )
            );
        });
        if (detailOptionValueCount !== undefined) {
            test('detail option values should have correct length', () => {
                expect(result._systemSetDetails).toHaveProperty('length', detailOptionValueCount);
            });
        }
        test('result should have correct detail path and detail key', () => {
            _systemSetDetails.forEach(detail => {
                const [pathKey, path] = getUnknownPathFromObject(detail);
                expect(result._systemSetDetails
                    .find(({ [pathKey]: detailPath }) => detailPath === path))
                    .toEqual(detail);
            })
        });
        if (configurationOptionValueCount !== undefined) {
            test('configuration option values should have correct length', () => {
                expect(result._systemSetConfigurations).toHaveProperty('length', configurationOptionValueCount);
            });
        }
        test('result should have correct configuration path and configuration key', () => {
            // console.log({
            // _systemSetConfigurations,
            // resultSystemSetConfiguration: result._systemSetConfigurations,
            // });
            _systemSetConfigurations.forEach(configuration => {
                const [pathKey, path] = getUnknownPathFromObject(configuration);
                expect(result._systemSetConfigurations
                    .find(({ [pathKey]: configurationPath }) => configurationPath === path))
                    .toEqual(configuration);
            })
        });
    });
}

// update configurations
testMerge({
    description: "Updating configurations",
    _systemSet: sample1SystemSet,
    system: sample1System,
    systemSetUpdate: {
        configurations: [
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
            },
        ],
    },
    merged: {
        _systemSetConfigurations: [
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
                // __typename: "SystemSetConfiguration" // newly created systemSetConfigurations don't have __typename
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
                __typename: "SystemSetConfiguration"
            },
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL",
                __typename: "SystemSetConfiguration"
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE",
                __typename: "SystemSetConfiguration"
            },
        ],
    },
});

// adding configurations
testMerge({
    description: "Adding configurations",
    _systemSet: sample1SystemSet,
    system: sample1System,
    systemSetUpdate: {
        configurations: [
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.NEW_CONFIGURATION",
            },
        ],
    },
    merged: {
        _systemSetConfigurations: [
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.NEW_CONFIGURATION",
                // __typename: "SystemSetConfiguration"
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
                __typename: "SystemSetConfiguration"
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
                __typename: "SystemSetConfiguration"
            },
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL",
                __typename: "SystemSetConfiguration"
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE",
                __typename: "SystemSetConfiguration"
            }
        ],
    },
});

// update details (which adds it's required configurations)
testMerge({
    description: "Updating Details",
    _systemSet: sample1SystemSet,
    system: sample1System,
    systemSetUpdate: {
        details: [
            {
                detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE"
            },
        ],
        configurations: [
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SILL",
            },
        ],
    },
    merged: {
        _systemSetDetails: [
            {
                detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE",
                // __typename: "SystemSetDetail"
            },
            {
                systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
                __typename: "SystemSetDetail"
            },
            {
                systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL",
                __typename: "SystemSetDetail"
            }
        ],
        _systemSetConfigurations: [
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
                __typename: "SystemSetConfiguration"
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
                __typename: "SystemSetConfiguration"
            },
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SILL",
                // __typename: "SystemSetConfiguration"
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE",
                __typename: "SystemSetConfiguration"
            },
        ],
    },
});

// // update details (which selects default configurations (or previously selected?))
// // and add new Configuration
// testMerge({
//     description: "Updating Details",
//     _systemSet: sample1SystemSet,
//     system: sample1System,
//     systemSetUpdate: {
//         details: [
//             {
//                 detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP"
//             },
//         ],
//         configurations: [
//             {
//                 detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE.__CT__.SHIM_SUPPORT"
//             }
//         ],
//     },
//     merged: {
//         _systemSetDetails: [
//             {
//                 detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP",
//                 __typename: "SystemSetDetail"
//             },
//             {
//                 systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
//                 __typename: "SystemSetDetail"
//             },
//             {
//                 systemDetailPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL",
//                 __typename: "SystemSetDetail"
//             }
//         ],
//         _systemSetConfigurations: [
//             {
//                 configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
//                 __typename: "SystemSetConfiguration"
//             },
//             {
//                 configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
//                 __typename: "SystemSetConfiguration"
//             },
//             {
//                 detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE.__CT__.SILL",
//                 __typename: "SystemSetConfiguration"
//             },
//             {
//                 detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE.__CT__.SHIM_SUPPORT",
//                 __typename: "SystemSetConfiguration"
//             },
//             {
//                 configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE",
//                 __typename: "SystemSetConfiguration"
//             },
//         ],
//     },
// });

testMerge({
    description: "Updating Grouped Option Value",
    _systemSet: sample1SystemSet,
    system: sample1System,
    systemSetUpdate: {
        optionGroupValues: [
            {
                optionName: "GLAZING",
                name: "OUTSIDE",
            }
        ]
    },
    merged: {
        _systemSetOptionGroupValues: [
            {
                optionName: "GLAZING",
                name: "OUTSIDE"
            }
        ],
    },
});

// updates a systemOptionValuePath 
testMerge({
    description: "Updating SystemOptionValuePath",
    _systemSet: sample1SystemSet,
    system: sample1System,
    systemSetUpdate: {
        systemOptionValuePath: "0.SET.CENTER.JOINERY.SHEER_BLOCK"
    },
    merged: {
        systemOptionValuePath: "0.SET.CENTER.JOINERY.SHEER_BLOCK",
        _systemSetDetails: [],
        _systemSetConfigurations: []
    },
});


// updates a system ?





// update details and configurations
// must contain all configurations to select - within each updated details

// testMerge({
//     description: "Updating details and configurations",
//     _systemSet: sample1SystemSet,
// system: sample1System,
    //     systemSetUpdate: {
    //         systemOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
    //         details: [
    //             {
    //                 detailOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP",
    //             },
    //         ],
    //         configurations: [
    //             {
    //                 detailConfigurationPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SILL",
    //             },
    //             {
    //                 detailConfigurationPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SHIM_SUPPORT",
    //             },
    //         ],
    //     },
    //     merged: {
    //         systemOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
    //         _systemSetDetails: [
    //             "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP",
    //         ],
    //         _systemSetConfigurations: [
    //             "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SHIM_SUPPORT",
    //             "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SILL",
    //         ],
    //     },
    // });

    // // update SOV, detailss, and configurations
    // testMerge({
    //     description: "Updating SOV, detailss, and configurations",
    //     _systemSet: sample1SystemSet,
    // system: sample1System,
        //     systemSetUpdate: {
        //         systemOptionValuePath: "1.SET.CENTER.JOINERY.STICK",
        //         details: [
        //             {
        //                 newPath: "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID",
        //             },
        //         ],
        //         configurations: [
        //             {
        //                 newPath: "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID.__CT__.HEAD.VOID.VOID",
        //             },
        //         ],
        //     },
        //     merged: {
        //         systemOptionValuePath: "1.SET.CENTER.JOINERY.STICK",
        //         _systemSetDetails: [
        //             "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID",

        //         ],
        //         _systemSetConfigurations: [
        //             "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID.__CT__.HEAD.VOID.VOID",
        //         ],
        //     },
        // });

        // testMerge({
        //     description: "Updating system id",
        //     _systemSet: sample1SystemSet,
        // system: sample1System,
//     systemSetUpdate: { systemId: 2 },
//     merged: {
//         systemId: 2,
//         detailOptionValueCount: 0,
//         configurationOptionValueCount: 0,
//     },
// });

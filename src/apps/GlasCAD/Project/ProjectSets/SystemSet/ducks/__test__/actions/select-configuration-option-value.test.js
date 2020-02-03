import { SELECT_CONFIGURATION_OPTION_VALUE } from "../../actions";
import SAMPLE_SYSTEM_SETS from "../sample-query-results";
import { defaultSystemSetUpdate } from "../../schemas";
import { SystemMap } from "../../../../../../../../app-logic/system";

const {
    sample1: {
        systemSet: sample1SystemSet,
        system: sample1System,
    }
} = SAMPLE_SYSTEM_SETS;


function testSelectConfigurationOptionValue({
    _systemSet: sample1SystemSet,
    description = '',
    _systemSet = {
        __typename: "SystemSet",
        id: 0,
        name: "Test System Set",
        systemId: 0,
        projectId: 1,
        systemOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE",
        _systemSetOptionGroupValues: [],
        _systemSetDetails: [],
        _systemSetConfigurations: [],
    },
    systemSetUpdate = {},
    payloadPath,
    configurations = [],
    nonExistingConfigurations = [],
    configurationLength,
}) {
    describe(`Testing select configuration option value: ${description}`, () => {
        const result = SELECT_CONFIGURATION_OPTION_VALUE(
            { _systemSet, },
            {
                ...defaultSystemSetUpdate,
                ...systemSetUpdate,
            },
            [
                payloadPath,
                new SystemMap(sample1System),
            ],
        );
        // console.log({
        //     configurations,
        //     systemSetUpdate,
        //     payloadPath,
        //     result
        // })
        // if (!configurations.length && !nonExistingConfigurations.length)
        //     throw new Error(`Must provide either configurations or nonExistingConfigurations to testSelectConfigurationOptionValue()`);
        if (configurations.length)
            if (configurationLength) configurationLength === configurations.length
            test('Resulting configuration option values should contain correct values', () => {
                expect(result.configurations).toEqual(
                    expect.arrayContaining(
                        configurations.map(cov => (
                            expect.objectContaining(cov)
                        ))
                    )
                );
            });
        if (nonExistingConfigurations.length)
            test('Resulting configuration option values should not contain incorrect values', () => {
                expect(result.configurations).toEqual(
                    expect.not.arrayContaining(
                        nonExistingConfigurations.map(cov => (
                            expect.objectContaining(cov)
                        ))
                    )
                );
            });
    });
}

testSelectConfigurationOptionValue({
    _systemSet: sample1SystemSet,
    description: "Update non-previously-updated COV (for previously-selected SC)",
    payloadPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
    configurations: [
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
        },
    ],
});

testSelectConfigurationOptionValue({
    _systemSet: sample1SystemSet,
    description: "Update previously-updated COV back to original selection (for previously-selected SC)",
    systemSetUpdate: {
        configurations: [
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            },
        ],
    },
    payloadPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
    configurations: [],
    nonExistingConfigurations: [
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        },
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
        },
    ],
});

testSelectConfigurationOptionValue({
    _systemSet: sample1SystemSet,
    description: "Select previously removed item)",
    systemSetUpdate: {
        optionalConfigurationsToUnselect: [{ detailType: "SILL", configurationType: "SILL_FLASHING" }]
    },
    payloadPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING",
    configurations: [],
});

testSelectConfigurationOptionValue({
    description: 'Testing selecting the same configuration',
    configurationLength: 1,
    systemSetUpdate: {
        configurations: [
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE"
            }
        ]
    },
    configurations: [
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE"
        }
    ]
})

// This one will only work if OTHER_DUTY is in the system...
// testSelectConfigurationOptionValue({
    // _systemSet: sample1SystemSet,
//     description: "Update previously-updated COV to new selection (for previously-selected SC)",
//     systemSetUpdate: {
//         configurations: [
//             {
//                 configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
//             },
//         ],
//     },
//     payloadPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.OTHER_DUTY",
//     configurations: [
//         {
//             configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.OTHER_DUTY",
//         },
//     ],
// });


// testSelectConfigurationOptionValue({
    // _systemSet: sample1SystemSet,
//     description: "Select previously-created COV (for previously non-selected SC)",
//     systemSetUpdate: {
//         configurations: [
//             {
//                 newPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.VOID",
//             },
//         ],
//     },
//     payloadPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.NON_VOID",
//     configurations: [
//         {
//             newPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.NON_VOID",
//         },
//     ],
// });

// testSelectConfigurationOptionValue({
    // _systemSet: sample1SystemSet,
//     description: "Select with only partial COV path should use default or grouped option values",
//     systemSetUpdate: {
//         optionGroupValues: [
//             {
//                 optionName: "GLAZING",
//                 name: "OUTSIDE",
//             },
//         ],
//     },
//     payloadPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD",
//     configurations: [
//         {
//             newPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
//         },
//     ],
// });

// testSelectConfigurationOptionValue({
    // _systemSet: sample1SystemSet,
//     description: "Select with only partial COV path should use default or grouped option values -- should do nothing if the calculated COV is already selected",
//     systemSetUpdate: {},
//     payloadPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD",
//     nonExistingConfigurations: [
//         {
//             newPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
//         },
//         {
//             oldPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
//         },
//     ],
// });

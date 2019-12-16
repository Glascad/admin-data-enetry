import { SELECT_DETAIL_OPTION_VALUE } from "../../actions";
import SAMPLE_SYSTEM_SETS from "../sample-query-results";
import { defaultSystemSetUpdate } from "../../schemas";
import { SystemMap } from "../../../../../../../../app-logic/system-utils";

const {
    sample1: {
        systemSet: sample1SystemSet,
        system: sample1System,
    }
} = SAMPLE_SYSTEM_SETS;

function testSelectDetailOptionValue({
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
    system = {},
    description = '',
    systemSetUpdate = {},
    payloadPath,
    details = [],
    configurations = [],
    nonExistingDetails = [],
    nonExistingConfigurations = [],
}) {
    describe(`Testing select detail option value: ${description}`, () => {
        const result = SELECT_DETAIL_OPTION_VALUE(
            { _systemSet },
            {
                ...defaultSystemSetUpdate,
                ...systemSetUpdate,
            },
            [
                payloadPath,
                new SystemMap(system),
            ],
        );
        if (!details.length && !nonExistingDetails.length)
            throw new Error(`Must provide either details or nonExistingDetails to testSeslectDetailOptionValues()`);
        if (details.length)
            test('must contain correct detail option values', () => {
                expect(result.details).toEqual(
                    expect.arrayContaining(
                        details.map(dov => (
                            expect.objectContaining(dov)
                        ))
                    )
                );
            });
        if (configurations.length)
            test('must contain correct configuration option values', () => {
                expect(result.configurations).toEqual(
                    expect.arrayContaining(
                        configurations.map(cov => (
                            expect.objectContaining(cov)
                        ))
                    )
                );
            });
        if (nonExistingDetails.length)
            test('most not contain incorrect detail option values', () => {
                expect(result.details).toEqual(
                    expect.not.arrayContaining(
                        nonExistingDetails.map(dov => (
                            expect.objectContaining(dov)
                        ))
                    )
                );
            });
        if (nonExistingConfigurations.length)
            test('most not contain incorrect configuration option values', () => {
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

testSelectDetailOptionValue({
    description: "Select DOV with empty state -- should select default values for downstream configurations (those that are required and that are selected)",
    _systemSet: {
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
    system: sample1System,
    payloadPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP",
    details: [
        {
            detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE",
        },
    ],
    configurations: [
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.OUTSIDE.__CT__.SILL",
        },
    ],
});

testSelectDetailOptionValue({
    description: "Select DOV back to what it was in state",
    _systemSet: sample1SystemSet,
    system: sample1System,
    payloadPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN",
    systemSetUpdate: {
        details: [
            {
                detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE",
            },
        ],
    },
    nonExistingDetails: [
        {
            detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE",
        },
    ],
    nonExistingConfigurations: [
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL",
        },
    ],
});

testSelectDetailOptionValue({
    description: "Select DOV with the same DOV",
    _systemSet: sample1SystemSet,
    system: sample1System,
    payloadPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP",
    details: [
        {
            detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE",
        },
    ],
    configurations: [
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SILL",
        },
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SHIM_SUPPORT",
        },
    ],
    nonExistingDetails: [{
        detailOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.GLAZING.INSIDE",

    }],
    nonExistingConfigurations: [
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.GLAZING.INSIDE.__CT__.SILL",
        },
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.GLAZING.INSIDE.__CT__.SHIM_SUPPORT",
        },

    ]
});



// // not sure if this is possible with the test system
// testSelectDetailOptionValue({
//     description: "Select DOV with partial path uses default and grouped values",
//     payloadPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL",
// });

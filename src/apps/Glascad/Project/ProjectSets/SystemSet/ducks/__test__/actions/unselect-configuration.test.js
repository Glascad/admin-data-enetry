import { UNSELECT_CONFIGURATION } from "../../actions";
import SAMPLE_SYSTEM_SETS from "../sample-query-results";

const {
    sample1: {
        systemSet: sample1SystemSet,
        system: sample1System,
    }
} = SAMPLE_SYSTEM_SETS;

function testUnselectConfiguration({
    description = '',
    systemSetUpdate = {},
    configurationPath,
    configurations = [],
    nonExistentConfigurationOptionValues = [],
    optionalConfigurationsToUnselect = [],
}) {
    describe(`Testing unselect configuration: ${description}`, () => {
        const result = UNSELECT_CONFIGURATION({ _systemSet: sample1SystemSet }, systemSetUpdate, configurationPath);
        // if (!configurations && !nonExistentConfigurationOptionValues) throw new Error(`Must provide configurations or nonExistentConfigurationOptionValues`);
        if (configurations && configurations.length)
            test('Result should contain correct deletion path...', () => {
                expect(result.configurations).toEqual(
                    expect.arrayContaining(configurations.map(configuration => (
                        expect.objectContaining(configuration)
                    )))
                );
            });
        if (nonExistentConfigurationOptionValues && nonExistentConfigurationOptionValues.length)
            test('...or should remove creation path', () => {
                expect(result.configurations).toEqual(
                    expect.not.arrayContaining(nonExistentConfigurationOptionValues.map(configuration => (
                        expect.objectContaining(configuration)
                    )))
                );
            });
        if (optionalConfigurationsToUnselect && optionalConfigurationsToUnselect.length)
            test('Result should contain correct deletion path...', () => {
                expect(result.optionalConfigurationsToUnselect).toEqual(
                    expect.arrayContaining(optionalConfigurationsToUnselect.map(({ detailType, configurationType }) => (
                        expect.objectContaining({
                            detailType,
                            configurationType,
                        })
                    )))
                );
            });
    });
}

testUnselectConfiguration({
    description: "Works with full path and no state",
    systemSetUpdate: {},
    configurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
    optionalConfigurationsToUnselect: [
        {
            detailType: "HEAD",
            configurationType: "COMPENSATING_RECEPTOR",
        },
    ],
    configuration: [],
});

testUnselectConfiguration({
    description: "Works with partial path and no state",
    systemSetUpdate: {},
    configurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR",
    optionalConfigurationsToUnselect: [
        {
            detailType: "HEAD",
            configurationType: "COMPENSATING_RECEPTOR",
        },
    ],
    configuration: [],
});

testUnselectConfiguration({
    description: "Removes Updated Configuration",
    systemSetUpdate: {
        configurations: [
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            },
        ],
    },
    configurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.COMPENSATING_RECEPTOR",
    configurations: [],
    optionalConfigurationsToUnselect: [],
});

testUnselectConfiguration({
    description: "Works with full path in state",
    systemSetUpdate: {
        configurations: [
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING",
            },
        ],
    },
    configurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING",
    configuration: [],
    optionalConfigurationsToUnselect: [],
    nonExistentConfigurationOptionValues: [
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING",
        },
    ],
});

testUnselectConfiguration({
    description: "Works with partial path in state",
    systemSetUpdate: {
        configurations: [
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING",
            },
        ],
    },
    configurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING",
    configuration: [],
    optionalConfigurationsToUnselect: [],
    nonExistentConfigurationOptionValues: [
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING",
        },
    ],
});

testUnselectConfiguration({
    description: "Works with multiple items in state",
    systemSetUpdate: {
        configurations: [
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING",
            },
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL",
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.COMPENSATING_RECEPTOR.GLAZING.INSIDE",
            },
        ],
    },
    configurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING",
    configuration: [
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL",
        },
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.COMPENSATING_RECEPTOR.GLAZING.INSIDE",
        },
    ],
    optionalConfigurationsToUnselect: [],
    nonExistentConfigurationOptionValues: [
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING",
        },
    ],
});

testUnselectConfiguration({
    description: "Works with multiple items in state",
    systemSetUpdate: {
        configurations: [
            {
                detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL",
            },
            {
                configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.COMPENSATING_RECEPTOR.GLAZING.INSIDE",
            },
        ],
    },
    configurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SHIM_SUPPORT",
    configuration: [
        {
            detailConfigurationPath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL",
        },
        {
            configurationOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.COMPENSATING_RECEPTOR.GLAZING.INSIDE",
        },
    ],
    optionalConfigurationsToUnselect: [
        {
            detailType: "SILL",
            configurationType: "SHIM_SUPPORT",
        }
    ],
});



import { UNSELECT_CONFIGURATION } from "../../actions";
import { sample1 } from "../sample-query-results";

function testUnselectConfiguration({
    description = '',
    systemSetUpdate = {},
    configurationPath,
    configurationOptionValues = [],
    nonExistentConfigurationOptionValues = [],
}) {
    describe(`Testing unselect configuration: ${description}`, () => {
        const result = UNSELECT_CONFIGURATION(sample1, systemSetUpdate, configurationPath);
        if (!configurationOptionValues && !nonExistentConfigurationOptionValues) throw new Error(`Must provide configurationOptionValues or nonExistentConfigurationOptionValues`);
        if (configurationOptionValues && configurationOptionValues.length)
            test('Result should contain correct deletion path...', () => {
                expect(result.configurationOptionValues).toEqual(
                    expect.arrayContaining(configurationOptionValues.map(({ oldPath }) => (
                        expect.objectContaining({
                            oldPath,
                        })
                    )))
                );
            });
        if (nonExistentConfigurationOptionValues && nonExistentConfigurationOptionValues.length)
            test('...or should remove creation path', () => {
                expect(result.configurationOptionValues).toEqual(
                    expect.not.arrayContaining(nonExistentConfigurationOptionValues.map(({ oldPath, newPath }) => (
                        expect.objectContaining({
                            oldPath,
                            newPath,
                        })
                    )))
                );
            });
    });
}

testUnselectConfiguration({
    description: "Works with full path and no state",
    systemSetUpdate: {},
    configurationPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
    configurationOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        },
    ],
});

testUnselectConfiguration({
    description: "Works with partial path and no state",
    systemSetUpdate: {},
    configurationPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR",
    configurationOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        },
    ],
});

testUnselectConfiguration({
    description: "Works with partial path and updated state",
    systemSetUpdate: {
        configurationOptionValues: [
            {
                oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            },
        ],
    },
    configurationPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR",
    configurationOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        },
    ],
});

testUnselectConfiguration({
    description: "Works with full path in state",
    systemSetUpdate: {
        configurationOptionValues: [
            {
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.VOID",
            },
        ],
    },
    configurationPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.VOID",
    nonExistentConfigurationOptionValues: [
        {
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.VOID",
        },
    ],
});

testUnselectConfiguration({
    description: "Works with partial path in state",
    systemSetUpdate: {
        configurationOptionValues: [
            {
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.VOID",
            },
        ],
    },
    configurationPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING",
    nonExistentConfigurationOptionValues: [
        {
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.VOID",
        },
    ],
});

import { SELECT_CONFIGURATION_OPTION_VALUE } from "../../actions";
import { sample1 } from "../sample-query-results";
import { defaultSystemSetUpdate } from "../../schemas";

function testSelectConfigurationOptionValue({
    description = '',
    queryResult,
    systemSetUpdate = {},
    payload,
    configurationOptionValues = [],
    nonExistingConfigurationOptionValues = [],
}) {
    describe(`Testing select configuration option value: ${description}`, () => {
        const result = SELECT_CONFIGURATION_OPTION_VALUE(queryResult, { ...defaultSystemSetUpdate, ...systemSetUpdate }, payload);
        if (!configurationOptionValues.length && !nonExistingConfigurationOptionValues.length)
            throw new Error(`Must provide either configurationOptionValues or nonExistingConfigurationOptionValues to testSelectConfigurationOptionValue()`);
        if (configurationOptionValues.length)
            test('Resulting configuration option values should contain correct values', () => {
                expect(result.configurationOptionValues).toEqual(
                    expect.arrayContaining(
                        configurationOptionValues.map(cov => (
                            expect.objectContaining(cov)
                        ))
                    )
                );
            });
        if (nonExistingConfigurationOptionValues.length)
            test('Resulting configuration option values should not contain incorrect values', () => {
                expect(result.configurationOptionValues).toEqual(
                    expect.not.arrayContaining(
                        nonExistingConfigurationOptionValues.map(cov => (
                            expect.objectContaining(cov)
                        ))
                    )
                );
            });
    });
}

testSelectConfigurationOptionValue({
    description: "Update non-previously-updated COV (for previously-selected SC)",
    queryResult: sample1,
    payload: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
    configurationOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
        },
    ],
});

testSelectConfigurationOptionValue({
    description: "Update previously-updated COV back to original selection (for previously-selected SC)",
    queryResult: sample1,
    systemSetUpdate: {
        configurationOptionValues: [
            {
                oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            },
        ],
    },
    payload: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
    nonExistingConfigurationOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        },
    ],
});

testSelectConfigurationOptionValue({
    description: "Update previously-updated COV to new selection (for previously-selected SC)",
    queryResult: sample1,
    systemSetUpdate: {
        configurationOptionValues: [
            {
                oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            },
        ],
    },
    payload: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.OTHER_DUTY",
    configurationOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.OTHER_DUTY",
        },
    ],
});

testSelectConfigurationOptionValue({
    description: "Select non-previously-created COV (for previously non-selected SC)",
    queryResult: sample1,
    payload: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.VOID",
    configurationOptionValues: [
        {
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.VOID",
        },
    ],
});

testSelectConfigurationOptionValue({
    description: "Select previously-created COV (for previously non-selected SC)",
    queryResult: sample1,
    systemSetUpdate: {
        configurationOptionValues: [
            {
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.VOID",
            },
        ],
    },
    payload: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.NON_VOID",
    configurationOptionValues: [
        {
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL_FLASHING.VOID.NON_VOID",
        },
    ],
});

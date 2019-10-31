import { SELECT_DETAIL_OPTION_VALUE } from "../../actions";
import { sample1 } from "../sample-query-results";
import { defaultSystemSetUpdate } from "../../schemas";
import { SystemMap } from "../../../../../../../../app-logic/system-utils";

function testSelectDetailOptionValue({
    description = '',
    systemSetUpdate = {},
    payloadPath,
    detailOptionValues = [],
    configurationOptionValues = [],
    nonExistingDetailOptionValues = [],
    nonExistingConfigurationOptionValues = [],
}) {
    describe(`Testing select detail option value: ${description}`, () => {
        const result = SELECT_DETAIL_OPTION_VALUE(
            sample1,
            {
                ...defaultSystemSetUpdate,
                ...systemSetUpdate,
            },
            [
                payloadPath,
                new SystemMap(sample1._system),
            ],
        );
        if (!detailOptionValues.length && !nonExistingDetailOptionValues.length)
            throw new Error(`Must provide either detailOptionValues or nonExistingDetailOptionValues to testSeslectDetailOptionValues()`);
        if (detailOptionValues.length)
            test('must contain correct detail option values', () => {
                expect(result.detailOptionValues).toEqual(
                    expect.arrayContaining(
                        detailOptionValues.map(dov => (
                            expect.objectContaining(dov)
                        ))
                    )
                );
            });
        if (configurationOptionValues.length)
            test('must contain correct configuration option values', () => {
                expect(result.configurationOptionValues).toEqual(
                    expect.arrayContaining(
                        configurationOptionValues.map(cov => (
                            expect.objectContaining(cov)
                        ))
                    )
                );
            });
        if (nonExistingDetailOptionValues.length)
            test('most not contain incorrect detail option values', () => {
                expect(result.detailOptionValues).toEqual(
                    expect.not.arrayContaining(
                        nonExistingDetailOptionValues.map(dov => (
                            expect.objectContaining(dov)
                        ))
                    )
                );
            });
        if (nonExistingConfigurationOptionValues.length)
            test('most not contain incorrect configuration option values', () => {
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

testSelectDetailOptionValue({
    description: "Select DOV with empty state -- should select default values for downstream configurations (those that are required and that are selected)",
    payloadPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP",
    detailOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN",
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE",
        },
    ],
    configurationOptionValues: [
        {
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SILL.VOID.VOID",
        },
    ],
});

testSelectDetailOptionValue({
    description: "Select DOV that has already been updated",
    payloadPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN",
    systemSetUpdate: {
        detailOptionValues: [
            {
                oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN",
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE",
            },
        ],
    },
    nonExistingDetailOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN",
        },
    ],
    nonExistingConfigurationOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL.VOID.VOID",
        },
    ],
});

/**
 * Also, we (may) need to make sure that when we update an item, it's old path and new path live within the same parent so that we don't get cascading delete errors
 */

// // not sure if this is possible with the test system
// testSelectDetailOptionValue({
//     description: "Select DOV with partial path uses default and grouped values",
//     payloadPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL",
// });

import { SELECT_OPTION_GROUP_VALUE } from "../../actions";
import { sample1 } from "../sample-query-results";
import { SystemMap } from "../../../../../../../../app-logic/system";
import { defaultSystemSetUpdate } from "../../schemas";

function testSelectOptionGroupValue({
    description = '',
    systemSetUpdate,
    payload: {
        optionName,
        name,
    },
    optionGroupValues = [],
    detailOptionValues = [],
    configurationOptionValues = [],
    nonExistingOptionGroupValues = [],
    nonExistingDetailOptionValues = [],
    nonExistingConfigurationOptionValues = [],
}) {
    describe(`Testing select option group value: ${description}`, () => {
        const result = SELECT_OPTION_GROUP_VALUE(
            sample1,
            {
                ...defaultSystemSetUpdate,
                ...systemSetUpdate,
            },
            [
                optionName,
                name,
                new SystemMap(sample1._system),
            ],
        );
        if (!optionGroupValues.length && !nonExistingOptionGroupValues.length) throw new Error(`Must provide either optionGroupValues or nonExistingOptionGroupValues to testSelectOptionGroupValue()`);
        if (optionGroupValues.length)
            test('must contain correct option group option values', () => {
                expect(result.optionGroupValues).toEqual(
                    expect.arrayContaining(
                        optionGroupValues.map(ogv => (
                            expect.objectContaining(ogv)
                        ))
                    )
                );
            });
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
        if (nonExistingOptionGroupValues.length)
            test('most not contain incorrect option group values', () => {
                expect(result.optionGroupValues).toEqual(
                    expect.not.arrayContaining(
                        nonExistingOptionGroupValues.map(ogv => (
                            expect.objectContaining(ogv)
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

testSelectOptionGroupValue({
    description: "Can update option group value with empty state, and select defaults for configurations",
    payload: {
        optionName: "GLAZING",
        name: "OUTSIDE",
    },
    optionGroupValues: [
        {
            optionName: "GLAZING",
            name: "OUTSIDE",
        },
    ],
    configurationOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
        },
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE",
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE",
        },
    ],
});

testSelectOptionGroupValue({
    description: "Can update option group value with empty state, and select defaults for details (again)",
    payload: {
        optionName: "STOPS",
        name: "UP",
    },
    optionGroupValues: [
        {
            optionName: "STOPS",
            name: "UP",
        },
    ],
    configurationOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.UP",
        },
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE",
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID.__CT__.HORIZONTAL.STOPS.UP.GLAZING.INSIDE",
        },
    ],
});

testSelectOptionGroupValue({
    description: "Can update option group value back to original",
    systemSetUpdate: {
        optionGroupValues: [
            {
                optionName: "GLAZING",
                name: "OUTSIDE",
            },
        ],
    },
    payload: {
        optionName: "GLAZING",
        name: "INSIDE",
    },
    nonExistingOptionGroupValues: [
        {
            optionName: "GLAZING",
        },
    ],
    nonExistingDetailOptionValues: [
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
        },
        {
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
        },
        {
            oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE",
        },
        {
            newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.VOID.VOID.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.OUTSIDE",
        },
    ],
});

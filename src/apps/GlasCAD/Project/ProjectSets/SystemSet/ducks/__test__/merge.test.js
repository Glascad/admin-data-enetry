import merge from "../merge";
import { defaultSystemSetUpdate } from "../schemas";
import { sample1 } from "./sample-query-results";

function testMerge({
    queryResult,
    systemSetUpdate,
    merged,
}) {
    describe('Testing merge function in system set', () => {
        test('result should be correct', () => {
            // const result = merge(queryResult, { ...defaultSystemSetUpdate, ...systemSetUpdate });
            // expect(result).toMatchObject(merged);
        });
    });
}

testMerge({
    // queryResult: sample1,
    // systemSetUpdate: {},
    // merged: {
    //     systemOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
    //     _systemSetOptionGroupValues: expect.arrayContaining([
    //         ["GLAZING", "OUTSIDE"],
    //         ["STOPS", "DOWN"],
    //     ].map(([optionName, name]) => expect.objectContaining({ optionName, name }))),
    //     _systemSetDetailOptionValues: expect.arrayContaining([
    //         "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
    //     ].map(detailOptionValuePath => expect.objectContaining({ detailOptionValuePath }))),
    //     _systemSetConfigurationOptionValues: expect.arrayContaining([
    //         "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
    //     ].map(configurationOptionValuePath => expect.objectContaining({ configurationOptionValuePath }))),
    // },
});

testMerge({
    queryResult: sample1,
    systemSetUpdate: {
        configurationOptionValues: [
            {
                oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            },
        ],
    },
    merged: {
        systemOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
        _systemSetOptionGroupValues: expect.arrayContaining([
            ["GLAZING", "OUTSIDE"],
            ["STOPS", "DOWN"],
        ].map(([optionName, name]) => expect.objectContaining({ optionName, name }))),
        _systemSetDetailOptionValues: expect.arrayContaining([
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
        ].map(detailOptionValuePath => expect.objectContaining({ detailOptionValuePath }))),
        _systemSetConfigurationOptionValues: expect.arrayContaining([
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
        ].map(configurationOptionValuePath => expect.objectContaining({ configurationOptionValuePath }))),
    },
});

testMerge({
    queryResult: sample1,
    systemSetUpdate: {
        detailOptionValues: [
            {
                oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
            },
        ],
    },
    merged: {
        systemOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
        _systemSetOptionGroupValues: expect.arrayContaining([
            ["GLAZING", "OUTSIDE"],
            ["STOPS", "DOWN"],
        ].map(([optionName, name]) => expect.objectContaining({ optionName, name }))),
        _systemSetDetailOptionValues: expect.arrayContaining([
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
        ].map(detailOptionValuePath => expect.objectContaining({ detailOptionValuePath }))),
        _systemSetConfigurationOptionValues: expect.arrayContaining([
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
        ].map(configurationOptionValuePath => expect.objectContaining({ configurationOptionValuePath }))),
    },
});

// DOES MERGE GET RID OF CHILDREN???
// YES I THINK IT DOES
testMerge({
    queryResult: sample1,
    systemSetUpdate: {
        systemOptionValuePath: "1.SET.CENTER.JOINERY.STICK",
    },
    merged: {
        systemOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
        _systemSetOptionGroupValues: [],
        _systemSetDetailOptionValues: [],
        _systemSetConfigurationOptionValues: [],
    },
});

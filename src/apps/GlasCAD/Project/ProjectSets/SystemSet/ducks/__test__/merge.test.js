import merge from "../merge";
import { defaultSystemSetUpdate } from "../schemas";
import { sample1 } from "./sample-query-results";

function testMerge({
    description = '',
    queryResult,
    systemSetUpdate,
    merged: {
        systemId,
        systemOptionValuePath,
        _systemSetOptionGroupValues = [],
        _systemSetDetailOptionValues = [],
        _systemSetConfigurationOptionValues = [],
    },
}) {
    describe(`Testing merge function in system set: ${description}`, () => {
        const result = merge(queryResult, { ...defaultSystemSetUpdate, ...systemSetUpdate });
        test('result should have correct systemId and systemOptionValuePath', () => {
            if (systemId) expect(result).toMatchObject({ systemId });
            if (systemOptionValuePath) expect(result).toMatchObject({ systemOptionValuePath });
        });
        test('result should have correct systemSetOptionGroupValues', () => {
            expect(result._systemSetOptionGroupValues).toEqual(
                expect.arrayContaining(
                    _systemSetOptionGroupValues.map(([optionName, name]) => (
                        expect.objectContaining({
                            optionName,
                            name,
                        })
                    ))
                )
            );
        });
        test('result should have correct systemSetDetailOptionValues', () => {
            expect(result._systemSetDetailOptionValues).toEqual(
                expect.arrayContaining(
                    _systemSetDetailOptionValues.map(detailOptionValuePath => (
                        expect.objectContaining({
                            detailOptionValuePath
                        })
                    ))
                )
            );
        });
        test('result should have correct systemSetConfigurationOptionValues', () => {
            expect(result._systemSetConfigurationOptionValues).toEqual(
                expect.arrayContaining(
                    _systemSetConfigurationOptionValues.map(configurationOptionValuePath => (
                        expect.objectContaining({
                            configurationOptionValuePath
                        })
                    ))
                )
            );
        });
    });
}

// update COV
testMerge({
    description: "Updating COV",
    queryResult: sample1,
    systemSetUpdate: {
        configurationOptionValues: [
            {
                oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            },
        ],
    },
    merged: {
        _systemSetConfigurationOptionValues: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
        ],
    },
});

// update DOV and COVs
// must contain all COVs to select - within each updated DOV
testMerge({
    description: "Updating DOV and COVs",
    queryResult: sample1,
    systemSetUpdate: {
        detailOptionValues: [
            {
                oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN",
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP",
            },
        ],
        configurationOptionValues: [
            {
                oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.__CT__.SILL.VOID.VOID",
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SILL.VOID.VOID",
            },
            {
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SHIM_SUPPORT.VOID.VOID",
            },
        ],
    },
    merged: {
        systemOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
        _systemSetDetailOptionValues: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP",
        ],
        _systemSetConfigurationOptionValues: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SILL.VOID.VOID",
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING.INSIDE.__CT__.SHIM_SUPPORT.VOID.VOID",
        ],
    },
});

// update SOV, DOVs, and COVs
testMerge({
    description: "Updating SOV, DOVs, and COVs",
    queryResult: sample1,
    systemSetUpdate: {
        systemOptionValuePath: "1.SET.CENTER.JOINERY.STICK",
        detailOptionValues: [
            {
                newPath: "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID",
            },
        ],
        configurationOptionValues: [
            {
                newPath: "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID.__CT__.HEAD.VOID.VOID",
            },
        ],
    },
    merged: {
        systemOptionValuePath: "1.SET.CENTER.JOINERY.STICK",
        _systemSetDetailOptionValues: [
            "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID",

        ],
        _systemSetConfigurationOptionValues: [
            "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID.__CT__.HEAD.VOID.VOID",
        ],
    },
});

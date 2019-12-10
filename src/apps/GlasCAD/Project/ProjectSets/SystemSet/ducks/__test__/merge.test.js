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
        _systemSetDetails = [],
        _systemSetConfigurations = [],
        detailOptionValueCount,
        configurationOptionValueCount,
    },
}) {
    describe(`Testing merge function in system set: ${description}`, () => {
        const result = merge(queryResult, { ...defaultSystemSetUpdate, ...systemSetUpdate }, {});
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
        if (detailOptionValueCount !== undefined) {
            test('detail option values should have correct length', () => {
                expect(result._systemSetDetails).toHaveProperty('length', detailOptionValueCount);
            });
        }
        test('result should have correct systemSetDetailOptionValues', () => {
            expect(result._systemSetDetails).toEqual(
                expect.arrayContaining(
                    _systemSetDetails.map(detailOptionValuePath => (
                        expect.objectContaining({
                            detailOptionValuePath
                        })
                    ))
                )
            );
        });
        if (configurationOptionValueCount !== undefined) {
            test('configuration option values should have correct length', () => {
                expect(result._systemSetConfigurations).toHaveProperty('length', configurationOptionValueCount);
            });
        }
        test('result should have correct systemSetConfigurationOptionValues', () => {
            expect(result._systemSetConfigurations).toEqual(
                expect.arrayContaining(
                    _systemSetConfigurations.map(configurationOptionValuePath => (
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
        configurations: [
            {
                oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.VOID.VOID.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
            },
        ],
    },
    merged: {
        _systemSetConfigurations: [
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
        details: [
            {
                oldPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN",
                newPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP",
            },
        ],
        configurations: [
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
        _systemSetDetails: [
            "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP",
        ],
        _systemSetConfigurations: [
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
        details: [
            {
                newPath: "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID",
            },
        ],
        configurations: [
            {
                newPath: "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID.__CT__.HEAD.VOID.VOID",
            },
        ],
    },
    merged: {
        systemOptionValuePath: "1.SET.CENTER.JOINERY.STICK",
        _systemSetDetails: [
            "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID",

        ],
        _systemSetConfigurations: [
            "1.SET.CENTER.JOINERY.STICK.__DT__.HEAD.VOID.VOID.__CT__.HEAD.VOID.VOID",
        ],
    },
});

testMerge({
    description: "Updating system id",
    queryResult: sample1,
    systemSetUpdate: { systemId: 2 },
    merged: {
        systemId: 2,
        detailOptionValueCount: 0,
        configurationOptionValueCount: 0,
    },
});

import { SELECT_SYSTEM_OPTION_VALUE } from "../../actions";
import { sample1 } from "../sample-query-results";
import { SystemMap } from "../../../../../../../../app-logic/system";
import { defaultSystemSetUpdate } from "../../schemas";

function testSelectSystemOptionValue({
    description = '',
    systemSetUpdate,
    payloadPath,
    systemOptionValuePath,
    detailOptionValues = [],
    configurationOptionValues = [],
    nonExistingDetailOptionValues = [],
    nonExistingConfigurationOptionValues = [],
}) {
    describe(`Testing select system option value: ${description}`, () => {
        const result = SELECT_SYSTEM_OPTION_VALUE(
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
        test('must contain correct system option value', () => {
            expect(result.systemOptionValuePath).toBe(systemOptionValuePath);
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

testSelectSystemOptionValue({
    description: "Can update to new SOV",
    payloadPath: "1.SET.FRONT",
    systemOptionValuePath: "1.SET.FRONT",
    detailOptionValues: [
        {
            newPath: "1.SET.FRONT.__DT__.HEAD.VOID.VOID",
        },
    ],
    configurationOptionValues: [
        {
            newPath: "1.SET.FRONT.__DT__.HEAD.VOID.VOID.__CT__.HEAD.VOID.VOID",
        },
    ],
});

testSelectSystemOptionValue({
    description: "Can revert to previous SOV",
    systemSetUpdate: {
        systemOptionValuePath: "1.SET.FRONT",
    },
    payloadPath: "1.SET.CENTER",
    systemOptionValuePath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
    nonExistingDetailOptionValues: [
        expect.any(Object),
    ],
    nonExistingConfigurationOptionValues: [
        expect.any(Object),
    ],
});

testSelectSystemOptionValue({
    description: "Can select new SOV",
    systemSetUpdate: {
        systemOptionValuePath: "1.SET.FRONT",
    },
    payloadPath: "1.SET.CENTER.JOINERY.STICK",
    systemOptionValuePath: "1.SET.CENTER.JOINERY.STICK",
    nonExistingDetailOptionValues: [
        expect.any(Object),
    ],
    nonExistingConfigurationOptionValues: [
        expect.any(Object),
    ],
});

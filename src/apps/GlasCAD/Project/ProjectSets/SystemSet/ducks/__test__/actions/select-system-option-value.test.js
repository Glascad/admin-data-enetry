import { SELECT_SYSTEM_OPTION_VALUE } from "../../actions";
import SAMPLE_SYSTEM_SETS from "../sample-query-results";
import { SystemMap } from "../../../../../../../../app-logic/system-utils";
import { defaultSystemSetUpdate } from "../../schemas";

const {
    sample1: {
        systemSet: sample1SystemSet,
        system: sample1System,
    }
} = SAMPLE_SYSTEM_SETS;

function testSelectSystemOptionValue({
    description = '',
    systemSetUpdate,
    payloadPath,
    systemOptionValuePath,
    details = [],
    configurations = [],
    nonExistingDetailOptionValues = [],
    nonExistingConfigurationOptionValues = [],
}) {
    describe(`Testing select system option value: ${description}`, () => {
        const result = SELECT_SYSTEM_OPTION_VALUE(
            { _systemSet: sample1SystemSet },
            {
                ...defaultSystemSetUpdate,
                ...systemSetUpdate,
            },
            [
                payloadPath,
                new SystemMap(sample1System),
            ],
        );
        test('must contain correct system option value', () => {
            expect(result.systemOptionValuePath).toBe(systemOptionValuePath);
        });
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
        if (nonExistingDetailOptionValues.length)
            test('most not contain incorrect detail option values', () => {
                expect(result.details).toEqual(
                    expect.not.arrayContaining(
                        nonExistingDetailOptionValues.map(dov => (
                            expect.objectContaining(dov)
                        ))
                    )
                );
            });
        if (nonExistingConfigurationOptionValues.length)
            test('most not contain incorrect configuration option values', () => {
                expect(result.configurations).toEqual(
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
    payloadPath: "0.SET.FRONT",
    systemOptionValuePath: "0.SET.FRONT",
    details: [
        {
            systemDetailPath: "0.SET.FRONT.__DT__.HEAD",
        },
    ],
    configurations: [],
});

testSelectSystemOptionValue({
    description: "Can revert to previous SOV",
    systemSetUpdate: {
        systemOptionValuePath: "0.SET.FRONT",
    },
    payloadPath: "0.SET.CENTER",
    systemOptionValuePath: "0.SET.CENTER.JOINERY.SCREW_SPLINE",
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
        systemOptionValuePath: "0.SET.FRONT",
    },
    payloadPath: "0.SET.CENTER.JOINERY.STICK",
    systemOptionValuePath: "0.SET.CENTER.JOINERY.STICK",
    nonExistingDetailOptionValues: [
        expect.any(Object),
    ],
    nonExistingConfigurationOptionValues: [
        expect.any(Object),
    ],
});

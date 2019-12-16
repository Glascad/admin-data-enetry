import { getDefaultOptionGroupValue, SystemMap } from "../../system";
import { sample1 } from "../sample-systems";

function testGetDefaultOptionGroupValue({
    optionName,
    defaultValue,
    system,
}) {
    describe(`Testing get default option group value:`, () => {
        test(`option ${optionName} should have default value ${defaultValue} in system ${system.name}`, () => {
            const result = getDefaultOptionGroupValue(optionName, new SystemMap(system));
            expect(result).toBe(defaultValue);
        });
    });
}

testGetDefaultOptionGroupValue({
    optionName: "GLAZING",
    defaultValue: "INSIDE",
    system: sample1,
});

testGetDefaultOptionGroupValue({
    optionName: "STOPS",
    defaultValue: "UP",
    system: sample1,
});

import { sample1 } from '../sample-systems';
import { getDefaultPath, SystemMap, getOptionGroupValuesByOptionName } from '../../system';

function testGetDefaultPath({
    description = '',
    path,
    optionGroupValues,
    defaultPath,
    system,
}) {
    describe(`Testing get default path: ${description}`, () => {
        const systemMap = new SystemMap(system);
        const result = path ?
            getDefaultPath({ path }, systemMap, optionGroupValues)
            :
            getDefaultPath(systemMap, optionGroupValues);
        test('result is correct', () => {
            expect(result).toBe(defaultPath);
        });
    });
}

testGetDefaultPath({
    description: "Works for SOV",
    path: "1.SET",
    defaultPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
    system: sample1,
});

testGetDefaultPath({
    description: "Works for SOV with only single SD child",
    path: "1.SET.FRONT",
    defaultPath: "1.SET.FRONT",
});

testGetDefaultPath({
    description: "Works for SOV with no input",
    defaultPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
    system: sample1,
});

testGetDefaultPath({
    description: "Works for DOV with only SD",
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
    defaultPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP",
    system: sample1,
});

testGetDefaultPath({
    description: "Works for DOV with SD and OGVs",
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
    optionGroupValues: [
        {
            optionName: "STOPS",
            name: "DOWN"
        },
    ],
    defaultPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
    system: sample1,
});

testGetDefaultPath({
    description: "Works for DOV with SD and OGVs",
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
    optionGroupValues: [
        {
            optionName: "STOPS",
            name: "DOWN"
        },
        {
            optionName: "GLAZING",
            name: "OUTSIDE",
        },
    ],
    defaultPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE",
    system: sample1,
});

testGetDefaultPath({
    description: "Works for DOV with partial DOV",
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN",
    defaultPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
    system: sample1,
});

testGetDefaultPath({
    description: "Works for COV with only SC",
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR",
    defaultPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
    system: sample1,
});

testGetDefaultPath({
    description: "Works for COV with partial DOV",
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
    defaultPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
    system: sample1,
});

testGetDefaultPath({
    description: "Works for COV with partial DOV with OGVs",
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
    optionGroupValues: [
        {
            optionName: "DURABILITY",
            name: "HIGH_PERFORMANCE",
        },
    ],
    defaultPath: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE",
    system: sample1,
});

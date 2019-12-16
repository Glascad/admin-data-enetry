import { getOptionListFromPath, getDetailTypeFromPath, getConfigurationTypeFromPath } from "../../system";

function testGetInfoFromPath({
    path,
    detailType,
    configurationType,
    optionList,
}) {
    describe(`Testing getting information from path on ${path}`, () => {
        test('Option list should be correct', () => {
            expect(getOptionListFromPath(path)).toMatchObject(optionList);
        });
        test('Detail type should be correct', () => {
            expect(getDetailTypeFromPath(path)).toBe(detailType);
        });
        test('Configuration type should be correct', () => {
            expect(getConfigurationTypeFromPath(path)).toBe(configurationType);
        });
    });
}

testGetInfoFromPath({
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE",
    optionList: [
        {
            name: "SET",
            value: "CENTER"
        },
        {
            name: "JOINERY",
            value: "SCREW_SPLINE",
        },
    ],
});

testGetInfoFromPath({
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
    detailType: "HEAD",
    optionList: [
        {
            name: "STOPS",
            value: "DOWN"
        },
        {
            name: "GLAZING",
            value: "INSIDE",
        },
    ],
});

testGetInfoFromPath({
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY.STANDARD_DUTY",
    detailType: "HEAD",
    configurationType: "COMPENSATING_RECEPTOR",
    optionList: [
        {
            name: "DURABILITY",
            value: "STANDARD_DUTY"
        },
    ],
});

testGetInfoFromPath({
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE.__CT__.HEAD",
    detailType: "HEAD",
    configurationType: "HEAD",
    optionList: [],
});

testGetInfoFromPath({
    path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
    detailType: "HEAD",
    optionList: [],
});

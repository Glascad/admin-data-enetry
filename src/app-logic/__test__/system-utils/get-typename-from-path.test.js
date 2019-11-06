import { getTypenameFromPath } from "../../system-utils";

function testGetTypenameFromPath(
    path,
    __typename,
) {
    describe(`Testing get typename from path: path: ${path}, __typename: ${__typename}`, () => {
        test('typename is correct', () => {
            expect(getTypenameFromPath(path)).toBe(__typename);
        });
    });
}

// system
testGetTypenameFromPath(
    "1.SET",
    "SystemOption",
);

testGetTypenameFromPath(
    "1.SET.CENTER",
    "SystemOptionValue",
);

testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY",
    "SystemOption",
);

testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY.SCREW_SPLINE",
    "SystemOptionValue",
);

// details
testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
    "SystemDetail",
);

testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS",
    "DetailOption",
);

testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP",
    "DetailOptionValue",
);

testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING",
    "DetailOption",
);

testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE",
    "DetailOptionValue",
);

// configurations
testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD",
    "DetailConfiguration",
);

testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD.VOID",
    "ConfigurationOption",
);

testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD.VOID.VOID",
    "ConfigurationOptionValue",
);

testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD.VOID.VOID.VOID",
    "ConfigurationOption",
);

testGetTypenameFromPath(
    "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD.VOID.VOID.VOID.VOID",
    "ConfigurationOptionValue",
);

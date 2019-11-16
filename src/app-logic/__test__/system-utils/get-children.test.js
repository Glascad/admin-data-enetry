import { getChildren, SystemMap } from "../../system-utils";
import { sample1 } from "../sample-systems";

function testGetChildren({
    system,
    item,
    children,
}) {

    describe(`Testing ${system.name} to get correct first optionValue`, () => {

        const childrenResult = getChildren(item, new SystemMap(system));

        test(`result has correct length`, () => {
            expect(childrenResult.length).toBe(children.length);
        });
        expect(childrenResult).toMatchObject(children);
    });
};

testGetChildren({
    system: sample1,
    item: {
        path: "1.SET",
        __typename: "SystemOption",
    },
    children: [
        {
            __typename: "SystemOptionValue",
            path: "1.SET.BACK"
        },
        {
            __typename: "SystemOptionValue",
            path: "1.SET.CENTER"
        },
        {
            __typename: "SystemOptionValue",
            path: "1.SET.FRONT"
        },
        {
            __typename: "SystemOptionValue",
            path: "1.SET.MULTI_PLANE"
        }
    ],
});

testGetChildren({
    system: sample1,
    item: {
        __typename: "DetailOptionValue",
        path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN"
    },
    children: [
        {
            __typename: "DetailOption",
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING",
        },
    ],
});

testGetChildren({
    system: sample1,
    item: {
        __typename: "DetailConfiguration",
        path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR",
        optional: true
    },
    children: [
        {
            __typename: "ConfigurationOption",
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
            defaultConfigurationOptionValue: "STANDARD_DUTY"
        },
    ],
});

testGetChildren({
    system: {},
    item: {},
    children: [],
});

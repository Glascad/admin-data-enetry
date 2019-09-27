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
        path: "1.SET.CENTER",
        __typename: "SystemOptionValue",
    },
    children: [
        {
            __typename: "SystemOption",
            path: "1.SET.CENTER.JOINERY",
        },
    ],
});

testGetChildren({
    system: sample1,
    item: {
        __typename: "DetailOptionValue",
        path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN"
    },
    children: [
        {
            __typename: "DetailOption",
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING",
        },
    ],
});

testGetChildren({
    system: sample1,
    item: {
        __typename: "SystemConfiguration",
        path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR",
        optional: true
    },
    children: [
        {
            __typename: "ConfigurationOption",
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR.DURABILITY",
            defaultConfigurationOptionValue: "STANDARD_DUTY"
        },
    ],
});
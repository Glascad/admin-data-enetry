import { getSiblings, SystemMap } from "../../system";
import { sample1 } from "../sample-systems";

function testGetSiblings({
    system,
    item,
    siblings,
}) {

    describe(`Testing ${system.name} to get correct first optionValue`, () => {

        const siblingsResult = getSiblings(item, new SystemMap(system));

        test(`result has correct length`, () => {
            expect(siblingsResult.length).toBe(siblings.length);
        });
        expect(siblingsResult).toMatchObject(siblings);
    });
};

testGetSiblings({
    system: sample1,
    item: {
        path: "1.SET.BACK",
        __typename: "SystemOptionValue",
    },
    siblings: [
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
    ],
});

testGetSiblings({
    system: sample1,
    item: {
        __typename: "ConfigurationOption",
        path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY"
    },
    siblings: [
        {
            __typename: "ConfigurationOption",
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY",
        },
    ],
});

testGetSiblings({
    system: sample1,
    item: {
        __typename: "SystemDetail",
        path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD",
        optional: false
    },
    siblings: [
        {
            __typename: "SystemDetail",
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD"
        },
        {
            __typename: "SystemDetail",
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL"
        },
        {
            __typename: "SystemDetail",
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL"
        },
    ],
});
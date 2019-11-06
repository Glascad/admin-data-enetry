import { getSiblings, SystemMap } from "../../system-utils";
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
        {
            __typename: "SystemOptionValue",
            path: "1.SET.MULTI_PLANE"
        }
    ],
});

testGetSiblings({
    system: sample1,
    item: {
        __typename: "DetailOption",
        path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING"
    },
    siblings: [
        {
            __typename: "DetailOption",
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING",
        },
    ],
});

testGetSiblings({
    system: sample1,
    item: {
        __typename: "DetailConfiguration",
        path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR",
        optional: false
    },
    siblings: [
        {
            __typename: "DetailConfiguration",
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.COMPENSATING_RECEPTOR",
            optional: false
        },
        {
            __typename: "DetailConfiguration",
            path: "1.SET.CENTER.JOINERY.SCREW_SPLINE.HEAD.STOPS.DOWN.GLAZING.INSIDE.HEAD",
            optional: false
        },
    ],
});
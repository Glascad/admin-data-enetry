import { getParentTrail } from "../../system-utils";
import { sample1 } from "../sample-systems";

function testGetParentTrail({
    system,
    item,
    trail,
}) {
    describe('Testing get parent trail', () => {
        const result = getParentTrail(item, system);
        test('Trail has correct length', () => {
            expect(result).toHaveLength(trail.length);
        });
        test('Trail has correct items', () => {
            result.forEach((item, i) => {
                expect(item).toMatchObject(trail[i]);
            });
        });
    });
}

testGetParentTrail({
    system: sample1,
    item: {
        __typename: "SystemOptionValue",
        id: 5,
        name: "SCREW_SPLINE",
        parentSystemOptionId: 2,
    },
    trail: [
        // {
        //     __typename: "SystemOption",
        //     id: 2
        // },
        // only needs to retrieve selected option values upward in the tree
        {
            __typename: "SystemOptionValue",
            id: 3,
            name: "CENTER",
        },
        // along with the passed in item
        {
            __typename: "SystemOptionValue",
            id: 5,
            name: "SCREW_SPLINE",
            parentSystemOptionId: 2,
        },
        // that way the array has a single shape
        // {
        //     __typename: "SystemOption",
        //     id: 1,
        // },
    ],
});

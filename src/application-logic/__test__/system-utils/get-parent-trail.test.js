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
            expect(result.length).toBe(trail.length);
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
    },
    trail: [
        {
            __typename: "SystemOption",
            id: 2
        },
        {
            __typename: "SystemOptionValue",
            id: 3
        },
        {
            __typename: "SystemOption",
            id: 1,
        },
    ],
});

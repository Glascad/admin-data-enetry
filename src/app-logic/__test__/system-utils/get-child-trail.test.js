import { getChildTrail } from "../../system-utils";
import { sample1 } from "../sample-systems";

function testGetChildTrail({
    system,
    item,
    trail,
}) {
    describe('Testing get child trail', () => {
        const result = getChildTrail(item, system);
        test('Result should have correct length', () => {
            expect(result).toHaveLength(trail.length);
        });
        test('Result should contain correct items in correct order', () => {
            result.forEach((item, i) => {
                expect(item).toMatchObject(trail[i]);
            });
        });
    });
}

testGetChildTrail({
    system: sample1,
    item: {
        __typename: "SystemDetail",
        id: 1,
        detailType: "HEAD",
    },
    trail: [
        {
            __typename: "DetailOptionValue",
            
        },
    ],
});

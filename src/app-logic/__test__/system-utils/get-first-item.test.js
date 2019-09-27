import { getFirstItem } from "../../system-utils";
import { sample1 } from "../sample-systems";

function testGetFirstItem({
    system,
    firstItem,
}) {

    describe(`Testing getFirstItem() on '${system.name}' to get correct first optionValue`, () => {
        const firstItemResult = getFirstItem(system);

        test(`testing name, id, typename and nodeId match`, () => {
            expect(firstItemResult).toMatchObject(firstItem);
        });
    });
};

testGetFirstItem({
    system: sample1,
    firstItem: {
        path: "1.SET",
    },
});
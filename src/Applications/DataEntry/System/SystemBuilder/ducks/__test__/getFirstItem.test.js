import { sample1 } from "../../../sample-systems";
import getFirstItem from "../actions/getFirstItem";

function testGetFirstItem({
    system,
    firstItem,
}) {

    const firstItemResult = getFirstItem(system);

    describe(`Testing ${system.name} to get correct first optionValue`, () => {
        test(`testing name, id, typename and nodeId match`, () => {
            expect(firstItemResult).toMatchObject(firstItem);
        });
    });
};

testGetFirstItem({
    system: sample1,
    firstItem: {
        __typename: "SystemOption",
        nodeId: "WyJzeXN0ZW1fb3B0aW9ucyIsMV0=",
        id: 1,
        name: "SET",
    }
});
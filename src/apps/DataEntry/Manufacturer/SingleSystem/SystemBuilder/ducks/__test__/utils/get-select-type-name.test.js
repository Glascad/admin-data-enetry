import { getSelectTypeName } from "../../utils"

function testGetSelectTypeName({
    childValues,
    selectType,
    result
}) {
    describe("Testing to get the right name for the selectItem", () => {
        const name = getSelectTypeName(childValues, selectType);
        test(`name matches ${result}`, () => {
            expect(name).toBe(result);
        });
    });
};

testGetSelectTypeName({
    childValues: [
        {
            path: "1.SET.SELECT_DETAIL_TYPE"
        },
        {
            path: "1.SET.SELECT_DETAIL_TYPE_"
        },
        {
            path: "1.SET.SELECT_DETAIL_TYPE__"
        },
        {
            path: "1.SET.SELECT_DETAIL_TYPE____"
        },
    ],
    selectType: "SELECT_DETAIL_TYPE",
    result: "SELECT_DETAIL_TYPE___"
});

testGetSelectTypeName({
    childValues: [
        {
            path: "1.SET.SELECT_DETAIL_TYPE"
        },
        {
            path: "1.SET.SELECT_DETAIL_TYPE__"
        },
        {
            path: "1.SET.SELECT_DETAIL_TYPE___"
        },
    ],
    selectType: "SELECT_DETAIL_TYPE",
    result: "SELECT_DETAIL_TYPE_"
});

testGetSelectTypeName({
    childValues: [
        {
            path: "1.SET.SELECT_CONFIGURATION_TYPE"
        },
        {
            path: "1.SET.SELECT_CONFIGURATION_TYPE_"
        },
        {
            path: "1.SET.SELECT_CONFIGURATION_TYPE__"
        },
        {
            path: "1.SET.SELECT_CONFIGURATION_TYPE___"
        },
    ],
    selectType: "SELECT_CONFIGURATION_TYPE",
    result: "SELECT_CONFIGURATION_TYPE____"
});
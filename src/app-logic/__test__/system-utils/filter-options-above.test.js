import sample1 from "../sample-systems/sample1.json";
import { filterOptionsAbove } from "../../system.js";

function testFilterOptionsAbove({
    item,
    optionList,
    result
}) {
    const filteredOptions = filterOptionsAbove(item, optionList);
    describe(`List should be filtered due to items above`, () => {
        test(`testing for ${item.name}`, () => {
            expect(filteredOptions).toMatchObject(result);
        })
    })

}

testFilterOptionsAbove({
    item: {
        __typename: "SystemOption",
        nodeId: "WyJzeXN0ZW1fb3B0aW9ucyIsMl0=",
        path: "1.SET.CENTER"
    },
    optionList: [
        { name: "JOINERY" },
        { name: "SET" },
        { name: "OTHER" }
    ],
    result: [{ name: "JOINERY" }, { name: "OTHER" }]
});
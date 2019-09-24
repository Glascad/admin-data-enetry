import sample1 from "../sample-systems/sample1.json";
import { filterOptionsAbove } from "../../system-utils.js";

function testFilterOptionsAbove({
    item,
    optionList,
    system,
    result
}) {
    const filteredOptions = filterOptionsAbove(item, system, optionList);
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
        id: 2,
        name: "JOINERY",
        parentSystemOptionValueId: 3
    },
    optionList: [
        { name: "JOINERY" },
        { name: "SET" },
        { name: "OTHER" }
    ],
    system: sample1,
    result: [{ name: "JOINERY" }, { name: "OTHER" }]
});
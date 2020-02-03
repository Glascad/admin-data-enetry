import { samplePart, samplePart2 } from "../../../../app-logic/__test__/sample-systems";
import { getViewBox } from "../../svg-utils";

function testGetViewBox({
    selectedItem: {
        _part: {
            paths,
        }
    },
    expected,
}) {
    describe(`tests getViewBox for correct view box value`, () => {
        const result = getViewBox(paths);
        test(`${result} should be ${expected}`, () => {
            expect(result).toEqual(expected);
        });
    });
};

testGetViewBox({
    selectedItem: samplePart,
    expected: "0.024 0 4.451995 2",
});

testGetViewBox({
    selectedItem: samplePart2,
    expected: "0.0239779174273476 0.781865082558085 1.5386562870422524 1.2181349174419052",
});
import { getAlignmentCoordinate } from "../../svg-utils"
import { DIRECTIONS } from "../../..";
import { samplePart } from "../../../../app-logic/__test__/sample-systems";

const {
    UP,
    VCENTER,
    DOWN,
    RIGHT,
    HCENTER,
    LEFT,
} = DIRECTIONS;

function testGetAlignmentCoordinates({
    direction,
    selectedItem,
    expected,
}) {
    describe(`tests getAlignCoordinate for correct x or y value`, () => {
        const result = getAlignmentCoordinate(...direction, selectedItem);
        test(`result ${result} to be ${expected}.`, () => {
            expect(result).toBe(expected);
        });
    });
};

testGetAlignmentCoordinates({
    direction: UP,
    selectedItem: samplePart,
    expected: 2,
});

testGetAlignmentCoordinates({
    direction: VCENTER,
    selectedItem: samplePart,
    expected: 1,
});

testGetAlignmentCoordinates({
    direction: DOWN,
    selectedItem: samplePart,
    expected: 0,
});

testGetAlignmentCoordinates({
    direction: RIGHT,
    selectedItem: samplePart,
    expected: 4.475995,
});

testGetAlignmentCoordinates({
    direction: HCENTER,
    selectedItem: samplePart,
    expected: 2.2499975,
});

testGetAlignmentCoordinates({
    direction: LEFT,
    selectedItem: samplePart,
    expected: 0.024,
});

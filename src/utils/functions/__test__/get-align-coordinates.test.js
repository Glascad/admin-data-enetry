import { getAlignmentCoordinate } from "../svg-utils";
import { samplePart } from "../../../app-logic/__test__/sample-systems";

function testGetAlignCoordinates({
    vertical,
    start,
    selectedItem,
    transform,
    expected,
}) {
    describe(`It tests the function getAlignCoordinates to get the correct values`, () => {
        const result = getAlignmentCoordinate(vertical, start, selectedItem, transform);
        test(`result: ${result} === expected: ${expected}`, () => {
            expect(result).toBe(expected);
        });
    });
};

// no transformation
testGetAlignCoordinates({
    vertical: true,
    start: true,
    selectedItem: samplePart,
    transform: undefined,
    expected: 0,
});
testGetAlignCoordinates({
    vertical: true,
    start: false,
    selectedItem: samplePart,
    transform: undefined,
    expected: 500,
});
testGetAlignCoordinates({
    vertical: false,
    start: true,
    selectedItem: samplePart,
    transform: undefined,
    expected: 6,
});
testGetAlignCoordinates({
    vertical: false,
    start: false,
    selectedItem: samplePart,
    transform: undefined,
    expected: 1118.99875,
});

// translate transformation

testGetAlignCoordinates({
    vertical: true,
    start: true,
    selectedItem: samplePart,
    transform: {
        a: 1, b: 0, c: -50,
        d: 0, e: 1, f: 23,
        g: 0, h: 0, i: 1,
    },
    expected: 23,
});
testGetAlignCoordinates({
    vertical: true,
    start: false,
    selectedItem: samplePart,
    transform: {
        a: 1, b: 0, c: -50,
        d: 0, e: 1, f: 23,
        g: 0, h: 0, i: 1,
    },
    expected: 523,
});
testGetAlignCoordinates({
    vertical: false,
    start: true,
    selectedItem: samplePart,
    transform: {
        a: 1, b: 0, c: -50,
        d: 0, e: 1, f: 23,
        g: 0, h: 0, i: 1,
    },
    expected: -44,
});
testGetAlignCoordinates({
    vertical: false,
    start: false,
    selectedItem: samplePart,
    transform: {
        a: 1, b: 0, c: -50,
        d: 0, e: 1, f: 23,
        g: 0, h: 0, i: 1,
    },
    expected: 1068.99875,
});

// rotated 45 deg counter clockwise

testGetAlignCoordinates({
    vertical: true,
    start: true,
    selectedItem: samplePart,
    transform: {
        a: 0.7071067811865476, b: -0.7071067811865475, c: 0,
        d: 0.7071067811865476, e: 0.7071067811865476, f: 0,
        g: 0, h: 0, i: 1,
    },
    expected: 23,
});
testGetAlignCoordinates({
    vertical: true,
    start: false,
    selectedItem: samplePart,
    transform: {
        a: 0.7071067811865476, b: -0.7071067811865475, c: 0,
        d: 0.7071067811865476, e: 0.7071067811865476, f: 0,
        g: 0, h: 0, i: 1,
    },
    expected: 523,
});
testGetAlignCoordinates({
    vertical: false,
    start: true,
    selectedItem: samplePart,
    transform: {
        a: 0.7071067811865476, b: -0.7071067811865475, c: 0,
        d: 0.7071067811865476, e: 0.7071067811865476, f: 0,
        g: 0, h: 0, i: 1,
    },
    expected: -44,
});
testGetAlignCoordinates({
    vertical: false,
    start: false,
    selectedItem: samplePart,
    transform: {
        a: 0.7071067811865476, b: -0.7071067811865475, c: 0,
        d: 0.7071067811865476, e: 0.7071067811865476, f: 0,
        g: 0, h: 0, i: 1,
    },
    expected: 1068.99875,
});
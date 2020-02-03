import { getAlignmentCoordinate } from "../../system";
import { samplePart } from "../sample-systems";

let count = 0;

function testGetAlignCoordinates({
    vertical,
    first,
    selectedItem,
    transform,
    expected,
}) {
    describe(`(${++count}): It tests the function getAlignCoordinates to get the correct values`, () => {
        const result = getAlignmentCoordinate(vertical, first, selectedItem, transform);
        test(`result: ${result} === expected: ${expected}`, () => {
            expect(result).toBe(expected);
        });
    });
};

// no transformation
testGetAlignCoordinates({
    vertical: true,
    first: true,
    selectedItem: samplePart,
    transform: undefined,
    expected: 0,
});
testGetAlignCoordinates({
    vertical: true,
    first: false,
    selectedItem: samplePart,
    transform: undefined,
    expected: 2,
});
testGetAlignCoordinates({
    vertical: false,
    first: true,
    selectedItem: samplePart,
    transform: undefined,
    expected: 6 / 250,
});
testGetAlignCoordinates({
    vertical: false,
    first: false,
    selectedItem: samplePart,
    transform: undefined,
    expected: 1118.99875 / 250,
});

// translate transformation

testGetAlignCoordinates({
    vertical: true,
    first: true,
    selectedItem: samplePart,
    transform: {
        a: 1, b: 0, c: -50,
        d: 0, e: 1, f: 23,
        g: 0, h: 0, i: 1,
    },
    expected: 0,
});
testGetAlignCoordinates({
    vertical: true,
    first: false,
    selectedItem: samplePart,
    transform: {
        a: 1, b: 0, c: -50,
        d: 0, e: 1, f: 23,
        g: 0, h: 0, i: 1,
    },
    expected: 2,
});
testGetAlignCoordinates({
    vertical: false,
    first: true,
    selectedItem: samplePart,
    transform: {
        a: 1, b: 0, c: -50,
        d: 0, e: 1, f: 23,
        g: 0, h: 0, i: 1,
    },
    expected: 0.024,
});
testGetAlignCoordinates({
    vertical: false,
    first: false,
    selectedItem: samplePart,
    transform: {
        a: 1, b: 0, c: -50,
        d: 0, e: 1, f: 23,
        g: 0, h: 0, i: 1,
    },
    expected: 4.475995,
});

// rotated 45 deg counter clockwise

testGetAlignCoordinates({
    vertical: true,
    first: true,
    selectedItem: samplePart,
    transform: {
        a: 0.7071067811865476, b: -0.7071067811865475, c: 0,
        d: 0.7071067811865476, e: 0.7071067811865476, f: 0,
        g: 0, h: 0, i: 1,
    },
    expected: 0,
});
testGetAlignCoordinates({
    vertical: true,
    first: false,
    selectedItem: samplePart,
    transform: {
        a: 0.7071067811865476, b: -0.7071067811865475, c: 0,
        d: 0.7071067811865476, e: 0.7071067811865476, f: 0,
        g: 0, h: 0, i: 1,
    },
    expected: 2,
});
testGetAlignCoordinates({
    vertical: false,
    first: true,
    selectedItem: samplePart,
    transform: {
        a: 0.7071067811865476, b: -0.7071067811865475, c: 0,
        d: 0.7071067811865476, e: 0.7071067811865476, f: 0,
        g: 0, h: 0, i: 1,
    },
    expected: 0.024,
});
testGetAlignCoordinates({
    vertical: false,
    first: false,
    selectedItem: samplePart,
    transform: {
        a: 0.7071067811865476, b: -0.7071067811865475, c: 0,
        d: 0.7071067811865476, e: 0.7071067811865476, f: 0,
        g: 0, h: 0, i: 1,
    },
    expected: 4.475995,
});
import { samplePart } from "../../../../app-logic/__test__/sample-systems";
import { getPartExtremities } from "../../svg-utils";

function testGetExtremities({
    selectedItem: {
        _part: {
            paths,
        }
    },
    transform,
    expected,
}) {
    describe(`tests getExtremities for correct x and y value`, () => {
        const result = getPartExtremities({ paths }, transform);
        test(`x max and min and y max and min are equal to expected`, () => {
            expect(result).toEqual(expected);
        });
    });
};

testGetExtremities({
    selectedItem: samplePart,
    expected: {
        x: {
            max: 4.475995,
            min: 0.024,
        },
        y: {
            max: 2,
            min: 0,
        },
    },
});

testGetExtremities({
        selectedItem: samplePart,
        expected: {
            x: {
                max: 4.475995,
                min: 0.024,
            },
            y: {
                max: 2,
                min: 0,
            },
    },
    transform: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ],
});

testGetExtremities({
    selectedItem: samplePart,
    expected: {
        x: {
            max: 3.1650064170570813,
            min: -0.5925554826343208,
        },
        y: {
            max: 4.579219979430155,
            min: 0.01697056274847714,
        },
    },
    // transformed 45 deg CC
    transform: [
        [0.7071067811865476, -0.7071067811865475, 0],
        [0.7071067811865475, 0.7071067811865476, 0],
        [0, 0, 1],
    ],
});

testGetExtremities({
    selectedItem: samplePart,
    expected: {
        x: {
            max: 3.7538852687708784,
            min: -0.4493507545522574,
        },
        y: {
            max: 4.115142733422912,
            min: 0.01307133684036065,
        },
    },
    // transformed 33 deg CC
    transform: [
        [0.838670567945424, -0.5446390350150271, 0],
        [0.5446390350150271, 0.838670567945424, 0],
        [0, 0, 1],
    ],
});

testGetExtremities({
    selectedItem: samplePart,
    expected: {
        x: {
            max: -0.024,
            min: -4.475995,
        },
        y: {
            max: 2,
            min: 0,
        },
    },
    transform: [
        [-1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ],
});

testGetExtremities({
    selectedItem: samplePart,
    expected: {
        x: {
            max: -0.024,
            min: -4.475995,
        },
        y: {
            max: 0,
            min: -2,
        },
    },
    transform: [
        [-1, 0, 0],
        [0, -1, 0],
        [0, 0, 1],
    ],
});

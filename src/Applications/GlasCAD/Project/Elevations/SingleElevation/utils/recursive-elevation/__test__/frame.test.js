import RecursiveElevation from "../elevation";
// import sample3 from '../../../__test__/sample-elevations/sample3';
// import sample5 from '../../../__test__/sample-elevations/sample5';
// import sample6 from '../../../__test__/sample-elevations/sample6';
// import sample1Special from '../../../__test__/sample-elevations/sample1-special';

import {
    sample3,
    hhFrameError,
    sample5,
    sample6,
    error1,
    sample9,
} from '../../../__test__/sample-elevations';

// describe('Frame Tests', () => {
//     test('sample1 - has correct number of frames', () => {
//         const elevation = new RecursiveElevation(sample1)
//         expect(elevation.allFrames).toHaveProperty('length', 9);
//     });
//     // test('sample1 special - has correct number of frames', () => {
//     //     // const elevation = new RecursiveElevation(sample1Special)
//     //     expect(elevation.allFrames).toHaveProperty('length', 10);
//     // });
//     // test('sample1 special - has correct frame references (slightly offset)', () => {
//     //     // const elevation = new RecursiveElevation(sample1Special);
//     //     expect(elevation.containers[708].rightFrame).not.toBe(elevation.containers[707].rightFrame);
//     //     expect(elevation.containers[708].rightFrame).not.toBe(elevation.containers[709].leftFrame);
//     // });
//     // test('sample1 special - non-matching details do not belong to the same frame (verticals, slightly offset)', () => {
//     //     // const elevation = new RecursiveElevation(sample1Special);
//     //     expect(elevation.details[1]._frame).not.toBe(elevation.details[1792]._frame);
//     // });
//     // test('sample1 special - non-matching details do not belong to the same frame (horizontals, no offset)', () => {
//     //     // const elevation = new RecursiveElevation(sample1Special);
//     //     expect(elevation.details[1799]._frame).not.toBe(elevation.details[1793]._frame);
//     // });
//     // test('sample1 special - non-matching details do not belong to the same frame (completely separate)', () => {
//     //     // const elevation = new RecursiveElevation(sample1Special);
//     //     expect(elevation.details[1795]._frame).not.toBe(elevation.details[1792]._frame);
//     //     expect(elevation.details[1801]._frame).not.toBe(elevation.details[1792]._frame);
//     // });
//     // test('smaple1 special - matching details belong to the same frame', () => {
//     //     // const elevation = new RecursiveElevation(sample1Special);
//     //     expect(elevation.details[1791]._frame).toBe(elevation.details[1795]._frame);
//     //     expect(elevation.details[1798]._frame).toBe(elevation.details[1801]._frame);
//     // });
// });


// const testFrame = ({ elevation, detailId, payload, expectedResult }) => {

//     const sampleResult = new RecursiveElevation(elevation);
//     sampleResult: {
//         details[detailId]: {
//             __frame: frame
//         }
//     }
//     const frame = sampleResult.details[detailId].__frame;

//     describe(`testing frame methods for ${elevation.name}`, () => {

//         test(`testing getDetailAcrossPerpendicularByDirection() for ${elevation.name} for frame connected to ${detailId}`, () => {
//             expect()
//         });
//     });
// };

function testFrame({ elevation, frames }) {
    describe(`Testing frame methods for ${elevation.name}`, () => {
        const sampleElevation = new RecursiveElevation(elevation);
        frames.forEach(({ detailId, keys = [], methods = [] }) => {

            const { _frame } = sampleElevation.details[detailId];

            keys.forEach(([key, value]) => {
                test(`frame from detail ${detailId} has key: ${key} with value: ${value}`, () => {
                    // expect(_frame[key]).toEqual(value);
                    expect(_frame).toHaveProperty(key, value);
                });
            });

            methods.forEach(([method, args, result]) => {
                test(`frame from detail ${detailId} .${method} === ${result}`, () => {
                    expect(_frame[method](...args)).toEqual(
                        typeof result === "object" ?
                            Array.isArray(result) ?
                                expect.arrayContaining(
                                    result.map(item => (
                                        expect.objectContaining(item)
                                    ))
                                )
                                :
                                expect.objectContaining(result)
                            :
                            result
                    );
                });
            });
        });
    });
}

testFrame({
    elevation: hhFrameError,
    frames: [
        {
            detailId: 2082,
            keys: [
                ['firstEndRunsIntoEdgeOfRoughOpening', true],
                ['lastEndRunsIntoEdgeOfRoughOpening', true],
                ['firstEndRunsAlongEdgeOfRoughOpening', false],
                ['lastEndRunsAlongEdgeOfRoughOpening', false],
                ['needsTopExtension', true],
                ['needsBottomExtension', true],
                ['topExtension', 10],
                ['bottomExtension', 10],
            ],
            methods: [
                ["getContainersByDirection", [true], [{ id: 822 }, { id: 820 }, { id: 819 }]],
                ["getContainersByDirection", [false], [{ id: 826 }, { id: 824 }]],
                ["getFirstOrLastContainerByDirection", [true, true], { id: 822 }],
                ["getFirstOrLastContainerByDirection", [false, true], { id: 826 }],
            ],
        },
        // {
        //     detailId: 2041,
        //     keys: [
        //         ["vertical", true],
        //         ["sightline", 10],
        //         // ["canAddBay", true],
        //     ],
        //     methods: [
        //     ],
        // },
    ],
});

testFrame({
    elevation: sample3,
    frames: [
        {
            detailId: 2034,
            keys: [
                ["vertical", false],
                ["sightline", 10],
            ],
            methods: [
                ["getDetailAcrossPerpendicularByDirection", [false], { id: 2044 }],
                ["getContainersByDirection", [true], [{ id: 802 }]],
                ["getContainersByDirection", [false], [{ id: 803 }]],
                ["getFirstOrLastContainerByDirection", [true, true], { id: 802 }],
                ["getFirstOrLastContainerByDirection", [false, true], { id: 803 }],

            ],
        },
    ],
});

testFrame({
    elevation: error1,
    frames: [
        {
            detailId: 3641,
            keys: [
                ["vertical", true],
                ["needsTopExtension", true],
                ["needsBottomExtension", true],
                ["topExtension", 2],
                ["bottomExtension", 2],
                ["firstEndRunsIntoEdgeOfRoughOpening", true],
                ["lastEndRunsIntoEdgeOfRoughOpening", true],
            ],
        },
    ],
});

testFrame({
    elevation: sample5,
    frames: [
        {
            detailId: 2204,
            keys: [
                ["vertical", true],
                ["sightline", 10],
            ],
            methods: [
                // ["canAddBay", [], false],
            ],
        },
    ],
});

testFrame({
    elevation: sample6,
    frames: [
        {
            detailId: 3479,
            keys: [
                // ["vertical", true],
                // ["sightline", 2],
            ],
            methods: [
                // ["canAddBay", [], true],
                // ["canAddBayRight", [], true],
                // ["canAddBayLeft", [], true],
            ],
        },
    ],
});

testFrame({
    elevation: sample9,
    frames: [
        {
            detailId: 6907,
            keys: [
                ["vertical", true],
                ["details", [{ id: 6924 }, { id: 6907 }, { id: 4574 }, { id: 4570 }]],
            ],
            methods: [
                ["getDetailAcrossPerpendicularByDirection", [true], { id: 4574 }],
                ["getDetailAcrossPerpendicularByDirection", [false], { id: 6924 }],
                ["getFirstOrLastContainerByDirection", [true, true], { id: 2589 }],
                ["getFirstOrLastContainerByDirection", [false, true], { id: 2590 }],
            ]
        }
    ]
})

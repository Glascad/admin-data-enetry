import RecursiveElevation from "../elevation";
import sample3 from '../../../__test__/sample-elevations/sample3';
// import sample1Special from '../../../__test__/sample-elevations/sample1-special';

// test('', () => { });

// describe('Frame Tests', () => {
//     test('sample1 - has correct number of frames', () => {
//         const elevation = new RecursiveElevation(sample1)
//         expect(elevation.allFrames).toHaveProperty('length', 9);
//     });
//     test('sample1 special - has correct number of frames', () => {
//         const elevation = new RecursiveElevation(sample1Special)
//         expect(elevation.allFrames).toHaveProperty('length', 10);
//     });
//     test('sample1 special - has correct frame references (slightly offset)', () => {
//         const elevation = new RecursiveElevation(sample1Special);
//         expect(elevation.containers[708].rightFrame).not.toBe(elevation.containers[707].rightFrame);
//         expect(elevation.containers[708].rightFrame).not.toBe(elevation.containers[709].leftFrame);
//     });
//     test('sample1 special - non-matching details do not belong to the same frame (verticals, slightly offset)', () => {
//         const elevation = new RecursiveElevation(sample1Special);
//         expect(elevation.details[1]._frame).not.toBe(elevation.details[1792]._frame);
//     });
//     test('sample1 special - non-matching details do not belong to the same frame (horizontals, no offset)', () => {
//         const elevation = new RecursiveElevation(sample1Special);
//         expect(elevation.details[1799]._frame).not.toBe(elevation.details[1793]._frame);
//     });
//     test('sample1 special - non-matching details do not belong to the same frame (completely separate)', () => {
//         const elevation = new RecursiveElevation(sample1Special);
//         expect(elevation.details[1795]._frame).not.toBe(elevation.details[1792]._frame);
//         expect(elevation.details[1801]._frame).not.toBe(elevation.details[1792]._frame);
//     });
//     test('smaple1 special - matching details belong to the same frame', () => {
//         const elevation = new RecursiveElevation(sample1Special);
//         expect(elevation.details[1791]._frame).toBe(elevation.details[1795]._frame);
//         expect(elevation.details[1798]._frame).toBe(elevation.details[1801]._frame);
//     });
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
        frames.forEach(({ detailId, keys, methods }) => {

            const _frame = sampleElevation.details[detailId]._frame;


            keys.forEach(([key, value]) => {
                test(`frame from detail ${detailId} has key: ${key} with value: ${value}`, () => expect(_frame[key]).toEqual(value));
            });
            methods.forEach(([method, args, result]) => {
                test(`frame from detail ${detailId} .${method} === ${result}`, () => {
                    expect(_frame[method](args).id).toEqual(result)
                })
            })
        })
    })
}


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
                ["getDetailAcrossPerpendicularByDirection", [false], 2044],
                // ["getContainersByDirection", [true], [802]],
                // ["getContainersByDirection", [false], [803]],
                ["getFirstOrLastContainerByDirection", [true, true], 802],
                ["getFirstOrLastContainerByDirection", [false, true], 803],

            ],
        },
    ],
})

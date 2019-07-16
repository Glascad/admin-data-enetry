import RecursiveElevation from "../elevation";

import sample1 from '../../../__test__/sample-elevations/sample1';
import { sample9 } from "../../../__test__/sample-elevations";

function testDetails({ elevation, details }) {
    describe(`Testing frame methods for ${elevation.name}`, () => {
        const sampleElevation = new RecursiveElevation(elevation);
        details.forEach(({ id, keys = [], methods = [] }) => {

            const detail = sampleElevation.details[id];

            keys.forEach(([key, value]) => {
                test(`frame from detail ${id} has key: ${key} with value: ${value}`, () => {
                    // expect(_frame[key]).toEqual(value);
                    expect(detail).toHaveProperty(key, value);
                });
            });

            methods.forEach(([method, args, result]) => {
                test(`frame from detail ${id} .${method} === ${result}`, () => {
                    expect(detail[method](...args)).toEqual(
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

//OLD CODE
// function testDetails({ elevation, details }) {
//     const recursiveElevation = new RecursiveElevation(elevation);
//     describe(`Testing ${elevation.name} details`, () => {
//         details.forEach(({ id, keys, methods }) => {
//             const detail = recursiveElevation.details[id];
//             describe(`Testing detail id: ${id} keys`, () => {
//                 keys.forEach(([key, value]) => {
//                     test(`Detail[${key}] === ${value}`, () => {
//                         expect(detail).toHaveProperty(key, value);
//                     });
//                 });
//                 describe(`Testing detail id: ${id} methods`, () => {
//                     methods.forEach(([method, args, result]) => {
//                         test(`Detail.${method}(${args}) === ${result}`, () => {
//                             expect(detail[method](args)).toEqual(result);
//                         });
//                     });
//                 });
//             });
//         });
//     });
// }

testDetails({
    elevation: sample1,
    details: [
        {
            id: 1,
            keys: [
                // key, expected value
                // ["key", "expected value"],
            ],
            methods: [
                // methodname, arguments, expected result
                // ["methodName", [true, false], true],
            ],
        },
    ],
});

testDetails({
    elevation: sample9,
    details: [
        {
            id: 6907,
            keys: [
                ["vertical", true],
                ["detailType", "Jamb"],
                ["runsAlongEdgeOfRoughOpening", true],

            ],
            methods: [
                ["getDetailsAcrossPerpendicularsByDirection", [true], [{ id: 6924 }]],
                ["getDetailsAcrossPerpendicularsByDirection", [false], [{ id: 4574 }]],
                ["getDetailsAcrossPerpendicularsByDirectionAndContainerDirection", [true, true], [{id: 6924}]],
                ["getDetailsAcrossPerpendicularsByDirectionAndContainerDirection", [true, false], [{id: 6924}]],
                ["getDetailsAcrossPerpendicularsByDirectionAndContainerDirection", [false, true], [{id: 4574}]],
                ["getDetailsAcrossPerpendicularsByDirectionAndContainerDirection", [false, false], [{id: 4574}]],

            ]
        }
    ]
})

import RecursiveElevation from "../elevation";
import sample3 from '../../../utils/sample-elevations/sample3';

function testContainer({ elevation, sampleContainers }) {
    describe(`Testing container methods for ${elevation.name}`, () => {
        const sampleElevation = new RecursiveElevation(elevation);
        sampleContainers.forEach(({ id, keys, methods }) => {

            const container = sampleElevation.containers[id];

            keys.forEach(([key, value]) => {
                test(`container ${id} has key: ${key} with value: ${value}`, () => expect(container[key]).toEqual(value));
            });
            methods.forEach(([method, args, testResult]) => {
                expect(container[method](...args)).toEqual(
                    expect.arrayContaining(testResult.map(item => (
                        expect.objectContaining(item)
                    )))
                );
            })
        })
    })
}

//When returning an array of objects
testContainer({
    elevation: sample3,
    sampleContainers: [
        {
            id: 805,
            keys: [
                ["id", 805],
                ["original", false],
                // ["__placementX", 106.666666666666667],
                // ["__placementY", 50],
            ],
            methods: [
                ["getDetailsByDirection",
                    [false, true],
                    [
                        { id: -1 },
                        { id: 2030 },
                        { id: 2033 }
                    ]
                ],
                ["getDetailsByDirection",
                    [false, false],
                    [
                        { id: 2041 },
                        { id: -2 },
                        { id: 2043 },
                    ],
                ],
                ["getDetailsByDirection",
                    [true, true],
                    [
                        { id: 2039 },
                    ],
                ],
                ["getDetailsByDirection",
                    [true, false],
                    [
                        { id: 2044 },
                    ],
                ],
                ["getImmediateContainersByDirection",
                    [true, true],
                    [
                        { id: 804 },
                    ],
                ],
                ["getImmediateContainersByDirection",
                    [false, true],
                    [
                        { id: 802 },
                        { id: 801 },
                        { id: 800 },
                    ],
                ],
                ["getImmediateContainersByDirection",
                    [true, false],
                    [
                        { id: 807 },
                    ],
                ],
                ["getImmediateContainersByDirection",
                    [false, false],
                    [
                        { id: 810 },
                        { id: 809 },
                        { id: 808 },
                    ],
                ],
                // ["getFirstOrLastDetailByDirection",
                //     [false, false],
                //     [
                //         { id: 810 },
                //         { id: 809 },
                //         { id: 808 },
                //     ],
                // ],
            ],
        },
    ],
});

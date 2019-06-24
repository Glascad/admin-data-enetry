import RecursiveElevation from "../elevation";

import sample1 from '../../../__test__/sample-elevations/sample1';

function testDetails({ elevation, details }) {
    const recursiveElevation = new RecursiveElevation(elevation);
    describe(`Testing ${elevation.name} details`, () => {
        details.forEach(({ id, keys, methods }) => {
            const detail = recursiveElevation.details[id];
            describe(`Testing detail id: ${id} keys`, () => {
                keys.forEach(([key, value]) => {
                    test(`Detail[${key}] === ${value}`, () => {
                        expect(detail).toHaveProperty(key, value);
                    });
                });
                describe(`Testing detail id: ${id} methods`, () => {
                    methods.forEach(([method, args, result]) => {
                        test(`Detail.${method}(${args}) === ${result}`, () => {
                            expect(detail[method](args)).toEqual(result);
                        });
                    });
                });
            });
        });
    });
}

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

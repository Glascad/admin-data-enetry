
// VALIDATION TEST

const validateElevation = (rawElevation) => {
    // no orphans
    // no invalid references
    // no overlapping containers
    // no exceeding rough opening
    // no missing details
    // no duplicate details
}



// ACTION TEST

const testAction = (intialElevation, testName, ACTION, payload, expectedResult) => {
    const actualResult = ACTION(intialElevation);
    describe(testName, () => {
        // ...
        test('', () => expect(true).toBe(true));
        test('', () => expect(true).toBe(true));
        test('', () => expect(true).toBe(true));
        test('', () => expect(true).toBe(true));
    });
}

const testMultipleActions = (intialElevation, describeName, ...argumentSets) => {
    describe(describeName, () => {
        argumentSets
            .reduce((elevation, argumentSet) => {
                testAction(elevation, ...argumentSet);
            }, intialElevation);
    });
}

const sample1 = {} // imported from JSON
const action = () => { } // imported from application
const expected = {}; //{} // imported from JSON

testAction(sample1, 'merge sample1 - 10 left', action, expected);
testAction(sample1, 'merge sample1 - 8 down', action, expected);

// testMultipleActions(sample1, 'sample1 tests',
//     ['merge 10 left', merge, { container: 10, direction: 'left' }, expected],
//     ['merge 9 left', merge, { container: 9, direction: 'left' }, secondExpected],
// );

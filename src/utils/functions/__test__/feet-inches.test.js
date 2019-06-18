import ImperialValue from "../feet-inches";

function testImperialValue({
    string,
    feet,
    inches,
    number,
    inputs,
}) {
    inputs.map(inputValue => {
        const outputValue = new ImperialValue(inputValue);
        describe(`Testing imperial values for "${inputValue}"`, () => {
            test('string output is correct', () => {
                expect(`${outputValue}`).toBe(string);
            });
            test('feet output is correct', () => {
                expect(outputValue.feet).toBe(feet);
            });
            test('inch output is correct', () => {
                expect(outputValue.inches).toBe(inches);
            });
            test('number output is correct', () => {
                expect(outputValue.value).toBe(number);
            });
        });
    })
}

/**
 * INPUT FORMATS
 * 
 * inches
 * inches"
 * inches.decimal
 * inches.decimal"
 * inches num/den
 * inches num/den"
 * inches-num/den
 * inches-num/den"
 * 
 * num/den (inches)
 * num/den"
 * 
 * feet inches
 * feet inches"
 * feet inches.decimal
 * feet inches.decimal"
 * feet inches num/den
 * feet inches num/den"
 * feet inches-num/den
 * feet inches-num/den"
 * 
 * feet-inches
 * feet-inches"
 * feet-inches.decimal
 * feet-inches.decimal"
 * feet-inches num/den
 * feet-inches num/den"
 * feet-inches-num/den
 * feet-inches-num/den"
 * 
 * 
 * feet' inches
 * feet' inches"
 * feet' inches.decimal
 * feet' inches.decimal"
 * feet' inches num/den
 * feet' inches num/den"
 * feet' inches-num/den
 * feet' inches-num/den"
 * 
 * feet'-inches
 * feet'-inches"
 * feet'-inches.decimal
 * feet'-inches.decimal"
 * feet'-inches num/den
 * feet'-inches num/den"
 * feet'-inches-num/den
 * feet'-inches-num/den"
 * 
 * feet.decimal'
 * num/den'
 * 
 */

const testCases = [
    {
        string: `1'-3"`,
        feet: 1,
        inches: 3,
        number: 15,
        inputs: [
            `15`,
            `1 3`,
            `1-3`,
            `1'-3`,
            `1'-3"`,
            `1' 3"`,
        ],
    },
    {
        string: `1'-3-1/2"`,
        feet: 1,
        inches: 3.5,
        number: 15.5,
        inputs: [
            `15.5`,
            `15.5"`,
            `15 1/2`,
            `15 1/2"`,
            `1 3.5`,
            `1 3 1/2`,
            `1-3 1/2`,
            `1'-3 1/2`,
            `1' 3 1/2"`,
            `1' 3-1/2"`,
            `1' 3-1/2`,
            `1'-3-1/2"`,
            `1'-3-1/2"`,
            `1'-3-1/2`,
        ],
    },
    {
        string: `1'-1/2"`,
        feet: 1,
        inches: 0.5,
        number: 12.5,
        inputs: [
            `12.5`,
            `1 0.5`,
            `1 .5`,
            `1 0 1/2`,
            `1' 0.5"`,
            `1' .5"`,
            `1' 0.5`,
            `1' .5`,
            `1' 1/2"`,
            `1' 1/2`,
            `1-0.5`,
            `1-.5`,
            `1-0 1/2`,
            `1'-0.5"`,
            `1'-.5"`,
            `1'-0.5`,
            `1'-.5`,
            `1'-1/2"`,
            `1'-1/2`,
            `12.5`,
            `12.5"`,
            `12 1/2`,
            `12 1/2"`,
            `0 12.5`,
            `0 12.5"`,
            `0 12 1/2`,
            `0 12 1/2"`,
            `0' 12.5`,
            `0'-12.5"`,
            `0'-12-1/2`,
            `0'-12-1/2"`,
            `0' 12 1/2`,
            `0' 12 1/2"`,
        ],
    },
    {
        string: `-1'-3"`,
        feet: -1,
        inches: -3,
        number: -15,
        inputs: [
            `-15`,
            `-1 3`,
            `-1-3`,
            `-1'-3`,
            `-1'-3"`,
            `-1' 3"`,
        ],
    },
    {
        string: `-1'-3-1/2"`,
        feet: -1,
        inches: -3.5,
        number: -15.5,
        inputs: [
            `-15.5`,
            `-15.5"`,
            `-15 1/2`,
            `-15 1/2"`,
            `-1 3.5`,
            `-1 3 1/2`,
            `-1-3 1/2`,
            `-1'-3 1/2`,
            `-1' 3 1/2"`,
            `-1' 3-1/2"`,
            `-1' 3-1/2`,
            `-1'-3-1/2"`,
            `-1'-3-1/2"`,
            `-1'-3-1/2`,
        ],
    },
    {
        string: `-1'-1/2"`,
        feet: -1,
        inches: -0.5,
        number: -12.5,
        inputs: [
            `-12.5`,
            `-1 0.5`,
            `-1 .5`,
            `-1 0 1/2`,
            `-1' 0.5"`,
            `-1' .5"`,
            `-1' 0.5`,
            `-1' .5`,
            `-1' 1/2"`,
            `-1' 1/2`,
            `-1-0.5`,
            `-1-.5`,
            `-1-0 1/2`,
            `-1'-0.5"`,
            `-1'-.5"`,
            `-1'-0.5`,
            `-1'-.5`,
            `-1'-1/2"`,
            `-1'-1/2`,
            `-12.5`,
            `-12.5"`,
            `-12 1/2`,
            `-12 1/2"`,
            `-0 12.5`,
            `-0 12.5"`,
            `-0 12 1/2`,
            `-0 12 1/2"`,
            `-0' 12.5`,
            `-0'-12.5"`,
            `-0'-12-1/2`,
            `-0'-12-1/2"`,
            `-0' 12 1/2`,
            `-0' 12 1/2"`,
        ],
    },
];

testCases.map(testImperialValue);

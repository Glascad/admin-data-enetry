import { numberToString, parseFraction } from './fractions';

/**regex that gets the feet, inches and fraction values from a string
* ^ start of string
* (?<feet>d+\.?d*) assigning a value that may be a decimal to foot
* ?? Non greedy optional
* \'? Greedy and may contain ' after the number 
* \s? may contain a space
* (?<inches>\d+\.?\d*)??\"?\s? same thing for inches \"?? Not greedy
* (?<inchFraction>\d+\/\d+) fraction must contain /
* ? Greedy optional
* \"? may include the " sign
* $ end of string
*/

const separateValueIntoGroups = value => {
    const inputValue = value.replace(/-/g, " ");
    const regEx = /^(?<isNegative>-*)(?<feet>\d*\.?\d*)??\'?\s?(?<inches>\d*\.?\d*)??\"??\s?(?<inchFraction>\d+\/\d+)?\"?$/;

    const returnValue = regEx.exec(inputValue);

    return returnValue ?
        returnValue.groups
        :
        //Do something here to let the user know
        {}
}

const getFeetAndInches = value => {
    const group = separateValueIntoGroups(value);
    const inchFraction = parseFraction(group.inchFraction);
    const inches = parseFloat(group.inches);
    const feet = parseFloat(group.feet);
    const isNegative = group.isNegative;
    const value = (
        (
            feet * 12 || 0
        ) + (
            inches || 0
        ) + (
            inchFraction || 0
        )
    );
    return isNegative ?
        -value
        :
        value
};

export default class ImperialValue {
    constructor(value) {
        this.inputtedValue = value;
        this.value = typeof value === 'number' ?
            value
            :
            typeof value === 'string' ?
                getFeetAndInches(value)
                :
                0;
        this.inches = this.value % 12
        this.feet = (this.value - this.inches) / 12;
        this.stringValue = `${this}`;
    }

    toString = () => `${
        this.feet
        }'${
        this.inches
            ?
            `-${
            numberToString(this.inches)
            }"`
            :
            ''
        }`;
}

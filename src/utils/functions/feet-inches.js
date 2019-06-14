import { numberToString } from './fractions';
import { parseFraction } from './fractions';
import { simplifyFraction } from './fractions';

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
    const regEx = /^(?<feet>\d*\.?\d*)??\'?\s?(?<inches>\d*\.?\d*)??\"??\s?(?<inchFraction>\d+\/\d+)?\"?$/;

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
    return (
        (
            feet * 12 || 0
        ) + (
            inches || 0
        ) + (
            inchFraction || 0
        )
    );
};

export default class ImperialValue {
    constructor(value) {
        this.value = getFeetAndInches(value);
        this.inches = this.value % 12
        this.feet = (this.value - this.inches) / 12;
    }

    toString = () => `${this.feet}'-${numberToString(this.inches)}"`
}

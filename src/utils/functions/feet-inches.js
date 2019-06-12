import { toFraction } from './fractions';

export default class ImperialValue {
    constructor(value) {
        const type = typeof value;

        if (type === 'string') {

            this.string = value;

            // console.log("NEW VALUE");
            // console.log(value);
            // console.log(value.replace(/((\d+)(\D|$))/g, '$1!!!').split(/!!!/g));
            // console.log(value.split(/\D/g).map(Number));
            // console.log(value.split(/ |-/g));
            // const [feet, inches] = value.split("'");
            // console.log({ feet, inches });
            const {
                feet,
                inches,
            } = value.match(/'/) ?
                    ((str) => {
                        const [feet, inches] = str.split(/'/);
                        return { feet, inches };
                    })(value) : {};

            if (value.match("'")) {

            }

            // value.replace(/\d+/g, match => {
            //     console.log(match);
            // })

            // console.log([...value.matchAll(/(\D*?\d+\D*?)*/)]);

            // value.replace(
            //     /^\D*?((\D*)((\d+)(\D{0,1})))*\D*?$/,
            //     (match, ...groups) => {
            //         console.log([
            //             { match },
            //             ...groups,
            //         ]);
            //     });

            // const {
            //     feet,
            //     inches,
            //     fraction,
            //     numerator,
            //     denominator,
            // } = JSON.parse(value
            //     .replace(
            //         /^.*?((\d+\.*\d*)('){0,1}(-| )){0,1}(\d*\.*\d*)((-| ){0,1}((\d+)\/(\d+)){0,1}){0,1}("){0,1}.*?$/,
            //         (match, a, feet, b, c, inches, d, e, fraction, numerator, denominator, ...rest) => {
            //             console.log([
            //                 { match },
            //                 { a },
            //                 { feet },
            //                 { b },
            //                 { c },
            //                 { inches },
            //                 { d },
            //                 { e },
            //                 { fraction },
            //                 { numerator },
            //                 { denominator },
            //                 ...rest,
            //             ]);
            //             const _ret = JSON.stringify({ feet, inches, fraction, numerator, denominator });
            //             // console.log(_ret);
            //             return _ret;
            //         },
            //     ));

            // console.log(`feet: ${feet}, inches: ${inches}, fraction: ${fraction}, numerator: ${numerator}, denominator: ${denominator}`);

            // this.input = {
            //     feet,
            //     inches,
            //     fraction,
            //     numerator,
            //     denominator,
            // };

            // this.value = (
            //     (
            //         (
            //             +feet || 0
            //         )
            //         *
            //         12
            //     ) + (
            //         +inches || 0
            //     ) + (
            //         (
            //             +numerator || 0
            //         ) / (
            //             +denominator || 1
            //         )
            //     )
            // );

            // console.log(this.value);

        } else if (type === 'number') {

        } else {
            throw new Error(`Invalid input type: ${type} for ImperialValue`);
        }
    }



    toString = () => `${this.feet}'-${toFraction(this.inches)}"`
}
//ANDREWS CODE 
// const ourAnswer = inputValue => {
    //   const inputArray = inputValue.split(/-| /);
    
    //   //Works the logic to figure out the measurments
    //   //If it only has one item and doesn't include "'" then it is inches
    //   if (inputArray.length === 1) {
    //     //if the value inside contains ' it will go to feet, else it will go to inches
    //     if (inputArray[0].match(/'/)) {
    //       const feet = inputArray[0].replace(/'/, "");
    //       const inches = 0;
    //     }
    //     else {
    //       const inches = inputArray[0].replace(/"/, "");
    //       const feet = 0;
    //     }
    //   }
    //   //If it has 2 spaces
    //   else if (inputArray.length === 2) {
    //     if (inputArray[1].match(/\//)) {
    //       const inches = getInchesFromFraction(inputArray[0], inputArray[1].replace(/"/, ""));
    //       const feet = 0;
    //     }
    //     else {
    //       const feet = inputArray[0].replace(/'/, "");
    //       const inches = inputArray[1].replace(/"/, "");
    //     }
    //   }
    //   //If it has 3 spaces
    //   else if (inputArray.length === 3) {
    //     const feet = inputArray[0].replace(/'/, "");
    //     const inches = getInchesFromFraction(inputArray[1], inputArray[2].replace(/"/, ""));
    //   }
    //   else {
    //     //INVALID Throw error
    //   }
    // };
    
    // const getInchesFromFraction = (wholeInch, fraction) => {
    //   //Gets fraction conversion
    //   return parseInt(wholeInch) + parseInt(fraction);
    // }
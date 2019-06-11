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

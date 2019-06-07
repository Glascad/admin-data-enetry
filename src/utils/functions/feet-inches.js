
export default class ImperialValue {
    constructor(value) {
        const type = typeof value;

        if (type === 'string') {

            this.string = value;
            
            const values = value
                .replace(
                    /((\d+\.*\d*)('|-| ){0,1}){0,1}(\d*\.*\d*)(('|-| )(\d+\/\d+)){0,1}/,
                    (feet, inches, fractions, ...rest) => { 
                        console.log({
                            feet,
                            inches,
                            fractions,
                            rest,
                        });
                    },
                )
                .split();

        } else if (type === 'number') {

        } else {
            throw new Error(`Invalid input type: ${type} for ImperialValue`);
        }
    }
}

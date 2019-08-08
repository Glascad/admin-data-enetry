
const logInputOutput = (comment, fn) => typeof comment === 'function' ?
    logInputOutput('no comment', comment)
    :
    (...input) => {
        input.forEach((arg, i) => {
            console.log(`Input [${i}] (${comment}):`);
            console.log(arg);
        });
        const output = fn(...input);
        console.log(`Output (${comment}):`);
        console.log(output);
        return output;
    }

export default logInputOutput;

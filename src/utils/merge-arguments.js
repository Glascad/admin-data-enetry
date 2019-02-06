
const matchOld = /(^old)(.+$)/;
const matchNew = /(^new)(.+$)/;

const divide = (arr, cb) => arr.reduce(([T, F], item) => cb(item) ?
    [T.concat(item), F]
    :
    [T, F.concat(item)],
    [[], []]);

const allocate = (arr, T = [], F = []) => {
    const [toRemove, toAdd] = divide(arr, item => F.includes(item));
    return [
        T.concat(toAdd),
        F.filter(item => !toRemove.includes(item)),
    ];
}

const mergeArguments = (prevArgs, incomingArgs) => ({
    ...prevArgs,
    ...Object.keys(incomingArgs)
        .reduce((merged, key) => {

            const incomingValue = incomingArgs[key];

            if (!Array.isArray(incomingValue)) {
                return {
                    ...merged,
                    [key]: incomingValue,
                };
            } else {

                const prevValue = prevArgs[key];

                if (prevValue !== undefined && !Array.isArray(prevValue)) {
                    console.error({ prevValue, incomingValue });
                    throw new Error(`Received differing data types previous value: ${prevValue}, incoming value: ${incomingValue.join(", ")}`);
                }

                const opposite = key.match(matchNew) ?
                    key.replace(matchNew, 'old$2')
                    :
                    key.replace(matchOld, 'new$2');

                const prevOpposite = prevArgs[opposite];

                if (!Array.isArray(prevOpposite)) {
                    return {
                        ...merged,
                        [key]: (prevValue || []).concat(incomingValue),
                    };
                } else {

                    const [outgoingValue, outgoingOpposite] = allocate(incomingValue, prevValue, prevOpposite);

                    return {
                        ...merged,
                        [opposite]: outgoingOpposite,
                        [key]: outgoingValue,
                    };
                }
            }
        }, {}),
});

export default mergeArguments;

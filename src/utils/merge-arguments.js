
const matchOld = /(^old)(.+$)/;
const matchNew = /(^new)(.+$)/;

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

                    const [
                        outgoingOpposite,
                        outgoingValue,
                    ] = incomingValue.reduce(([outgoingOpposite = [], outgoingValue = []], id) => outgoingOpposite.includes(id) ?
                        [
                            outgoingOpposite.filter(i => i !== id),
                            outgoingValue,
                        ]
                        :
                        [
                            outgoingOpposite,
                            outgoingValue.concat(id)
                        ], [prevOpposite, prevValue]);

                    return {
                        ...merged,
                        [opposite]: outgoingOpposite,
                        [key]: outgoingValue,
                    };
                }
            }
        }, {}),
});

// export default mergeArguments;

export default (a, b) => Object.assign({}, a, b);

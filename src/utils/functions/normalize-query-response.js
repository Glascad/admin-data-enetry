import extractArrayCount from './extract-array-count';
import flattenNodeArrays from './flatten-node-arrays';
import pipe from './pipe';
import removeNullishValues from './remove-nullish-values';
import replaceByKeys from './replace-by-keys';

const normalizeQueryResponse = __raw => pipe(
    __raw.data,
    extractArrayCount,
    replaceByKeys,
    flattenNodeArrays,
    removeNullishValues,
    cleanedResult => ({
        ...cleanedResult,
        __raw: {
            ...__raw,
            ...__raw.refetch && {
                refetch: async (...args) => normalizeQueryResponse(await __raw.refetch(...args))
            },
        },
        __receivedAt: Date.now(),
    }),
);

export default normalizeQueryResponse;

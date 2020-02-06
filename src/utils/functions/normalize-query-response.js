import extractArrayCount from './extract-array-count';
import flattenNodeArrays from './flatten-node-arrays';
import pipe from './pipe';
import removeNullishValues from './remove-nullish-values';
import replaceByKeys from './replace-by-keys';

export default __raw => pipe(
    __raw.data,
    extractArrayCount,
    replaceByKeys,
    flattenNodeArrays,
    removeNullishValues,
    clean => ({
        ...clean,
        __raw,
        __receivedAt: Date.now(),
    }),
);

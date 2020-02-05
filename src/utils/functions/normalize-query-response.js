import extractArrayCount from './extract-array-count';
import flattenNodeArrays from './flatten-node-arrays';
import pipe from './pipe';
import removeNullValues from './remove-null-values';
import replaceByKeys from './replace-by-keys';

export default __raw => pipe(
    __raw.data,
    extractArrayCount,
    replaceByKeys,
    flattenNodeArrays,
    removeNullValues,
    clean => ({
        ...clean,
        __raw,
        __receivedAt: Date.now(),
    }),
);

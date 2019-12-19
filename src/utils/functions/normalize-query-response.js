import removeNullValues from './remove-null-values';
import flattenNodeArrays from './flatten-node-arrays';
import replaceByKeys from './replace-by-keys';
import extractArrayCount from './extract-array-count';

const cleanData = ({ data }) => removeNullValues(
    flattenNodeArrays(
        replaceByKeys(
            extractArrayCount(
                data,
            ),
        ),
    ),
) || {};

export default __raw => ({
    ...cleanData(__raw),
    __raw,
});

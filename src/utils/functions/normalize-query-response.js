import removeNullValues from './remove-null-values';
import flattenNodeArrays from './flatten-node-arrays';
import replaceByKeys from './replace-by-keys';
import extractArrayCount from './extract-array-count';

export default ({ data }) => removeNullValues(
    flattenNodeArrays(
        replaceByKeys(
            extractArrayCount(
                data,
            ),
        ),
    ),
) || {};
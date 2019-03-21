import parseSearch from './parse-search';
import removeNullValues from './remove-null-values';
import replaceByKeys from './replace-by-keys';
import flattenNodeArrays from './flatten-node-arrays';
import recursiveQuery from './recursive-query';
import extractNavigationOptions from './extract-navigation-options';
import arraysContainEqualValues from './arrays-contain-equal-values';
import mergeArguments, {
    divideArray,
    allocateItems,
    allocate,
} from './merge-arguments';
import unique from './unique-array';

const validatePath = path => path.replace(/\/+/g, '/');

export {
    parseSearch,
    removeNullValues,
    replaceByKeys,
    flattenNodeArrays,
    recursiveQuery,
    extractNavigationOptions,
    arraysContainEqualValues,
    mergeArguments,
    divideArray,
    allocateItems,
    allocate,
    unique,
    validatePath,
};


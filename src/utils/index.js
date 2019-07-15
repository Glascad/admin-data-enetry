import parseSearch from './functions/parse-search';
import removeNullValues from './functions/remove-null-values';
import replaceByKeys from './functions/replace-by-keys';
import flattenNodeArrays from './functions/flatten-node-arrays';
import recursiveQuery from './functions/recursive-query';
import extractNavigationOptions from './functions/extract-navigation-options';
import arraysContainEqualValues from './functions/arrays-contain-equal-values';
import allocate from './functions/allocate';
import unique from './functions/unique-array';
import lastItem from './functions/last-item';
import ImperialValue from './functions/feet-inches';
import Loggable from './classes/Loggable';

const validatePath = path => path.replace(/\/+/g, '/');

export {
    parseSearch,
    removeNullValues,
    replaceByKeys,
    flattenNodeArrays,
    recursiveQuery,
    extractNavigationOptions,
    arraysContainEqualValues,
    allocate,
    unique,
    lastItem,
    validatePath,
    ImperialValue,
    Loggable,
};


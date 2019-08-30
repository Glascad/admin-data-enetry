// CLASSES
import parseSearch from './classes/parse-search';
import ImperialValue from './classes/imperial-values';
import Loggable from './classes/loggable';
// FUNCTIONS
import removeNullValues from './functions/remove-null-values';
import replaceByKeys from './functions/replace-by-keys';
import flattenNodeArrays from './functions/flatten-node-arrays';
import recursiveQuery from './functions/recursive-query';
import extractNavigationOptions from './functions/extract-navigation-options';
import arraysContainEqualValues from './functions/arrays-contain-equal-values';
import allocate from './functions/allocate';
import unique from './functions/unique-array';
import lastItem from './functions/last-item';
import normalCase from './functions/normal-case';
import logInputOutput from './functions/log-input-output';
import match, { final } from './functions/match';

const validatePath = path => path.replace(/\/+/g, '/');

export {
    // CLASSES
    parseSearch,
    ImperialValue,
    Loggable,
    // FUNCTIONS
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
    normalCase,
    logInputOutput,
    match,
    final,
};

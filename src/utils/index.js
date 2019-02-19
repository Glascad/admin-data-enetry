import _parseSearch from './search-parser';
import _removeNullValues from './remove-null-values';
import _replaceByKeys from './replace-by-keys';
import _flattenNodeArrays from './flatten-node-arrays';
import _recursiveQuery from './recursive-query';
import _extractNavigationOptions from './extract-navigation-options';
import _arraysContainEqualValues from './arrays-contain-equal-values';
import _mergeArguments, {
    divideArray as _divideArray,
    allocateItems as _allocateItems,
    allocate as _allocate,
} from './merge-arguments';

export const parseSearch = _parseSearch;
export const removeNullValues = _removeNullValues;
export const replaceByKeys = _replaceByKeys;
export const flattenNodeArrays = _flattenNodeArrays;
export const recursiveQuery = _recursiveQuery;
export const extractNavigationOptions = _extractNavigationOptions;
export const arraysContainEqualValues = _arraysContainEqualValues;
export const mergeArguments = _mergeArguments;
export const divideArray = _divideArray;
export const allocateItems = _allocateItems;
export const allocate = _allocate;

export const validatePath = path => path.replace(/\/+/g, '/');

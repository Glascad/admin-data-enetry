import _parseSearch from './search-parser';
import _removeNullValues from './remove-null-values';
import _replaceByKeys from './replace-by-keys';
import _flattenNodeArrays from './flatten-node-arrays';
import _recursiveQuery from './recursive-query';

export const parseSearch = _parseSearch;
export const removeNullValues = _removeNullValues;
export const replaceByKeys = _replaceByKeys;
export const flattenNodeArrays = _flattenNodeArrays;
export const recursiveQuery = _recursiveQuery;

export const validatePath = path => path.replace(/\/+/g, '/');
